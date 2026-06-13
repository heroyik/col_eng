const GITLAB_REPO_URL = "https://gitlab.com/heroyik/col_eng";
const FOOTER_MESSAGE =
  "Real-talk English(OPIc AL), Japanese(OPIc AL), Vietnamese(OPIc IM2), Chinese(HSK4), and Spanish(Intermediate).";
const APP_VERSION = "2.0.10";

export default function RepoFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-message">{FOOTER_MESSAGE}</p>
        <a
          className="repo-link"
          href={GITLAB_REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitLab repository"
          title="Open GitLab repository"
        >
          <GitlabLogo />
        </a>
        <span className="footer-version" aria-label={`App version ${APP_VERSION}`}>
          v{APP_VERSION}
        </span>
      </div>
    </footer>
  );
}

function GitlabLogo() {
  return (
    <svg className="repo-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.6 9.3 20.9 4c-.2-.6-1-.6-1.3-.1l-2.2 4.5H6.6L4.4 3.9c-.3-.5-1.1-.5-1.3.1L1.4 9.3c-.2.6 0 1.2.5 1.6L12 18.4l10.1-7.5c.5-.4.7-1 .5-1.6Z"
      />
      <path fill="currentColor" d="m12 18.4 5.4-10H6.6l5.4 10Z" opacity="0.72" />
    </svg>
  );
}
