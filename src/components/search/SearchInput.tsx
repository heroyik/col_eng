interface Props {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  onImmediateSearch: (value: string) => void;
}

export default function SearchInput({ disabled, value, onChange, onImmediateSearch }: Props) {
  return (
    <section className="search-section">
      <div className="search-box">
        <input
          type="text"
          id="searchInput"
          placeholder="Type '*' to view all saved expressions"
          autoComplete="off"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onImmediateSearch(event.currentTarget.value);
            }
          }}
        />
        <div className="search-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </section>
  );
}
