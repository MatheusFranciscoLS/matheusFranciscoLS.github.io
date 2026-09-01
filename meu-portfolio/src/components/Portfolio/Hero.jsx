import { ArrowDown, ArrowDownRight, Download } from 'lucide-react';

export default function Hero({ lang, text }) {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-copy">
          <div className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {text.availability}
          </div>

          <p className="eyebrow">{text.eyebrow}</p>
          <h1>
            <span>{text.headlineA}</span>
            <span className="headline-accent">{text.headlineB}</span>
          </h1>
          <p className="hero-intro">{text.intro}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              {text.projects}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="button button-ghost"
              href={lang === 'pt' ? '/assets/curriculo-pt.pdf' : '/assets/curriculo-en.pdf'}
              download
            >
              {text.resume}
              <Download size={16} aria-hidden="true" />
            </a>
          </div>

          <dl className="hero-metrics" aria-label="Resumo profissional">
            <div>
              <dt>26</dt>
              <dd>{text.repos}</dd>
            </div>
            <div>
              <dt>25</dt>
              <dd>{text.projectsCount}</dd>
            </div>
            <div>
              <dt>05</dt>
              <dd>{text.products}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-system" aria-label="Processo de desenvolvimento">
          <div className="system-glow" aria-hidden="true" />
          <div className="system-card">
            <div className="system-header">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>{text.panel}</span>
              <span className="system-status">LIVE</span>
            </div>
            <ol className="system-flow">
              <li>
                <span className="line-number">01</span>
                <code><b>understand</b>(business)</code>
                <span className="line-state">done</span>
              </li>
              <li>
                <span className="line-number">02</span>
                <code><b>model</b>(domain)</code>
                <span className="line-state">done</span>
              </li>
              <li className="active-line">
                <span className="line-number">03</span>
                <code><b>build</b>(fullStack)</code>
                <span className="line-state">running</span>
              </li>
              <li>
                <span className="line-number">04</span>
                <code><b>measure</b>(impact)</code>
                <span className="line-state">next</span>
              </li>
            </ol>
            <div className="system-result">
              <span>{text.outcome}</span>
              <strong>{text.outcomeText}</strong>
            </div>
            <div className="system-stack" aria-label="Tecnologias principais">
              <span>Java</span>
              <span>React</span>
              <span>Node.js</span>
              <span>PostgreSQL</span>
              <span>AI</span>
            </div>
          </div>
          <div className="orbit-tag orbit-one">API</div>
          <div className="orbit-tag orbit-two">DATA</div>
        </div>

        <a className="scroll-cue" href="#projetos">
          <span>{text.scroll}</span>
          <span aria-hidden="true"><ArrowDown size={13} /></span>
        </a>
      </section>

      <div className="capability-strip" aria-label="Especialidades">
        <div>
          <span>FULL-STACK SYSTEMS</span>
          <i>✦</i>
          <span>BUSINESS INTELLIGENCE</span>
          <i>✦</i>
          <span>AI-ASSISTED PRODUCTS</span>
          <i>✦</i>
          <span>SOFTWARE ARCHITECTURE</span>
        </div>
      </div>
    </>
  );
}
