import { useEffect, useRef } from "react";

export interface StatusLine {
  id: number;
  timestamp: string;
  message: string;
}

interface Props {
  lines: StatusLine[];
  progress: { loaded: number; total: number; done: boolean };
}

export default function StatusBox({ lines, progress }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  const safeTotal = progress.total || 1;
  const ratio = Math.min(progress.loaded / safeTotal, 1);
  const percent = progress.done ? 100 : Math.min(95, Math.round(ratio * 100));
  const isLoading = progress.loaded > 0 && !progress.done;
  const isEmpty = lines.length === 0;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="panel-card status-section">
      <h2>Status</h2>
      <div className="status-box" ref={listRef}>
        {isEmpty ? (
          <div className="status-empty">
            <span className="status-empty-icon">⏳</span>
            <span>Waiting for activity…</span>
          </div>
        ) : (
          lines.map((line) => (
            <div className="status-line" key={line.id}>
              <span className="timestamp">[{line.timestamp}]</span>
              <span>{line.message}</span>
            </div>
          ))
        )}
      </div>
      <div className="progress-wrapper">
        <div className="progress-header">
          <span className="progress-label">
            {progress.done
              ? "Load complete"
              : isLoading
                ? "Loading primaries…"
                : "Ready"}
          </span>
          {progress.loaded > 0 && (
            <span className={`progress-badge ${progress.done ? "badge-done" : "badge-loading"}`}>
              {percent}%
            </span>
          )}
        </div>
        <div className={`progress-track ${isLoading ? "progress-active" : ""} ${progress.done ? "progress-complete" : ""}`}>
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
        <p className="progress-text">
          {progress.loaded > 0
            ? progress.done
              ? `✓ Loaded ${progress.loaded.toLocaleString()} primary expressions.`
              : `Loaded ${progress.loaded.toLocaleString()} / ${progress.total.toLocaleString()} expressions…`
            : progress.total > 0
              ? `Ready to load up to ${progress.total.toLocaleString()} expressions.`
              : "No data to load."}
        </p>
      </div>
    </section>
  );
}
