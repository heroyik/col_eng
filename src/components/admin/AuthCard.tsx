import type { User } from "firebase/auth";

interface Props {
  user: User | null;
  isAuthorized: boolean;
  model: string;
  temperature: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temperature: number) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

const MODELS = [
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite",
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

export default function AuthCard({
  user,
  isAuthorized,
  model,
  temperature,
  onModelChange,
  onTemperatureChange,
  onSignIn,
  onSignOut,
}: Props) {
  const authClass = user && !isAuthorized ? "status-text error" : isAuthorized ? "status-text success" : "status-text warning";
  const authMessage = !user
    ? "Please sign in to continue."
    : isAuthorized
      ? `Signed in as ${user.email}.`
      : "Access to this administrative page is restricted to authorized administrator accounts only.";

  return (
    <div className="panel-card auth-card">
      <h2>Admin & LLM Settings</h2>
      <p className="hint">Sign in with Google, then pick a model.</p>
      <div className="button-row">
        <button className="btn btn-accent" disabled={isAuthorized} onClick={onSignIn}>
          Sign in with Google
        </button>
        <button className="btn btn-ghost" disabled={!user} onClick={onSignOut}>
          Sign out
        </button>
      </div>
      <p className={authClass}>{authMessage}</p>
      <label className="field">
        <span>Model</span>
        <select value={model} onChange={(event) => onModelChange(event.target.value)} disabled={!isAuthorized}>
          {MODELS.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Temperature</span>
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          disabled={!isAuthorized}
          onChange={(event) => onTemperatureChange(Number(event.target.value))}
        />
      </label>
      <p className={isAuthorized ? "hint success" : "hint warning"}>
        {isAuthorized ? "Authorized for Vertex AI." : "Sign in required for generation."}
      </p>
    </div>
  );
}
