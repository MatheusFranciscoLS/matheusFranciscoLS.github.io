import { ArrowUp } from 'lucide-react';

export default function Footer({ text }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand" aria-hidden="true">
          <span>MATHEUS</span>
          <span>FRANCISCO</span>
        </div>
        <div className="footer__bottom">
          <p>{text.note}</p>
          <a href="#inicio" className="footer__top-btn">
            {text.back}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
