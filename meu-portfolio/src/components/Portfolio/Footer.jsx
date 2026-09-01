import { ArrowUp } from 'lucide-react';

export default function Footer({ text }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span>MATHEUS</span>
        <span>FRANCISCO</span>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} · {text.note}</p>
        <a href="#inicio">
          {text.back}
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
