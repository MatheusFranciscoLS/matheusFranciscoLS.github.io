import { useEffect, useState, useSyncExternalStore } from 'react';
import { EMAIL, LINKS, content, paths } from './content';

const subscribeTheme = (notify) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const readTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

// O tema inicial vem do script em index.html (atributo data-theme); aqui só se lê e alterna.
function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'dark');
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

// Confere, no navegador de quem visita, se cada sistema responde: carrega o ícone do site.
// Se o site saiu do ar, a resposta é uma página de erro, que não carrega como imagem.
function useLiveStatus(items) {
  const [status, setStatus] = useState(() => Object.fromEntries(items.map((i) => [i.id, 'checking'])));
  useEffect(() => {
    const probes = items.map((item) => {
      const img = new Image();
      const done = (result) => {
        clearTimeout(timer);
        img.onload = img.onerror = null;
        setStatus((s) => ({ ...s, [item.id]: result }));
      };
      const timer = setTimeout(() => done('down'), 9000);
      img.onload = () => done('up');
      img.onerror = () => done('down');
      img.src = `${item.probe}?agora=${Date.now()}`;
      return { img, timer };
    });
    return () => {
      probes.forEach(({ img, timer }) => {
        clearTimeout(timer);
        img.onload = img.onerror = null;
        img.src = '';
      });
    };
  }, [items]);
  return status;
}

