import { useEffect, useMemo, useRef, useState } from "react";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import type { Expression, LearningCard, ReviewEvent } from "../../types";
import { auth, db, expressionsRef } from "../../lib/firebase";
import {
  disableLearningSync,
  enableLearningSync,
  getLearningSyncUid,
  isLearningSyncEnabled,
  syncLearningState,
} from "../../lib/learningSync";
import { loadCards, loadReviewEvents, removeLearningExpression, upsertCard } from "../../lib/learningStorage";
import {
  getReminderStatus,
  isLearningReminderEnabled,
  requestLearningReminderPermission,
  setLearningReminderEnabled,
  showDueLearningReminder,
  showLearningReminderPreview,
  type ReminderStatus,
} from "../../lib/notifications";
import { summarizeLearning } from "../../lib/progress";
import { assetBaseUrl } from "../../lib/paths";
import { createSyncController, LAST_SYNC_KEY, type SyncController } from "../../lib/sync";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../lib/storage";
import { searchExpressions } from "../../lib/search";
import { buildDailyQueue, createLearningCard } from "../../lib/srs";
import { deleteExpression } from "../../lib/admin";
import LearningHome from "../learning/LearningHome";
import LearningSession from "../learning/LearningSession";
import RepoFooter from "../shared/RepoFooter";
import DailyExpression from "./DailyExpression";
import ResultsGrid from "./ResultsGrid";
import SearchInput from "./SearchInput";

type ViewState = "loading" | "ready" | "error";
type AppMode = "learn" | "session" | "search";
type Theme = "dark" | "light";
type LearningSyncState = "off" | "syncing" | "synced" | "error";

const THEME_STORAGE_KEY = "col_eng_theme";
const PENDING_CLOUD_SYNC_KEY = "col_eng_pending_cloud_sync";
const ACCOUNT_OPTIONS_PREFIX = "col_eng_account_options";
const DAILY_EXAMPLE_STORAGE_KEY = "col_eng_daily_expression_example";
const DAILY_TRANSLATIONS_STORAGE_KEY = "col_eng_daily_expression_translations";
const ADMIN_EMAIL = (import.meta.env.PUBLIC_COL_ENG_ADMIN || "").trim().toLowerCase();
const INITIAL_DELTA_SYNC_TIMEOUT_MS = 5000;
const MANUAL_DELTA_SYNC_TIMEOUT_MS = 12000;

interface AccountOptions {
  theme: Theme;
  cloudSyncEnabled: boolean;
  remindersEnabled: boolean;
  dailyExpressionExampleEnabled: boolean;
  dailyExpressionTranslationsEnabled: boolean;
}

