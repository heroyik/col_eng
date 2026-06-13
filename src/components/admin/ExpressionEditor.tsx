interface Props {
  isAuthorized: boolean;
  primary: string;
  jsonText: string;
  canGenerate: boolean;
  canSave: boolean;
  isBusy: boolean;
  resultMessage: { text: string; type: string };
  saveMessage: { text: string; type: string };
  onPrimaryChange: (value: string) => void;
  onJsonTextChange: (value: string) => void;
  onCheck: () => void;
  onGenerate: () => void;
  onValidate: () => void;
  onSave: () => void;
}

export default function ExpressionEditor({
  isAuthorized,
  primary,
  jsonText,
  canGenerate,
  canSave,
  isBusy,
  resultMessage,
  saveMessage,
  onPrimaryChange,
  onJsonTextChange,
  onCheck,
  onGenerate,
  onValidate,
  onSave,
}: Props) {
  return (
    <>
      <div className="panel-card">
        <h2>Primary Expression</h2>
        <label className="field">
          <span>Primary (English)</span>
          <input
            type="text"
            placeholder="Type an English expression"
            autoComplete="off"
            value={primary}
            disabled={!isAuthorized || isBusy}
            onChange={(event) => onPrimaryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isBusy && isAuthorized) {
                onCheck();
              }
            }}
          />
        </label>
        <div className="button-row">
          <button className="btn" disabled={!isAuthorized || isBusy} onClick={onCheck}>
            Check Database
          </button>
          <button className="btn btn-accent" disabled={!isAuthorized || !canGenerate || isBusy} onClick={onGenerate}>
            Generate JSON
          </button>
        </div>
        {resultMessage.text && <p className={`status-text ${resultMessage.type}`}>{resultMessage.text}</p>}
      </div>

      <section className="panel-card output-card">
        <h2>Generated JSON</h2>
        <textarea
          rows={14}
          placeholder="Generated JSON will appear here"
          value={jsonText}
          disabled={!isAuthorized || isBusy}
          onChange={(event) => onJsonTextChange(event.target.value)}
        />
        <div className="button-row">
          <button className="btn btn-ghost" disabled={!isAuthorized || isBusy} onClick={onValidate}>
            Validate JSON
          </button>
          <button className="btn btn-accent" disabled={!isAuthorized || !canSave || isBusy} onClick={onSave}>
            Save to Firestore
          </button>
        </div>
        {saveMessage.text && <p className={`status-text ${saveMessage.type}`}>{saveMessage.text}</p>}
      </section>
    </>
  );
}