function Header({ t, lang, theme, toggleTheme }) {
  const other = lang === 'pt' ? 'en' : 'pt';
  return (
    <header className="bar">
      <div className="wrap bar__row">
        <a className="bar__brand" href={paths[lang].home}>
          Matheus Francisco
        </a>
        <nav className="bar__nav" aria-label={lang === 'pt' ? 'Seções' : 'Sections'}>
          <a href="#sistemas">{t.ui.nav.systems}</a>
          <a href="#como-trabalho">{t.ui.nav.method}</a>
          <a href="#trajetoria">{t.ui.nav.path}</a>
          <a href="#contato">{t.ui.nav.contact}</a>
        </nav>
        <div className="bar__tools">
          <a className="bar__link" href={LINKS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="bar__link" href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a
            className="chip"
            href={paths[other].home}
            hrefLang={other === 'pt' ? 'pt-BR' : 'en'}
            lang={other === 'pt' ? 'pt-BR' : 'en'}
            aria-label={`${other.toUpperCase()}: ${t.ui.otherLangLabel}`}
          >
            {other.toUpperCase()}
          </a>
          <button className="chip chip--icon" type="button" onClick={toggleTheme} aria-label={t.ui.theme} aria-pressed={theme === 'light'}>
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

function Hero({ t, lang, items, status }) {
  const h = t.hero;
  const values = Object.values(status);
  const finished = values.every((v) => v !== 'checking');
  const upCount = values.filter((v) => v === 'up').length;
  return (
    <section className="hero" aria-labelledby="titulo">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="hero__name">{h.name}</p>
          <p className="hero__kicker">
            {h.kicker} <span className="pill">{h.available}</span>
          </p>
          <h1 id="titulo">{h.title}</h1>
          <p className="hero__lead">{h.lead}</p>
          <p className="hero__stack">{h.stack}</p>
          <div className="actions">
            <a className="btn btn--primary" href="#sistemas">
              {h.primary}
            </a>
            <a className="btn" href={paths[lang].resume}>
              {h.secondary}
            </a>
            <a className="btn" href="#contato">
              {h.contact}
            </a>
          </div>
          <p className="hero__links">
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={LINKS.github}>GitHub</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
        <div className="board" role="region" aria-labelledby="board-title">
          <div className="board__head">
            <h2 id="board-title">{h.boardTitle}</h2>
            <span>{h.boardNote}</span>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="board__row">
                  <span className="board__name">
                    <b>{item.name}</b>
                    <small>{item.boardNote}</small>
                  </span>
                  <span className={`status status--${status[item.id]}`}>
                    {h.status[status[item.id]]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="sr-only" aria-live="polite">
            {finished ? h.summary(upCount, items.length) : ''}
          </p>
        </div>
      </div>
    </section>
  );
}

function SystemLinks({ s, item }) {
  return (
    <div className="actions">
      {item.study && (
        <a className="btn btn--primary" href={item.study}>
          {s.study}
        </a>
      )}
      <a className="btn" href={item.live} target="_blank" rel="noreferrer">
        {item.code ? s.demo : s.live}
      </a>
      {item.code && (
        <a className="btn btn--ghost" href={item.code} target="_blank" rel="noreferrer">
          {s.code}
        </a>
      )}
    </div>
  );
}

function Systems({ t, items, status }) {
  const s = t.systemsSection;
  const [main, ...rest] = items;
  return (
    <section className="block" id="sistemas" aria-labelledby="h-sistemas">
      <div className="wrap">
        <div className="block__head">
          <h2 id="h-sistemas">{s.title}</h2>
          <p>{s.intro}</p>
        </div>

        <article className="main" id={main.id} aria-labelledby={`n-${main.id}`}>
          <div className="main__top">
            <p className="tag">{main.tag}</p>
            <h3 id={`n-${main.id}`}>{main.name}</h3>
            <p className="main__kind">
              <span className={`status status--${status[main.id]}`}>{t.hero.status[status[main.id]]}</span> {main.kind}
            </p>
            <p className="main__summary">{main.summary}</p>
          </div>
          <img className="shot" src={main.img} alt={main.imgAlt} width="1440" height="900" loading="lazy" decoding="async" />
          <div className="main__cols">
            <div>
              <h4>{s.problem}</h4>
              <p>{main.problem}</p>
              <h4>{s.proof}</h4>
              <ul className="ticks">
                {main.proof.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{s.built}</h4>
              <ul className="ticks">
                {main.built.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="stack">
            <span>{s.stack}</span> {main.stack}
          </p>
          <SystemLinks s={s} item={main} />
          <p className="note">{main.liveNote}</p>
        </article>

        <div className="cards">
          {rest.map((item) => (
            <article className="card" id={item.id} key={item.id} aria-labelledby={`n-${item.id}`}>
              <img className="card__img" src={item.img} alt={item.imgAlt} width="1600" height="900" loading="lazy" decoding="async" />
              <div className="card__body">
                <p className="tag">
                  {item.tag} <span className={`status status--${status[item.id]}`}>{t.hero.status[status[item.id]]}</span>
                </p>
                <h3 id={`n-${item.id}`}>{item.name}</h3>
                <p className="card__kind">{item.kind}</p>
                <p>{item.summary}</p>
                <ul className="ticks">
                  {item.built.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="stack">
                  <span>{s.stack}</span> {item.stack}
                </p>
                <SystemLinks s={s} item={item} />
              </div>
            </article>
          ))}
        </div>

        <p className="more">
          {s.more}{' '}
          <a href={`${LINKS.github}?tab=repositories`} target="_blank" rel="noreferrer">
            {s.moreLink}
          </a>
        </p>
      </div>
    </section>
  );
}

function Method({ t }) {
  const m = t.method;
  return (
    <section className="block" id="como-trabalho" aria-labelledby="h-como">
      <div className="wrap">
        <div className="block__head">
          <h2 id="h-como">{m.title}</h2>
        </div>
        <ol className="method">
          {m.items.map((x, i) => (
            <li key={x.title}>
              <span className="method__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Path({ t }) {
  const p = t.path;
  return (
    <section className="block" id="trajetoria" aria-labelledby="h-trajetoria">
      <div className="wrap path">
        <div>
          <div className="block__head">
            <h2 id="h-trajetoria">{p.title}</h2>
            <p>{p.intro}</p>
          </div>
          <ol className="timeline">
            {p.items.map((i) => (
              <li key={i.when + i.what}>
                <p className="timeline__when">{i.when}</p>
                <h3>{i.what}</h3>
                <p>{i.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="sub">{p.skillsTitle}</h3>
          <dl className="skills">
            {p.skills.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <details className="courses">
            <summary>
              {p.coursesTitle} <span>({p.courses.length})</span>
            </summary>
            <ul>
              {p.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </details>
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // sem acesso à área de transferência: abre o programa de e-mail
      window.location.assign(`mailto:${EMAIL}`);
    }
  };
  return (
    <section className="block block--contact" id="contato" aria-labelledby="h-contato">
      <div className="wrap contact">
        <div>
          <h2 id="h-contato">{c.title}</h2>
          <p>{c.intro}</p>
        </div>
        <ul className="contact__list">
          <li>
            <span>{c.email}</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" className="chip" onClick={copy}>
              {copied ? c.copied : c.copy}
            </button>
          </li>
          <li>
            <span>{c.whatsapp}</span>
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
              {c.whatsappText}
            </a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/matheusfranciscols
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={LINKS.github} target="_blank" rel="noreferrer">
              github.com/MatheusFranciscoLS
            </a>
          </li>
        </ul>
        <a className="btn btn--primary contact__cv" href={paths[lang].resume}>
          {c.resume}
        </a>
      </div>
    </section>
  );
}

export default function App({ lang = 'pt' }) {
  const t = content[lang];
  const [theme, toggleTheme] = useTheme();
  const items = t.systemsSection.items;
  const status = useLiveStatus(items);
  return (
    <>
      <a className="skip" href="#conteudo">
        {t.ui.skip}
      </a>
      <Header t={t} lang={lang} theme={theme} toggleTheme={toggleTheme} />
      <main id="conteudo">
        <Hero t={t} lang={lang} items={items} status={status} />
        <Systems t={t} items={items} status={status} />
        <Method t={t} />
        <Path t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <footer className="foot">
        <div className="wrap">{t.footer}</div>
      </footer>
    </>
  );
}
