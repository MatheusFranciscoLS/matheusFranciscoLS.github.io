import { ArrowDown, ArrowDownRight, Download } from 'lucide-react';

export default function Hero({ lang, text }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient hero__gradient--1" />
        <div className="hero__gradient hero__gradient--2" />
        <div className="hero__noise" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content hero-animate">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            {text.badge}
          </div>

          <h1 className="hero__headline">
            {text.headline.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < text.headline.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="hero__intro">{text.intro}</p>

          <div className="hero__actions">
            <a className="btn btn-primary" href="#projetos">
              {text.cta}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="btn btn-secondary"
              href={lang === 'pt' ? '/assets/curriculo-pt.pdf' : '/assets/curriculo-en.pdf'}
              download
            >
              {text.resume}
              <Download size={16} aria-hidden="true" />
            </a>
          </div>

          <dl className="hero__metrics" aria-label={lang === 'pt' ? 'Resumo profissional' : 'Professional summary'}>
            {text.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.value}</dt>
                <dd>{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual hero-animate">
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__dots" aria-hidden="true"><span /><span /><span /></div>
              <span>terminal</span>
              <span className="hero__card-live">LIVE</span>
            </div>
            <div className="hero__card-body">
              <code><b className="code-keyword">const</b> <b className="code-name">developer</b> = {'{'}</code>
              <code>  name: <span className="code-string">"Matheus Francisco"</span>,</code>
              <code>  role: <span className="code-string">"Full-Stack Developer"</span>,</code>
              <code>  stack: [<span className="code-string">"React"</span>, <span className="code-string">"Node"</span>, <span className="code-string">"Java"</span>],</code>
              <code>  available: <span className="code-bool">true</span></code>
              <code>{'}'}</code>
            </div>
            <div className="hero__card-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>Java</span>
              <span>PostgreSQL</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#sobre">
        <span>{text.scroll}</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
