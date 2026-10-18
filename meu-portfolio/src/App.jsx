import { useState, useSyncExternalStore } from 'react';
import { EMAIL, LINKS, content, paths } from './content';

const subscribeTheme = (notify) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const readTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

// O tema inicial vem do script em index.html (atributo data-theme); aqui só se lê e alterna.
function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'light');
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // sem armazenamento: o tema vale só nesta visita
    }
  };
  return [theme, toggle];
}

function Header({ t, lang, theme, toggleTheme }) {
  const other = lang === 'pt' ? 'en' : 'pt';
  return (
    <header className="topbar">
      <div className="wrap topbar__row">
        <a className="topbar__brand" href={paths[lang].home}>
          Matheus Francisco
        </a>
        <nav className="topbar__nav" aria-label={lang === 'pt' ? 'Seções' : 'Sections'}>
          <a href="#projetos">{t.ui.nav.projects}</a>
          <a href="#trajetoria">{t.ui.nav.path}</a>
          <a href="#contato">{t.ui.nav.contact}</a>
        </nav>
        <nav className="topbar__social" aria-label={t.ui.socialLabel}>
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <div className="topbar__tools">
          <a
            className="chip"
            href={paths[other].home}
            hrefLang={other === 'pt' ? 'pt-BR' : 'en'}
            lang={other === 'pt' ? 'pt-BR' : 'en'}
            aria-label={t.ui.otherLangLabel}
          >
            {t.ui.otherLang}
          </a>
          <button
            className="chip chip--icon"
            type="button"
            onClick={toggleTheme}
            aria-label={t.ui.theme}
            aria-pressed={theme === 'dark'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t, lang }) {
  const h = t.hero;
  return (
    <section className="hero" aria-labelledby="titulo">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="hero__availability">{h.availability}</p>
          <p className="hero__identity">
            <strong>{h.role}</strong>
            {h.place}
          </p>
          <h1 id="titulo">{h.title}</h1>
          <p className="hero__lead">{h.lead}</p>
          <div className="actions">
            <a className="btn btn--primary" href="#projetos">
              {h.primary}
            </a>
            <a className="btn" href={paths[lang].resume}>
              {h.secondary}
            </a>
          </div>
          <p className="hero__links">
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
        <div className="hero__showcase">
          <p className="hero__showcase-label">{h.showcaseLabel}</p>
          <ul>
            {h.showcase.map((x) => (
              <li key={x.name}>
                <a href="#projetos">
                  <img src={x.img} alt={x.alt} width="1600" height="850" decoding="async" />
                  <span>{x.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Projects({ t, lang }) {
  const p = t.projects;
  return (
    <section className="block" id="projetos" aria-labelledby="h-projetos">
      <div className="wrap block__grid">
        <div className="block__head">
          <h2 id="h-projetos">{p.title}</h2>
          <p>{p.intro}</p>
        </div>
        <div className="block__body">
          <article className="flagship">
            <p className="tag">{p.flagshipTag}</p>
            <h3>{p.cogniName}</h3>
            <p className="flagship__tagline">{p.cogniTagline}</p>
            <img
              className="flagship__shot"
              src="/assets/cognivault/orcamento-pecas.png"
              alt={p.imageAlt}
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <div className="flagship__cols">
              <div>
                <h4>{p.problemTitle}</h4>
                <p>{p.problem}</p>
              </div>
              <div>
                <h4>{p.solutionTitle}</h4>
                <p>{p.solution}</p>
              </div>
            </div>
            <h4>{p.rulesTitle}</h4>
            <ul className="rules">
              {p.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className="flagship__parts">
              <table className="parts">
                <caption>{t.hero.partsTitle}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t.hero.partsHead.part}</th>
                    <th scope="col">{t.hero.partsHead.does}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.hero.parts.map((p) => (
                    <tr key={p.name}>
                      <th scope="row">
                        {p.name}
                        <span>{p.tech}</span>
                      </th>
                      <td>{p.does}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="parts__tests">{t.hero.tests}</p>
            </div>
            <div className="actions">
              <a className="btn btn--primary" href={paths[lang].caseStudy}>
                {p.caseStudy}
              </a>
              <a className="btn" href={LINKS.demo} target="_blank" rel="noreferrer">
                {p.demo}
              </a>
            </div>
            <p className="note">{p.privateNote}</p>
          </article>

          <h3 className="sub">{p.othersTitle}</h3>
          <ul className="rows">
            {p.others.map((o) => (
              <li key={o.name} className={o.featured ? 'row row--card row--featured' : 'row row--card'}>
                {o.img && (
                  <img className="row__thumb" src={o.img} alt={o.imgAlt} width="1600" height="850" loading="lazy" decoding="async" />
                )}
                <div className="row__main">
                  <p className="row__year">{o.year}</p>
                  <h4>{o.name}</h4>
                  <p>{o.text}</p>
                  {o.proofs && (
                    <ul className="row__proofs">
                      {o.proofs.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                  {o.stack && <p className="row__stack">{o.stack}</p>}
                  {o.demo && (
                    <div className="row__links">
                      {o.study && <a href={o.study}>{p.caseStudy}</a>}
                      <a href={o.demo} target="_blank" rel="noreferrer">
                        {p.demoLabel}
                      </a>
                      {o.code && (
                        <a href={o.code} target="_blank" rel="noreferrer">
                          {p.codeLabel}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="more">
            <strong>{p.moreTitle}.</strong> {p.more}{' '}
            <a href={`${LINKS.github}?tab=repositories`} target="_blank" rel="noreferrer">
              {p.moreLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Path({ t }) {
  const p = t.path;
  return (
    <section className="block" id="trajetoria" aria-labelledby="h-trajetoria">
      <div className="wrap block__grid">
        <div className="block__head">
          <h2 id="h-trajetoria">{p.title}</h2>
          <p>{p.intro}</p>
        </div>
        <div className="block__body">
          <ol className="timeline">
            {p.items.map((i) => (
              <li key={i.when + i.what}>
                <p className="timeline__when">{i.when}</p>
                <h3>{i.what}</h3>
                <p>{i.text}</p>
              </li>
            ))}
          </ol>
          <h3 className="sub">{p.skillsTitle}</h3>
          <dl className="skills">
            {p.skills.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <h3 className="sub">{p.coursesTitle}</h3>
          <ul className="courses">
            {p.courses.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, lang }) {
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.assign(`mailto:${EMAIL}`);
    }
  };
  return (
    <section className="block block--last" id="contato" aria-labelledby="h-contato">
      <div className="wrap block__grid">
        <div className="block__head">
          <h2 id="h-contato">{c.title}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="block__body">
          <ul className="contact">
            <li>
              <span>{c.email}</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button type="button" className="linklike" onClick={copy} aria-live="polite">
                {copied ? c.copied : c.copy}
              </button>
            </li>
            <li>
              <span>{c.whatsapp}</span>
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                {lang === 'pt' ? 'Enviar mensagem' : 'Send a message'}
              </a>
            </li>
            <li>
              <span>{c.linkedin}</span>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/matheusfranciscols
              </a>
            </li>
            <li>
              <span>{c.github}</span>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                github.com/MatheusFranciscoLS
              </a>
            </li>
          </ul>
          <div className="actions">
            <a className="btn btn--primary" href={paths[lang].resume}>
              {c.resume}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App({ lang = 'pt' }) {
  const t = content[lang];
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <a className="skip" href="#conteudo">
        {t.ui.skip}
      </a>
      <Header t={t} lang={lang} theme={theme} toggleTheme={toggleTheme} />
      <main id="conteudo">
        <Hero t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Path t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <footer className="footer">
        <div className="wrap">{t.footer}</div>
      </footer>
    </>
  );
}
