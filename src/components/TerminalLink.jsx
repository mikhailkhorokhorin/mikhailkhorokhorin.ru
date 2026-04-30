export default function TerminalLink({ href, children }) {
  return (
    <span className="link-item">
      <span className="link-arrows">&gt;&gt;</span>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </span>
  );
}