export default function SearchApp() {
  const syncRef = useRef<SyncController | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [dailyExpression, setDailyExpression] = useState<Expression | null>(null);
  const [dailyExpressionHistory, setDailyExpressionHistory] = useState<Expression[]>([]);
  const [dailyExpressionHistoryIndex, setDailyExpressionHistoryIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [viewState, setViewState] = useState<ViewState>("loading");
  const [loadingMessage, setLoadingMessage] = useState("Loading expressions...");
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [systemMessage, setSystemMessage] = useState("");
  const [mode, setMode] = useState<AppMode>("learn");
  const [learningCards, setLearningCards] = useState(() => loadCards());
  const [reviewEvents, setReviewEvents] = useState(() => loadReviewEvents());
  const [learningQueue, setLearningQueue] = useState<LearningCard[]>([]);
  const [learningSyncEnabled, setLearningSyncEnabled] = useState(() => isLearningSyncEnabled());
  const [learningSyncUid, setLearningSyncUid] = useState<string | null>(() => getLearningSyncUid());
  const [learningSyncState, setLearningSyncState] = useState<LearningSyncState>(
    () => isLearningSyncEnabled() ? "synced" : "off"
  );
  const [reminderState, setReminderState] = useState<ReminderStatus>(() => getReminderStatus());
  const [remindersEnabled, setRemindersEnabled] = useState(() => isLearningReminderEnabled());
  const [dailyExpressionExampleEnabled, setDailyExpressionExampleEnabled] = useState(
    () => readDailyExpressionExampleEnabled()
  );
  const [dailyExpressionTranslationsEnabled, setDailyExpressionTranslationsEnabled] = useState(
    () => readDailyExpressionTranslationsEnabled()
  );
  const [theme, setTheme] = useState<Theme>("dark");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [deletingDailyExpressionId, setDeletingDailyExpressionId] = useState<number | null>(null);

  function applyTheme(nextTheme: Theme): void {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  function setInitialDailyExpression(nextExpressions: Expression[]): void {
    const nextExpression = pickDailyExpression(nextExpressions);
    setDailyExpression(nextExpression);
    setDailyExpressionHistory(nextExpression ? [nextExpression] : []);
    setDailyExpressionHistoryIndex(0);
  }

  function showPreviousDailyExpression(): void {
    setDailyExpressionHistoryIndex((currentIndex) => {
      const nextIndex = Math.max(0, currentIndex - 1);
      setDailyExpression(dailyExpressionHistory[nextIndex] || null);
      return nextIndex;
    });
  }

  function showNextDailyExpression(): void {
    const existingNextExpression = dailyExpressionHistory[dailyExpressionHistoryIndex + 1];
    if (existingNextExpression) {
      setDailyExpression(existingNextExpression);
      setDailyExpressionHistoryIndex((currentIndex) => currentIndex + 1);
      return;
    }

    const shownExpressions = dailyExpressionHistory.slice(0, dailyExpressionHistoryIndex + 1);
    const nextExpression = pickDailyExpression(expressions, shownExpressions);
    if (!nextExpression) return;

    setDailyExpression(nextExpression);
    setDailyExpressionHistory((history) => [...history, nextExpression]);
    setDailyExpressionHistoryIndex((currentIndex) => currentIndex + 1);
  }

  useEffect(() => {
    void getRedirectResult(auth)
      .then((result) => {
        if (!result?.user) return;
        setAuthMessage("Signed in with Google.");
        if (getStorageItem(PENDING_CLOUD_SYNC_KEY) === "true") {
          void completeLearningSync();
        }
      })
      .catch((error) => {
        console.warn("Google redirect sign-in failed:", error);
        setAuthMessage(formatAuthError(error));
      });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user && !user.isAnonymous) {
        const accountOptions = readAccountOptions(user.uid) ?? createDefaultAccountOptions(readTheme(user.uid));
        saveAccountOptions(user.uid, accountOptions);
        setLearningSyncUid(user.uid);
        applyTheme(accountOptions.theme);
        setStorageItem(THEME_STORAGE_KEY, accountOptions.theme);
        setLearningReminderEnabled(accountOptions.remindersEnabled);
        setRemindersEnabled(accountOptions.remindersEnabled);
        setDailyExpressionExampleEnabled(accountOptions.dailyExpressionExampleEnabled);
        setStorageItem(
          DAILY_EXAMPLE_STORAGE_KEY,
          String(accountOptions.dailyExpressionExampleEnabled)
        );
        setDailyExpressionTranslationsEnabled(accountOptions.dailyExpressionTranslationsEnabled);
        setStorageItem(
          DAILY_TRANSLATIONS_STORAGE_KEY,
          String(accountOptions.dailyExpressionTranslationsEnabled)
        );
        if (accountOptions.cloudSyncEnabled) {
          void completeLearningSync();
        } else {
          disableLearningSync();
          setLearningSyncEnabled(false);
          setLearningSyncUid(null);
          setLearningSyncState("off");
        }
      } else {
        applyTheme(readTheme());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const controller = createSyncController(db, expressionsRef, {
      onExpressionsChange(nextExpressions) {
        setExpressions(nextExpressions);
        setInitialDailyExpression(nextExpressions);
      },
      onProgress(current, total) {
        setProgress({ current, total });
      },
      onError(error) {
        console.warn("Search sync error:", error);
      },
    });

    syncRef.current = controller;

    void (async () => {
      try {
        const loadedFromCache = await controller.loadCachedExpressions();
        const loadedFromStatic = loadedFromCache ? false : await controller.loadStaticExpressions();
        if (!loadedFromCache && !loadedFromStatic) {
          setViewState("error");
          return;
        }

        setViewState("ready");
        setLoadingMessage("Searching the database...");
        void withTimeout(
          controller.performDeltaSync(),
          INITIAL_DELTA_SYNC_TIMEOUT_MS,
          "Initial Firestore delta sync timed out"
        ).catch((error) => {
          console.warn("Background expression sync skipped:", error);
        });
      } catch (error) {
        console.error("Error fetching expressions:", error);
        setViewState("error");
      } finally {
        controller.setupMetadataListener();
        controller.setupBroadcastChannel();
      }
    })();

    return () => {
      window.clearTimeout(debounceRef.current);
      controller.cleanup();
    };
  }, []);

  useEffect(() => {
    if (!learningSyncEnabled || !learningSyncUid) return;

    const timer = window.setTimeout(() => {
      setLearningSyncState("syncing");
      syncLearningState(db, learningSyncUid, { cards: learningCards, reviewEvents })
        .then(() => setLearningSyncState("synced"))
        .catch((error) => {
          console.warn("Learning sync failed:", error);
          setLearningSyncState("error");
        });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [learningCards, learningSyncEnabled, learningSyncUid, reviewEvents]);

  const results = useMemo(() => {
    return searchExpressions(expressions, activeSearch);
  }, [activeSearch, expressions]);
  const dailyExpressionInReview = Boolean(
    dailyExpression && learningCards.some((card) => card.expressionId === dailyExpression.id)
  );
  const shownDailyExpressionIds = new Set(
    dailyExpressionHistory
      .slice(0, dailyExpressionHistoryIndex + 1)
      .map((expression) => expression.id)
  );
  const shownDailyExpressionPrimaries = new Set(
    dailyExpressionHistory
      .slice(0, dailyExpressionHistoryIndex + 1)
      .map((expression) => expression.primary.trim().toLowerCase())
  );
  const hasUnseenDailyExpression = expressions.some((expression) => (
    !shownDailyExpressionIds.has(expression.id)
      && !shownDailyExpressionPrimaries.has(expression.primary.trim().toLowerCase())
  ));

  function runSearch(rawValue: string): void {
    const searchTerm = rawValue.trim();
    if (searchTerm.toLowerCase() === "forcedownload") {
      void runForcedDeltaSync();
      return;
    }
    if (searchTerm) setMode("search");
    setActiveSearch(searchTerm);
  }

  function handleSearchChange(nextValue: string): void {
    setSearchValue(nextValue);
    if (nextValue.trim()) setMode("search");
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => runSearch(nextValue), 300);
  }

  async function runForcedDeltaSync(): Promise<void> {
    if (!syncRef.current) return;

    setSearchValue("");
    setActiveSearch("");
    setLoadingMessage("Checking for updates...");
    setViewState("loading");

    try {
      const fetchedCount = await withTimeout(
        syncRef.current.performDeltaSync({ force: true, showLoading: true }),
        MANUAL_DELTA_SYNC_TIMEOUT_MS,
        "Manual Firestore delta sync timed out"
      );
      setSystemMessage(fetchedCount > 0
        ? `${fetchedCount} new expressions synced.`
        : "Already up to date.");
    } catch (error) {
      console.warn("Forced expression sync failed:", error);
      setSystemMessage("Update check timed out. Using the local phrase bundle.");
    } finally {
      setViewState("ready");
      window.setTimeout(() => setSystemMessage(""), 4000);
    }
  }

  function startReviewSession(): void {
    const queue = buildDailyQueue(learningCards, expressions, {
      dailyNewLimit: 5,
      dailyReviewLimit: 20,
    });
    setLearningQueue(queue);
    setMode("session");
    setActiveSearch("");
    setSearchValue("");
  }

  function addToReview(expression: Expression): void {
    if (learningCards.some((card) => card.expressionId === expression.id)) return;
    const nextCards = upsertCard(createLearningCard(expression.id));
    setLearningCards(nextCards);
  }

  async function handleDeleteDailyExpression(expression: Expression): Promise<void> {
    if (!isAdmin) return;
    if (!window.confirm(`Delete "${expression.primary}" from Firestore and local data?`)) return;

    setDeletingDailyExpressionId(expression.id);
    try {
      const deleted = await deleteExpression(db, expressionsRef, expression);
      syncRef.current?.removeExpression(deleted.deletedId, deleted.docId);

      const nextExpressions = expressions.filter((item) => (
        item.id !== expression.id && item.docId !== expression.docId
      ));
      const nextHistory = dailyExpressionHistory.filter((item) => (
        item.id !== expression.id && item.docId !== expression.docId
      ));
      const nextHistoryIndex = Math.min(dailyExpressionHistoryIndex, Math.max(0, nextHistory.length - 1));
      const nextDailyExpression = nextHistory[nextHistoryIndex] ?? pickDailyExpression(nextExpressions);

      setExpressions(nextExpressions);
      setDailyExpression(nextDailyExpression);
      setDailyExpressionHistory(nextHistory.length > 0 ? nextHistory : nextDailyExpression ? [nextDailyExpression] : []);
      setDailyExpressionHistoryIndex(nextHistory.length > 0 ? nextHistoryIndex : 0);
      const nextLearningState = removeLearningExpression(expression.id);
      setLearningCards(nextLearningState.cards);
      setReviewEvents(nextLearningState.reviewEvents);
      setLearningQueue((queue) => queue.filter((card) => card.expressionId !== expression.id));
      setSystemMessage(`Deleted "${expression.primary}".`);
      window.setTimeout(() => setSystemMessage(""), 4000);
    } catch (error) {
      console.warn("Expression delete failed:", error);
      setSystemMessage("Delete failed. Check admin permission and try again.");
      window.setTimeout(() => setSystemMessage(""), 5000);
    } finally {
      setDeletingDailyExpressionId(null);
    }
  }

  function updateTheme(nextTheme: Theme): void {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setStorageItem(THEME_STORAGE_KEY, nextTheme);
    if (authUser && !authUser.isAnonymous) {
      setStorageItem(accountThemeKey(authUser.uid), nextTheme);
      saveAccountOptions(authUser.uid, { ...getAccountOptions(authUser.uid, nextTheme), theme: nextTheme });
    }
  }

  async function handleSignInWithGoogle(): Promise<User | null> {
    setAuthBusy(true);
    setAuthMessage("");
    try {
      const provider = createGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      setAuthMessage("Signed in with Google.");
      return result.user;
    } catch (error) {
      console.warn("Google sign-in failed:", error);
      if (shouldUseRedirectSignIn(error)) {
        setAuthMessage("Popup bailed. Sending you through Google instead...");
        await signInWithRedirect(auth, createGoogleProvider());
        return null;
      }
      setAuthMessage(formatAuthError(error));
      return null;
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut(): Promise<void> {
    setAuthBusy(true);
    setAuthMessage("");
    try {
      await signOut(auth);
      disableLearningSync();
      setLearningSyncEnabled(false);
      setLearningSyncUid(null);
      setLearningSyncState("off");
      setAuthMessage("Signed out.");
    } catch (error) {
      console.warn("Sign-out failed:", error);
      setAuthMessage("Sign-out failed.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleToggleLearningSync(): Promise<void> {
    if (!authUser || authUser.isAnonymous) {
      setAuthMessage("Sign in with Google to use Cloud sync.");
      return;
    }

    if (learningSyncEnabled) {
      disableLearningSync();
      setLearningSyncEnabled(false);
      setLearningSyncUid(null);
      setLearningSyncState("off");
      saveAccountOptions(authUser.uid, { ...getAccountOptions(authUser.uid, theme), cloudSyncEnabled: false });
      return;
    }

    setLearningSyncState("syncing");
    try {
      await completeLearningSync();
    } catch (error) {
      console.warn("Learning sync opt-in failed:", error);
      removeStorageItem(PENDING_CLOUD_SYNC_KEY);
      setLearningSyncState("error");
    }
  }

  async function completeLearningSync(): Promise<void> {
    setLearningSyncState("syncing");
    const userId = await enableLearningSync(auth);
    setLearningSyncUid(userId);
    setLearningSyncEnabled(true);
    await syncLearningState(db, userId, { cards: learningCards, reviewEvents }, { force: true });
    removeStorageItem(PENDING_CLOUD_SYNC_KEY);
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      saveAccountOptions(auth.currentUser.uid, {
        ...getAccountOptions(auth.currentUser.uid, theme),
        cloudSyncEnabled: true,
      });
    }
    setLearningSyncState("synced");
  }

  async function handleToggleReminders(): Promise<void> {
    if (remindersEnabled) {
      setLearningReminderEnabled(false);
      setRemindersEnabled(false);
      if (authUser && !authUser.isAnonymous) {
        saveAccountOptions(authUser.uid, { ...getAccountOptions(authUser.uid, theme), remindersEnabled: false });
      }
      return;
    }

    if (reminderState === "granted") {
      setLearningReminderEnabled(true);
      setRemindersEnabled(true);
      if (authUser && !authUser.isAnonymous) {
        saveAccountOptions(authUser.uid, { ...getAccountOptions(authUser.uid, theme), remindersEnabled: true });
      }
      if (!showDueLearningReminder(learningSummary.dueToday)) {
        showLearningReminderPreview();
      }
      return;
    }

    const nextStatus = await requestLearningReminderPermission();
    setReminderState(nextStatus);
    if (nextStatus === "granted") {
      setLearningReminderEnabled(true);
      setRemindersEnabled(true);
      if (authUser && !authUser.isAnonymous) {
        saveAccountOptions(authUser.uid, { ...getAccountOptions(authUser.uid, theme), remindersEnabled: true });
      }
      if (!showDueLearningReminder(learningSummary.dueToday)) {
        showLearningReminderPreview();
      }
    }
  }

  function handleToggleDailyTranslations(): void {
    const nextEnabled = !dailyExpressionTranslationsEnabled;
    setDailyExpressionTranslationsEnabled(nextEnabled);
    setStorageItem(DAILY_TRANSLATIONS_STORAGE_KEY, String(nextEnabled));
    if (authUser && !authUser.isAnonymous) {
      saveAccountOptions(authUser.uid, {
        ...getAccountOptions(authUser.uid, theme),
        dailyExpressionTranslationsEnabled: nextEnabled,
      });
    }
  }

  function handleToggleDailyExample(): void {
    const nextEnabled = !dailyExpressionExampleEnabled;
    setDailyExpressionExampleEnabled(nextEnabled);
    setStorageItem(DAILY_EXAMPLE_STORAGE_KEY, String(nextEnabled));
    if (authUser && !authUser.isAnonymous) {
      saveAccountOptions(authUser.uid, {
        ...getAccountOptions(authUser.uid, theme),
        dailyExpressionExampleEnabled: nextEnabled,
      });
    }
  }

  const lastSync = formatRelativeSyncTime(readLastSyncDate());
  const learningSummary = summarizeLearning(learningCards, reviewEvents);
  const learningSyncLabel = formatLearningSyncLabel(learningSyncState);
  const reminderLabel = formatReminderLabel(reminderState, remindersEnabled);
  const learningSyncOn = learningSyncEnabled && (learningSyncState === "synced" || learningSyncState === "syncing");
  const remindersOn = remindersEnabled && reminderState !== "denied" && reminderState !== "unsupported";
  const isAdmin = Boolean(authUser?.email && ADMIN_EMAIL && authUser.email.toLowerCase() === ADMIN_EMAIL);
  const showInitialState = viewState === "ready" && !activeSearch;
  const showNoResults = viewState === "ready" && activeSearch && results.length === 0;

  useEffect(() => {
    if (viewState !== "ready" || !remindersOn) return;
    showDueLearningReminder(learningSummary.dueToday);
  }, [learningSummary.dueToday, remindersOn, viewState]);

  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <AppOptions
        open={optionsOpen}
        user={authUser}
        authBusy={authBusy}
        authMessage={authMessage}
        theme={theme}
        learningSyncLabel={learningSyncLabel}
        reminderLabel={reminderLabel}
        onClose={() => setOptionsOpen(false)}
        onThemeChange={updateTheme}
        onSignIn={handleSignInWithGoogle}
        onSignOut={handleSignOut}
        learningSyncOn={learningSyncOn}
        remindersOn={remindersOn}
        dailyExpressionExampleOn={dailyExpressionExampleEnabled}
        dailyExpressionTranslationsOn={dailyExpressionTranslationsEnabled}
        syncDisabled={!authUser || authUser.isAnonymous}
        isAdmin={isAdmin}
        onToggleSync={handleToggleLearningSync}
        onToggleReminders={handleToggleReminders}
        onToggleDailyExample={handleToggleDailyExample}
        onToggleDailyTranslations={handleToggleDailyTranslations}
        expressionCount={expressions.length}
        lastSync={lastSync}
        onDownloadExpressions={() => downloadExpressions(expressions)}
      />

      <main className="container">
        <header className="hero">
          <div className="app-header-controls">
            <div className="mode-switch" role="tablist" aria-label="App mode">
              <button
                type="button"
                className={mode === "learn" ? "mode-tab active" : "mode-tab"}
                aria-selected={mode === "learn"}
                role="tab"
                onClick={() => {
                  setMode("learn");
                  setActiveSearch("");
                  setSearchValue("");
                }}
              >
                <span className="mode-tab-icon" aria-hidden="true">✨</span>
                <span>Learn</span>
              </button>
              <button
                type="button"
                className={mode === "search" ? "mode-tab active" : "mode-tab"}
                aria-selected={mode === "search"}
                role="tab"
                onClick={() => setMode("search")}
              >
                <span className="mode-tab-icon" aria-hidden="true">🔎</span>
                <span>Search</span>
              </button>
              <button
                type="button"
                className={mode === "session" ? "mode-tab active" : "mode-tab"}
                aria-selected={mode === "session"}
                role="tab"
                disabled={viewState !== "ready" || expressions.length === 0}
                onClick={startReviewSession}
              >
                <span className="mode-tab-icon" aria-hidden="true">↻</span>
                <span>Review</span>
              </button>
            </div>

            <button
              type="button"
              className="options-trigger"
              onClick={() => setOptionsOpen(true)}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">⚙️</span>
              <span>Options</span>
            </button>
          </div>

          <h1>Colloquial <span className="accent">English</span></h1>
          <p className="subtitle">
            Search and discover authentic English expressions used in NYC.
          </p>
        </header>

        {!(mode === "learn" && showInitialState) && (
          <SearchInput
            disabled={viewState === "loading"}
            value={systemMessage || searchValue}
            onChange={(value) => {
              if (systemMessage) setSystemMessage("");
              handleSearchChange(value);
            }}
            onImmediateSearch={runSearch}
          />
        )}

        <section className="results-section">
          {viewState === "error" && <ErrorState />}
          {viewState === "loading" && (
            <LoadingState
              message={loadingMessage}
              current={progress.current}
              total={progress.total}
            />
          )}
          {viewState === "ready" && mode === "learn" && !activeSearch && (
            <LearningHome
              expressions={expressions}
              cards={learningCards}
              summary={learningSummary}
              dailyExpression={dailyExpression}
              dailyExpressionExampleEnabled={dailyExpressionExampleEnabled}
              dailyExpressionTranslationsEnabled={dailyExpressionTranslationsEnabled}
              onDailyExpressionPrevious={showPreviousDailyExpression}
              onDailyExpressionNext={showNextDailyExpression}
              onDailyExpressionAddToReview={addToReview}
              onDailyExpressionDelete={isAdmin ? (expression) => void handleDeleteDailyExpression(expression) : undefined}
              dailyExpressionPreviousDisabled={dailyExpressionHistoryIndex === 0}
              dailyExpressionNextDisabled={!hasUnseenDailyExpression}
              dailyExpressionDeleteDisabled={deletingDailyExpressionId === dailyExpression?.id}
              dailyExpressionInReview={dailyExpressionInReview}
            />
          )}
          {viewState === "ready" && mode === "session" && (
            <LearningSession
              expressions={expressions}
              queue={learningQueue}
              showTranslations={dailyExpressionTranslationsEnabled}
              onCardsChange={setLearningCards}
              onReviewEventsChange={setReviewEvents}
              onFinish={() => setMode("learn")}
            />
          )}
          {viewState === "ready" && mode === "search" && activeSearch && results.length > 0 && (
            <ResultsGrid
              results={results}
              learningCards={learningCards}
              onAddToReview={addToReview}
            />
          )}
          {mode === "search" && showInitialState && (
            <div className="empty-state">
              <DailyExpression
                expression={dailyExpression}
                showExample={dailyExpressionExampleEnabled}
                showTranslations={dailyExpressionTranslationsEnabled}
                onDelete={isAdmin ? (expression) => void handleDeleteDailyExpression(expression) : undefined}
                deleteDisabled={deletingDailyExpressionId === dailyExpression?.id}
              />
              {expressions.length === 0 && <p>Type something to start searching!</p>}
              {expressions.length > 0 && (
                <div className="stats-text">
                  <p className="stats-count">{expressions.length} expressions ({lastSync})</p>
                </div>
              )}
            </div>
          )}
          {mode === "search" && showNoResults && (
            <div className="empty-state">
              <p>No matching expressions found. Try a different keyword!</p>
            </div>
          )}
        </section>
      </main>

      <RepoFooter />
    </>
  );
}

function LoadingState({ message, current, total }: { message: string; current: number; total: number }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="loading-state">
      <div className="spinner" />
      <p>{message}</p>
      {current > 0 && (
        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-bar" style={{ width: `${percentage}%` }} />
          </div>
          <p className="progress-text">
            {current} / {total} expressions loaded ({percentage}%)
          </p>
        </div>
      )}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="error-state">
      <div className="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3>Connection Issue</h3>
      <p>
        Unable to load expressions. Please check your internet connection or try refreshing the page.
      </p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Try Again
      </button>
    </div>
  );
}

interface AppOptionsProps {
  open: boolean;
  user: User | null;
  authBusy: boolean;
  authMessage: string;
  theme: Theme;
  learningSyncLabel: string;
  reminderLabel: string;
  learningSyncOn: boolean;
  remindersOn: boolean;
  dailyExpressionExampleOn: boolean;
  dailyExpressionTranslationsOn: boolean;
  syncDisabled: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onThemeChange: (theme: Theme) => void;
  onSignIn: () => Promise<User | null>;
  onSignOut: () => Promise<void>;
  onToggleSync: () => Promise<void>;
  onToggleReminders: () => Promise<void>;
  onToggleDailyExample: () => void;
  onToggleDailyTranslations: () => void;
  expressionCount: number;
  lastSync: string;
  onDownloadExpressions: () => void;
}

function AppOptions({
  open,
  user,
  authBusy,
  authMessage,
  theme,
  learningSyncLabel,
  reminderLabel,
  learningSyncOn,
  remindersOn,
  dailyExpressionExampleOn,
  dailyExpressionTranslationsOn,
  syncDisabled,
  isAdmin,
  onClose,
  onThemeChange,
  onSignIn,
  onSignOut,
  onToggleSync,
  onToggleReminders,
  onToggleDailyExample,
  onToggleDailyTranslations,
  expressionCount,
  lastSync,
  onDownloadExpressions,
}: AppOptionsProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const accountName = user?.displayName || user?.email || "Google account";
  const adminUrl = `${assetBaseUrl()}admin/`;

  return (
    <div className="options-overlay" role="presentation" onClick={onClose}>
      <aside
        className="options-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Account options"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="options-header">
          <div>
            <p className="options-eyebrow">Account options</p>
            <h2>Settings</h2>
          </div>
          <button className="options-icon-button" type="button" onClick={onClose} aria-label="Close options">
            ×
          </button>
        </div>

        <section className="options-section" aria-label="Google account">
          <div className="account-card">
            <div className="account-avatar" aria-hidden="true">
              <span>{accountName.slice(0, 1).toUpperCase()}</span>
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
            <div className="account-copy">
              <strong>
                {user ? accountName : "Not signed in"}
                {isAdmin && <span className="admin-badge">Admin</span>}
              </strong>
              <span>{user?.email || "Sign in to keep options tied to your account."}</span>
            </div>
          </div>
          <div className="options-button-row">
            {isAdmin && (
              <a className="option-button primary" href={adminUrl}>
                Open admin
              </a>
            )}
            {!user && (
              <button className="option-button primary" type="button" disabled={authBusy} onClick={() => void onSignIn()}>
                Sign in with Google
              </button>
            )}
            {user && (
              <button className="option-button" type="button" disabled={authBusy} onClick={() => void onSignOut()}>
                Sign out
              </button>
            )}
          </div>
          {authMessage && <p className="options-status">{authMessage}</p>}
        </section>

        <section className="options-section" aria-label="Appearance">
          <div className="option-row">
            <div>
              <strong>Theme</strong>
              <span>Saved separately after Google sign-in.</span>
            </div>
            <div className="theme-segment" role="group" aria-label="Theme">
              <button
                type="button"
                className={theme === "dark" ? "active" : ""}
                onClick={() => onThemeChange("dark")}
              >
                Dark
              </button>
              <button
                type="button"
                className={theme === "light" ? "active" : ""}
                onClick={() => onThemeChange("light")}
              >
                Light
              </button>
            </div>
          </div>
        </section>

        <section className="options-section" aria-label="Learning options">
          <button
            className={learningSyncOn ? "option-row action toggle on" : "option-row action toggle"}
            type="button"
            aria-pressed={learningSyncOn}
            disabled={syncDisabled}
            onClick={() => void onToggleSync()}
          >
            <span>
              <strong>Cloud sync</strong>
              <span>{learningSyncLabel}</span>
              <small className="option-help-text">
                {syncDisabled
                  ? "Sign in with Google to sync your review progress across devices."
                  : "Keeps your review cards and learning history backed up to this Google account."}
              </small>
            </span>
            <span className="option-toggle-visual" aria-hidden="true">
              <span className="option-toggle-icon">{learningSyncOn ? "☁️" : "☁︎"}</span>
              <span className="option-toggle-label">{learningSyncOn ? "ON" : "OFF"}</span>
            </span>
          </button>
          <button
            className={remindersOn ? "option-row action toggle on" : "option-row action toggle"}
            type="button"
            aria-pressed={remindersOn}
            onClick={() => void onToggleReminders()}
          >
            <span>
              <strong>Reminders</strong>
              <span>{reminderLabel}</span>
            </span>
            <span className="option-toggle-visual" aria-hidden="true">
              <span className="option-toggle-icon">{remindersOn ? "🔔" : "🔕"}</span>
              <span className="option-toggle-label">{remindersOn ? "ON" : "OFF"}</span>
            </span>
          </button>
          <button
            className={dailyExpressionTranslationsOn ? "option-row action toggle on" : "option-row action toggle"}
            type="button"
            aria-pressed={dailyExpressionTranslationsOn}
            onClick={onToggleDailyTranslations}
          >
            <span>
              <strong>Daily translations</strong>
              <small className="option-help-text">
                Shows Japanese, Chinese, Vietnamese, and Spanish on Expression of the Day.
              </small>
            </span>
            <span className="option-toggle-visual" aria-hidden="true">
              <span className="option-toggle-icon">{dailyExpressionTranslationsOn ? "文" : "A"}</span>
              <span className="option-toggle-label">{dailyExpressionTranslationsOn ? "ON" : "OFF"}</span>
            </span>
          </button>
          <button
            className={dailyExpressionExampleOn ? "option-row action toggle on" : "option-row action toggle"}
            type="button"
            aria-pressed={dailyExpressionExampleOn}
            onClick={onToggleDailyExample}
          >
            <span>
              <strong>Show examples</strong>
              <small className="option-help-text">
                Show the English example on the Expression of the Day card.
              </small>
            </span>
            <span className="option-toggle-visual" aria-hidden="true">
              <span className="option-toggle-icon">{dailyExpressionExampleOn ? "Ex" : "--"}</span>
              <span className="option-toggle-label">{dailyExpressionExampleOn ? "ON" : "OFF"}</span>
            </span>
          </button>
        </section>

        <section className="options-section" aria-label="Data options">
          <button
            className="option-row action"
            type="button"
            disabled={expressionCount === 0}
            onClick={onDownloadExpressions}
          >
            <span>
              <strong>Grab the whole phrase stash</strong>
              <span>{expressionCount} expressions as JSON, {lastSync}</span>
            </span>
            <span className="option-row-icon" aria-hidden="true">⬇️</span>
          </button>
        </section>
      </aside>
    </div>
  );
}

function pickDailyExpression(expressions: Expression[], excludedExpressions: Expression[] = []): Expression | null {
  if (expressions.length === 0) return null;
  const excludedIds = new Set(excludedExpressions.map((expression) => expression.id));
  const excludedPrimaries = new Set(
    excludedExpressions.map((expression) => expression.primary.trim().toLowerCase())
  );
  const candidates = expressions.filter((expression) => (
    !excludedIds.has(expression.id)
      && !excludedPrimaries.has(expression.primary.trim().toLowerCase())
  ));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)] || null;
}

function readLastSyncDate(): string | null {
  return getStorageItem(LAST_SYNC_KEY);
}

function formatRelativeSyncTime(isoString: string | null): string {
  if (!isoString) return "loaded from static bundle";

  const timestamp = Date.parse(isoString);
  if (!Number.isFinite(timestamp)) return "synced recently";

  const diffMs = Date.now() - timestamp;
  const diffMin = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMin < 1) return "synced just now";
  if (diffMin < 60) return `synced ${diffMin}m ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `synced ${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `synced ${diffDays}d ago`;
}

function formatLearningSyncLabel(state: LearningSyncState): string {
  if (state === "syncing") return "Syncing learning";
  if (state === "synced") return "Learning synced";
  if (state === "error") return "Retry cloud sync";
  return "Cloud sync off";
}

function formatReminderLabel(state: ReminderStatus, enabled: boolean): string {
  if (enabled && state === "granted") return "Reminders on";
  if (enabled && state === "default") return "Reminders on, browser permission needed";
  if (state === "denied") return "Reminders blocked";
  if (state === "unsupported") return "Reminders unavailable";
  return "Reminders off";
}

function createGoogleProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  return provider;
}

function shouldUseRedirectSignIn(error: unknown): boolean {
  const code = getFirebaseErrorCode(error);
  return code === "auth/popup-blocked"
    || code === "auth/popup-closed-by-user"
    || code === "auth/cancelled-popup-request";
}

function formatAuthError(error: unknown): string {
  const code = getFirebaseErrorCode(error);
  const detail = code ? ` (${code})` : "";
  if (code === "auth/unauthorized-domain") return `Add this domain in Firebase Auth authorized domains.${detail}`;
  if (code === "auth/operation-not-allowed") return `Enable Google as a Firebase Auth sign-in provider.${detail}`;
  if (code === "auth/auth-domain-config-required") return `Firebase authDomain is missing or wrong.${detail}`;
  if (code === "auth/invalid-api-key") return `Firebase API key is invalid.${detail}`;
  if (code === "auth/invalid-app-id") return `Firebase app ID is invalid.${detail}`;
  if (code === "auth/invalid-oauth-client-id") return `Google OAuth client is not configured correctly.${detail}`;
  if (code === "auth/internal-error") return `Firebase Auth returned an internal setup error. Check Google provider and OAuth config.${detail}`;
  if (code === "auth/popup-blocked") return `Popup was blocked. Try again or allow popups.${detail}`;
  if (code === "auth/popup-closed-by-user") return `Google sign-in was closed before it finished.${detail}`;
  if (code === "auth/cancelled-popup-request") return `Another sign-in popup was already open.${detail}`;
  if (code === "auth/network-request-failed") return `Network issue. Try signing in again.${detail}`;
  return `Google sign-in failed. Check Firebase Auth settings.${detail}`;
}

function getFirebaseErrorCode(error: unknown): string {
  return typeof error === "object" && error !== null && "code" in error
    ? String((error as { code?: unknown }).code)
    : "";
}

function readTheme(userId?: string): Theme {
  const savedTheme = userId ? getStorageItem(accountThemeKey(userId)) : null;
  const fallbackTheme = getStorageItem(THEME_STORAGE_KEY);
  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : fallbackTheme === "light" || fallbackTheme === "dark"
      ? fallbackTheme
      : "dark";
}

function accountThemeKey(userId: string): string {
  return `${THEME_STORAGE_KEY}_${userId}`;
}

function accountOptionsKey(userId: string): string {
  return `${ACCOUNT_OPTIONS_PREFIX}_${userId}`;
}

function createDefaultAccountOptions(theme: Theme): AccountOptions {
  return {
    theme,
    cloudSyncEnabled: true,
    remindersEnabled: true,
    dailyExpressionExampleEnabled: true,
    dailyExpressionTranslationsEnabled: true,
  };
}

function getAccountOptions(userId: string, fallbackTheme: Theme): AccountOptions {
  return readAccountOptions(userId) ?? createDefaultAccountOptions(fallbackTheme);
}

function readAccountOptions(userId: string): AccountOptions | null {
  const raw = getStorageItem(accountOptionsKey(userId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AccountOptions>;
    return {
      theme: parsed.theme === "light" || parsed.theme === "dark" ? parsed.theme : readTheme(userId),
      cloudSyncEnabled: parsed.cloudSyncEnabled === true,
      remindersEnabled: parsed.remindersEnabled === true,
      dailyExpressionExampleEnabled: parsed.dailyExpressionExampleEnabled !== false,
      dailyExpressionTranslationsEnabled: parsed.dailyExpressionTranslationsEnabled !== false,
    };
  } catch {
    return null;
  }
}

function readDailyExpressionExampleEnabled(): boolean {
  return getStorageItem(DAILY_EXAMPLE_STORAGE_KEY) !== "false";
}

function readDailyExpressionTranslationsEnabled(): boolean {
  return getStorageItem(DAILY_TRANSLATIONS_STORAGE_KEY) !== "false";
}

function saveAccountOptions(userId: string, options: AccountOptions): void {
  setStorageItem(accountOptionsKey(userId), JSON.stringify(options));
  setStorageItem(accountThemeKey(userId), options.theme);
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);
    promise
      .then(resolve, reject)
      .finally(() => window.clearTimeout(timer));
  });
}

function downloadExpressions(expressions: Expression[]): void {
  if (expressions.length === 0) return;

  const now = new Date();
  const dateStringForFile = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const filename = `${dateStringForFile}_COL_ENG_${expressions.length}.json`;
  const exportData = expressions.map(({ primary, meaning, similar, example, japanese, chinese, vietnamese, spanish }) => ({
    primary,
    meaning,
    similar,
    example,
    japanese,
    chinese,
    vietnamese,
    spanish,
  }));

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 100);
}
