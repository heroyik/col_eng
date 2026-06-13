import { useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  ADMIN_EMAIL,
  callVertexAI,
  buildGenerationPrompt,
  buildReviewPrompt,
  ESTIMATED_TOTAL,
  findSimilarMatch,
  loadPrimaries,
  normalizeText,
  parseJsonPayload,
  sanitizePayload,
  saveExpression,
  validatePayload,
  type PrimaryRecord,
} from "../../lib/admin";
import { ai, auth, db, expressionsRef } from "../../lib/firebase";
import RepoFooter from "../shared/RepoFooter";
import ThemeToggle from "../shared/ThemeToggle";
import AuthCard from "./AuthCard";
import ExpressionEditor from "./ExpressionEditor";
import StatusBox, { type StatusLine } from "./StatusBox";

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [primary, setPrimary] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [model, setModel] = useState("gemini-3.5-flash");
  const [temperature, setTemperature] = useState(0.4);
  const [primaries, setPrimaries] = useState<PrimaryRecord[]>([]);
  const [primariesLoaded, setPrimariesLoaded] = useState(false);
  const [primariesPromise, setPrimariesPromise] = useState<Promise<PrimaryRecord[]> | null>(null);
  const [canGenerate, setCanGenerate] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [resultMessage, setResultMessage] = useState({ text: "", type: "" });
  const [saveMessage, setSaveMessage] = useState({ text: "", type: "" });
  const [statusLines, setStatusLines] = useState<StatusLine[]>([
    { id: 1, timestamp: "--:--:--", message: "Waiting for input." },
  ]);
  const [progress, setProgress] = useState({ loaded: 0, total: ESTIMATED_TOTAL, done: false });

  const isAuthorized = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      setCanGenerate(false);
      setCanSave(false);
    }
  }, [isAuthorized]);

  async function handleSignIn(): Promise<void> {
    try {
      if (auth.currentUser && auth.currentUser.email !== ADMIN_EMAIL) {
        await signOut(auth);
      }
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error(error);
      appendStatusLine("Google sign-in failed.");
    }
  }

  async function handleSignOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      appendStatusLine("Sign-out failed.");
    }
  }

  async function ensurePrimaries(): Promise<PrimaryRecord[]> {
    if (primariesLoaded) return primaries;
    if (primariesPromise) return primariesPromise;

    setStatusLines([]);
    appendStatusLine("Loading primary expressions from Firestore...");
    setProgress({ loaded: 0, total: ESTIMATED_TOTAL, done: false });

    const promise = loadPrimaries(expressionsRef, (loaded, total, done = false) => {
      setProgress({ loaded, total, done });
    });
    setPrimariesPromise(promise);

    const loaded = await promise;
    setPrimaries(loaded);
    setPrimariesLoaded(true);
    appendStatusLine(`Primary expressions loaded: ${loaded.length}`);
    return loaded;
  }

  async function handleCheck(): Promise<void> {
    if (!isAuthorized) {
      appendStatusLine("Please sign in with the admin account first.");
      return;
    }

    const trimmedPrimary = primary.trim();
    setSaveMessage({ text: "", type: "" });
    setResultMessage({ text: "", type: "" });
    setJsonText("");
    setCanSave(false);
    setCanGenerate(false);

    if (!trimmedPrimary) {
      setResultMessage({ text: "Please enter a primary expression.", type: "warning" });
      return;
    }

    try {
      setIsBusy(true);
      const loaded = await ensurePrimaries();
      const match = findSimilarMatch(trimmedPrimary, loaded);
      if (match) {
        setResultMessage({ text: `A similar expression already exists: "${match}" - generating anyway.`, type: "warning" });
      } else {
        setResultMessage({ text: "No similar expression found. You can generate JSON now.", type: "success" });
      }
      setCanGenerate(true);
    } catch (error) {
      console.error(error);
      appendStatusLine(`Failed to load Firestore data: ${errorMessage(error)}`);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleGenerate(): Promise<void> {
    if (!isAuthorized) {
      appendStatusLine("Please sign in with the admin account first.");
      return;
    }

    const trimmedPrimary = primary.trim();
    setSaveMessage({ text: "", type: "" });
    setResultMessage({ text: "", type: "" });

    if (!trimmedPrimary) {
      setResultMessage({ text: "Please enter a primary expression.", type: "warning" });
      return;
    }
    if (!model) {
      setResultMessage({ text: "Model is required.", type: "warning" });
      return;
    }

    try {
      setIsBusy(true);
      const loaded = await ensurePrimaries();
      const match = findSimilarMatch(trimmedPrimary, loaded);
      if (match) {
        appendStatusLine(`Similar expression exists: "${match}" - proceeding anyway.`);
      }

      appendStatusLine(`Using ${model} (Vertex AI / Account: ${ADMIN_EMAIL})`);
      appendStatusLine(`Calling ${model}...`);
      const rawText = await callVertexAI(ai, {
        model,
        temperature,
        prompt: buildGenerationPrompt(trimmedPrimary),
      });
      if (!rawText) throw new Error("Primary generation returned an empty response.");

      const { payload: sanitizedPayload, fixes } = sanitizePayload(parseJsonPayload(rawText));
      fixes.forEach((fix) => appendStatusLine(`Auto-fix: ${fix}`));

      appendStatusLine("Running consistency review...");
      let reviewedPayload = sanitizedPayload;
      try {
        appendStatusLine(`Calling ${model}...`);
        const reviewRawText = await callVertexAI(ai, {
          model,
          temperature: Math.max(0.1, temperature - 0.2),
          prompt: buildReviewPrompt(trimmedPrimary, JSON.stringify(sanitizedPayload, null, 2)),
        });
        if (reviewRawText) {
          const { payload: reviewSanitized, fixes: reviewFixes } = sanitizePayload(parseJsonPayload(reviewRawText));
          reviewFixes.forEach((fix) => appendStatusLine(`Review auto-fix: ${fix}`));
          reviewedPayload = reviewSanitized;
        }
      } catch (error) {
        console.warn("Consistency review failed:", error);
        appendStatusLine("Consistency review failed. Using initial result.");
      }

      setJsonText(JSON.stringify(reviewedPayload, null, 2));
      const errors = validatePayload(reviewedPayload, trimmedPrimary);
      if (errors.length > 0) {
        setResultMessage({ text: `Generated JSON needs edits: ${errors.join(" ")}`, type: "warning" });
        setCanSave(false);
      } else {
        setResultMessage({ text: "Generation complete. JSON looks valid.", type: "success" });
        setCanSave(true);
      }
    } catch (error) {
      console.error(error);
      appendStatusLine(`Error: ${errorMessage(error)}`);
    } finally {
      setIsBusy(false);
    }
  }

  function handleValidate(): void {
    if (!isAuthorized) {
      setSaveMessage({ text: "Please sign in with the admin account first.", type: "warning" });
      return;
    }
    if (!jsonText.trim()) {
      setSaveMessage({ text: "JSON is empty.", type: "warning" });
      return;
    }

    try {
      const payload = JSON.parse(jsonText);
      const errors = validatePayload(payload, primary.trim());
      if (errors.length > 0) {
        setSaveMessage({ text: `Validation issues: ${errors.join(" ")}`, type: "warning" });
        setCanSave(false);
        return;
      }
      setSaveMessage({ text: "JSON validated successfully.", type: "success" });
      setCanSave(true);
    } catch {
      setSaveMessage({ text: "JSON parsing failed.", type: "error" });
      setCanSave(false);
    }
  }

  async function handleSave(): Promise<void> {
    if (!isAuthorized) {
      setSaveMessage({ text: "Please sign in with the admin account first.", type: "warning" });
      return;
    }

    const trimmedPrimary = primary.trim();
    if (!trimmedPrimary) {
      setSaveMessage({ text: "Primary expression is required.", type: "warning" });
      return;
    }

    try {
      setIsBusy(true);
      const payload = parseJsonPayload(jsonText);
      const saved = await saveExpression(db, expressionsRef, trimmedPrimary, payload);
      appendStatusLine("Updated metadata/sync and notified open search tabs.");
      appendStatusLine(`Saved to Firestore successfully with ID [${saved.docId}].`);
      appendStatusLine("Search pages will sync automatically. Hidden fallback: type 'forcedownload' in search.");
      setSaveMessage({ text: "Saved. Search pages will sync automatically.", type: "success" });
      setCanSave(false);
      setPrimaries((current) => [...current, { raw: trimmedPrimary, normalized: normalizeText(trimmedPrimary) }]);
    } catch (error) {
      console.error(error);
      setSaveMessage({ text: "Save failed.", type: "error" });
      appendStatusLine(`Save error: ${errorMessage(error)}`);
    } finally {
      setIsBusy(false);
    }
  }

  function appendStatusLine(message: string): void {
    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setStatusLines((current) => [...current, { id: Date.now() + Math.random(), timestamp, message }]);
  }

  const editor = useMemo(() => (
    <ExpressionEditor
      isAuthorized={isAuthorized}
      primary={primary}
      jsonText={jsonText}
      canGenerate={canGenerate}
      canSave={canSave}
      isBusy={isBusy}
      resultMessage={resultMessage}
      saveMessage={saveMessage}
      onPrimaryChange={(value) => {
        setPrimary(value);
        setCanGenerate(false);
        setCanSave(false);
      }}
      onJsonTextChange={(value) => {
        setJsonText(value);
        setCanSave(false);
      }}
      onCheck={handleCheck}
      onGenerate={handleGenerate}
      onValidate={handleValidate}
      onSave={handleSave}
    />
  ), [isAuthorized, primary, jsonText, canGenerate, canSave, isBusy, resultMessage, saveMessage]);

  if (!authReady || !isAuthorized) {
    return (
      <>
        <div className="background-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <ThemeToggle />

        <main className="container restricted-container">
          <AdminAccessDenied
            user={user}
            authReady={authReady}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
          />
        </main>

        <RepoFooter />
      </>
    );
  }

  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <ThemeToggle />

      <main className="container">
        <header className="hero">
          <p className="eyebrow">Firestore Intake</p>
          <h1>Add a <span className="accent">New Expression</span></h1>
          <p className="subtitle">
            Enter a primary English expression, check for existing matches, generate fields, and save to Firestore.
          </p>
        </header>

        <section className="panel-grid">
          <AuthCard
            user={user}
            isAuthorized={isAuthorized}
            model={model}
            temperature={temperature}
            onModelChange={setModel}
            onTemperatureChange={setTemperature}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
          />
          {editor}
        </section>

        <StatusBox lines={statusLines} progress={progress} />
      </main>

      <RepoFooter />
    </>
  );
}

interface AdminAccessDeniedProps {
  user: User | null;
  authReady: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

function AdminAccessDenied({ user, authReady, onSignIn, onSignOut }: AdminAccessDeniedProps) {
  return (
    <section className="panel-card access-denied-card" aria-labelledby="admin-access-denied-title" role="alert">
      <h2 id="admin-access-denied-title">Access Restricted</h2>
      <p className="status-text error">
        Access to this administrative page is restricted to authorized administrator accounts only.
      </p>
      <p className="hint">
        {authReady
          ? "Please authenticate with an approved administrator account to continue."
          : "Verifying administrative access..."}
      </p>
      {authReady && (
        <div className="button-row">
          <button className="btn btn-accent" onClick={onSignIn}>
            Sign in with Google
          </button>
          <button className="btn btn-ghost" disabled={!user} onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
    </section>
  );
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
