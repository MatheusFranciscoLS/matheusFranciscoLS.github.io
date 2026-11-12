import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { CALLOUT_POS, EMAIL, LINKS, REPO, content, paths } from './content';

const subscribeTheme = (notify) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const readTheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

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

const SECTIONS = ['projetos', 'trajetoria', 'contato'];

// Marca no menu a seção que está na tela.
function useCurrentSection() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setCurrent(SECTIONS.findLast((id) => seen.get(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return current;
}

const Icon = ({ name }) => {
  const d = {
    external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
  }[name];
  return (
    <svg className="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      {name === 'theme' ? (
        <>
          <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
        </>
      ) : (
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
};

// Link para fora do site: abre em nova aba e avisa leitores de tela.
function Out({ href, children, className, t }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <Icon name="external" />
      <span className="sr-only"> {t.ui.newTab}</span>
    </a>
  );
}

function Header({ t, lang, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const current = useCurrentSection();
  const other = lang === 'pt' ? 'en' : 'pt';
  const close = () => setOpen(false);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const n = t.ui.nav;
  const links = [
    ['projetos', n.projects],
    ['trajetoria', n.path],
    ['contato', n.contact],
  ];
  return (
    <header className="top">
      <div className="wrap top__row">
        <a className="brand" href={paths[lang].home}>
          <span className="brand__mark" aria-hidden="true">MF</span>
          <span className="brand__name">{t.hero.name}</span>
        </a>
        <button className="top__toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'close' : 'menu'} />
          <span>{open ? t.ui.close : t.ui.menu}</span>
        </button>
        <div className="top__menu" id="menu" data-open={open}>
          <nav aria-label={t.ui.navLabel}>
            <ul className="top__nav">
              {links.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={close} aria-current={current === id ? 'true' : undefined}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="top__tools">
            <a className="btn btn--small" href={paths[lang].resume} download={paths[lang].resumeName}>
              <Icon name="download" />
              {t.ui.resume}
            </a>
            <a
              className="tool"
              href={paths[other].home}
              hrefLang={other === 'pt' ? 'pt-BR' : 'en'}
              lang={other === 'pt' ? 'pt-BR' : 'en'}
              aria-label={`${other.toUpperCase()}: ${t.ui.otherLangLabel}`}
            >
              {other.toUpperCase()}
            </a>
            <button className="tool" type="button" onClick={toggleTheme} aria-label={t.ui.theme} aria-pressed={theme === 'dark'}>
              <Icon name="theme" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ t, lang }) {
  const h = t.hero;
  const f = h.figure;
  const [active, setActive] = useState(null);
  return (
    <section className="hero" aria-labelledby="titulo">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="titulo">
            <span className="hero__name">{h.name}</span>
            <span className="hero__role">{h.role}</span>
          </h1>
          <p className="avail">
            <span className="avail__tag">
              <span className="avail__dot" aria-hidden="true" />
              {h.availTag}
            </span>
            <span className="avail__roles">{h.availRoles}</span>
          </p>
          <p className="hero__lead">{h.lead}</p>
          <p className="hero__lead hero__lead--short">{h.leadShort}</p>
          <p className="hero__focus">{h.focus}</p>
          <div className="actions">
            <a className="btn btn--primary" href="#projetos">
              {h.primary}
            </a>
            <a className="btn" href={paths[lang].resume} download={paths[lang].resumeName}>
              <Icon name="download" />
              {h.resume}
            </a>
          </div>
          <p className="hero__links">
            <Out href={LINKS.linkedin} t={t}>LinkedIn</Out>
            <Out href={LINKS.github} t={t}>GitHub</Out>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        <figure className="showcase">
          <div className="showcase__bar">
            <span className="showcase__name">{f.name}</span>
            <span className="showcase__tag">{f.tag}</span>
          </div>
          <div className="plate">
            <div className="plate__frame">
              <img
                src="/assets/vardao-central/balcao.webp"
                srcSet="/assets/vardao-central/balcao-800.webp 800w, /assets/vardao-central/balcao.webp 1440w"
                sizes="(min-width: 1100px) 720px, 100vw"
                alt={f.alt}
                width="1440"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
              {CALLOUT_POS.map((p, i) => (
                <span
                  key={i}
                  className="callout"
                  data-on={active === i || undefined}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': i }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <figcaption>
            <ol className="legend">
              {f.callouts.map((c, i) => (
                <li key={c} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <span className="legend__n" aria-hidden="true">{i + 1}</span>
                  {c}
                </li>
              ))}
            </ol>
            <p className="showcase__note">{f.note}</p>
          </figcaption>
        </figure>
      </div>

      <div className="wrap">
        <dl className="facts-strip">
          {h.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Gallery({ items, label, note }) {
  const [current, setCurrent] = useState(0);
  const tabs = useRef([]);
  const base = useId();
  const onKey = (e) => {
    const last = items.length - 1;
    const next = { ArrowRight: current === last ? 0 : current + 1, ArrowLeft: current === 0 ? last : current - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setCurrent(next);
    tabs.current[next]?.focus();
  };
  const item = items[current];
  return (
    <div className="gallery">
      <div className="gallery__tabs" role="tablist" aria-label={label} onKeyDown={onKey}>
        {items.map((g, i) => (
          <button
            key={g.tab}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={i === current}
            aria-controls={`${base}-p`}
            tabIndex={i === current ? 0 : -1}
            onClick={() => setCurrent(i)}
          >
            {g.tab}
          </button>
        ))}
      </div>
      <div className="gallery__panel" role="tabpanel" id={`${base}-p`} aria-labelledby={`${base}-t${current}`}>
        <figure>
          <div className={`browser${item.diagram ? ' browser--diagram' : ''}`}>
            <img key={item.src} src={item.src} alt={item.alt} width={item.w} height={item.h} loading="lazy" decoding="async" />
          </div>
          <figcaption>
            {item.caption} {!item.diagram && <span>{note}</span>}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function Index({ t, items }) {
  const l = t.projects.labels;
  return (
    <nav className="index" aria-label={l.index}>
      <div className="index__head" aria-hidden="true">
        <span>{l.project}</span>
        <span>{l.type}</span>
        <span>{l.main}</span>
      </div>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <a href={`#${p.id}`}>
              <span className="index__name">{p.name}</span>
              <span className="index__type">{p.type}</span>
              <span className="index__stack">{p.stack.slice(0, 4).join(', ')}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Featured({ t, p }) {
  const l = t.projects.labels;
  return (
    <article className="feature" id={p.id} aria-labelledby={`n-${p.id}`}>
      <div className="wrap">
        <header className="feature__head">
          <p className="eyebrow">{l.featured}</p>
          <h3 id={`n-${p.id}`}>{p.name}</h3>
          <p className="feature__kind">{p.kind}</p>
          <ul className="facts">
            {p.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </header>

        <div className="feature__intro">
          <div className="feature__story">
            <h4>{l.problem}</h4>
            <p>{p.problem}</p>
            <h4>{l.role}</h4>
            <p>{p.role}</p>
          </div>
          <Gallery items={p.gallery} label={l.gallery} note={p.galleryNote} />
        </div>

        <h4 className="feature__sub">{l.modules}</h4>
        <dl className="modules">
          {p.modules.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="feature__proof">
          <div>
            <h4>{l.rules}</h4>
            <ul className="rules">
              {p.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="proof">
            <h4>{l.tests}</h4>
            <table className="tests">
              <thead>
                <tr>
                  <th scope="col">{l.suite}</th>
                  <th scope="col">{l.tool}</th>
                  <th scope="col">{l.passed}</th>
                </tr>
              </thead>
              <tbody>
                {p.tests.map(([s, tool, n]) => (
                  <tr key={s}>
                    <th scope="row">{s}</th>
                    <td>{tool}</td>
                    <td className="tests__n">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fine">{p.testsNote}</p>
          </div>
        </div>

        <footer className="feature__foot">
          <ul className="chips" aria-label={l.stack}>
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="actions">
            <a className="btn btn--primary" href={p.study}>
              {l.study}
            </a>
            <Out className="btn" href={p.live} t={t}>
              {p.liveLabel}
            </Out>
          </div>
          <p className="fine">{p.privateNote}</p>
        </footer>
      </div>
    </article>
  );
}

// Composição de telas reais: navegador + celular, várias telas sobrepostas ou uma tela só.
function Media({ p, label }) {
  if (p.gallery?.length) {
    return (
      <div className="media media--gallery">
        <Gallery items={p.gallery} label={label} note={p.galleryNote} />
      </div>
    );
  }
  if (p.shots?.length) {
    const [main, ...rest] = p.shots;
    return (
      <figure className="media">
        <div className="stack">
          <div className="browser stack__main">
            <img src={main.src} alt={main.alt} width={main.w} height={main.h} loading="lazy" decoding="async" />
          </div>
          {rest.map((s, i) => (
            <div className={`browser stack__small stack__small--${i + 1}`} key={s.src}>
              <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        {p.shotsNote && <figcaption>{p.shotsNote}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="media">
      <div className={`device${p.phone ? '' : ' device--single'}`}>
        <div className="browser device__main">
          <img src={p.img} alt={p.imgAlt} width={p.w} height={p.h} loading="lazy" decoding="async" />
        </div>
        {p.phone && (
          <div className="phone">
            <img src={p.phone.src} alt={p.phoneAlt} width={p.phone.w} height={p.phone.h} loading="lazy" decoding="async" />
          </div>
        )}
      </div>
      {p.imgNote && <figcaption>{p.imgNote}</figcaption>}
    </figure>
  );
}

function Showcase({ t, p, flip }) {
  const l = t.projects.labels;
  const liveLabel = p.code ? l.demo : l.site;
  return (
    <article className={`show${flip ? ' show--flip' : ''}`} id={p.id} aria-labelledby={`n-${p.id}`}>
      <div className="wrap show__grid">
        <Media p={p} label={`${l.screens} ${p.name}`} />
        <div className="show__text">
          <p className="eyebrow">{p.context}</p>
          <h3 id={`n-${p.id}`}>{p.name}</h3>
          <p className="show__kind">{p.kind}</p>
          <p className="show__summary">{p.summary}</p>
          <h4>{l.did}</h4>
          <ul className="ticks">
            {p.did.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {p.seen && <p className="show__seen">{p.seen}</p>}
          <ul className="chips chips--quiet" aria-label={l.stack}>
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {p.demoNote && <p className="note">{p.demoNote}</p>}
          <div className="actions">
            {p.study && (
              <a className="btn btn--primary" href={p.study}>
                {l.study}
              </a>
            )}
            <Out className={p.study ? 'btn' : 'btn btn--primary'} href={p.live} t={t}>
              {liveLabel}
            </Out>
            {p.code && (
              <Out className="btn btn--ghost" href={p.code} t={t}>
                {l.code}
              </Out>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Projects({ t }) {
  const s = t.projects;
  const all = [s.featured, ...s.items];
  return (
    <section className="projects" id="projetos" aria-labelledby="h-projetos">
      <div className="wrap">
        <div className="section__head">
          <h2 id="h-projetos">{s.title}</h2>
          <p>{s.intro}</p>
        </div>
        <Index t={t} items={all} />
      </div>
      <Featured t={t} p={s.featured} />
      {s.items.map((p, i) => (
        <Showcase key={p.id} t={t} p={p} flip={i % 2 === 1} />
      ))}
      <div className="wrap">
        <p className="more">
          {s.more} <Out href={`${LINKS.github}?tab=repositories`} t={t}>{s.moreLink}</Out>
        </p>
      </div>
    </section>
  );
}

const START = 2017;
const END = 2029;
const NOW = 2026.86;
const pos = (y) => `${(((y === 'now' ? NOW : y) - START) / (END - START)) * 100}%`;
const span = (a, b) => `${(((b === 'now' ? NOW : b) - a) / (END - START)) * 100}%`;

function Gantt({ tl }) {
  const years = [];
  for (let y = START; y < END; y++) years.push(y);
  return (
    <div className="gantt" style={{ '--now': pos('now') }}>
      <h3 className="sub">{tl.title}</h3>
      <div className="gantt__axis" aria-hidden="true">
        <span />
        <div className="gantt__years">
          {years.map((y) => (
            <span key={y} style={{ left: pos(y) }}>
              {y}
            </span>
          ))}
        </div>
      </div>
      {tl.groups.map((g) => (
        <div className="gantt__group" key={g.name}>
          <p className="gantt__name">{g.name}</p>
          <ul>
            {g.rows.map((r) => (
              <li className="gantt__row" key={r.label}>
                <p className="gantt__label">
                  <strong>{r.label}</strong> <span>{r.when}</span>
                </p>
                <div className="gantt__track" aria-hidden="true">
                  {r.at ? (
                    <i className="gantt__dot" style={{ left: pos(r.at) }} />
                  ) : (
                    <>
                      <i className="gantt__bar" style={{ left: pos(r.from), width: span(r.from, r.to) }} />
                      {r.planned && <i className="gantt__bar gantt__bar--planned" style={{ left: pos('now'), width: span(NOW, r.planned) }} />}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="fine">{tl.note}</p>
    </div>
  );
}

function Path({ t }) {
  const p = t.path;
  const m = t.method;
  return (
    <section className="path" id="trajetoria" aria-labelledby="h-trajetoria">
      <div className="wrap">
        <div className="section__head">
          <h2 id="h-trajetoria">{p.title}</h2>
          <p>{p.intro}</p>
        </div>

        <Gantt tl={p.timeline} />

        <div className="path__cols">
          <div>
            <h3 className="sub">{p.workTitle}</h3>
            <p className="fine path__note">{p.workNote}</p>
            <ul className="entries">
              {p.work.map((i) => (
                <li key={i.what + i.where}>
                  <p className="entries__when">{i.when}</p>
                  <p className="entries__what">{i.what}, {i.where}</p>
                  <p>{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub">{p.educationTitle}</h3>
            <ul className="entries">
              {p.education.map((i) => (
                <li key={i.what}>
                  <p className="entries__when">{i.when}</p>
                  <p className="entries__what">{i.what}, {i.where}</p>
                  <p>{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lessons">
          <h3 className="sub">{m.title}</h3>
          <ul>
            {m.items.map((x) => (
              <li key={x.title}>
                <h4>{x.title}</h4>
                <p>{x.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="path__cols">
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
          </div>
          <div>
            <h3 className="sub">{p.coursesTitle}</h3>
            <ul className="courses">
              {p.courses.map(([name, info]) => (
                <li key={name}>
                  <span className="courses__name">{name}</span>
                  <span className="courses__info">{info}</span>
                </li>
              ))}
            </ul>
          </div>
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
    <section className="contact" id="contato" aria-labelledby="h-contato">
      <div className="wrap contact__grid">
        <div>
          <h2 id="h-contato">{c.title}</h2>
          <p>{c.intro}</p>
          <ul className="roles">
            {c.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="related">{c.related}</p>
          <p>{c.outro}</p>
        </div>
        <div className="contact__card">
          <dl className="channels">
            <div>
              <dt>{c.email}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button type="button" className="tool tool--text" onClick={copy}>
                  {copied ? c.copied : c.copy}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? c.copied : ''}</span>
              </dd>
            </div>
            <div>
              <dt>{c.whatsapp}</dt>
              <dd><Out href={LINKS.whatsapp} t={t}>{c.whatsappText}</Out></dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd><Out href={LINKS.linkedin} t={t}>linkedin.com/in/matheusfranciscols</Out></dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd><Out href={LINKS.github} t={t}>github.com/MatheusFranciscoLS</Out></dd>
            </div>
          </dl>
          <a className="btn btn--primary btn--wide" href={paths[lang].resume} download={paths[lang].resumeName}>
            <Icon name="download" />
            {c.resume}
          </a>
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
      <main id="conteudo" tabIndex="-1">
        <Hero t={t} lang={lang} />
        <Projects t={t} />
        <Path t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <footer className="foot">
        <div className="wrap foot__row">
          <p>
            {t.footer.text} {t.footer.updated}
          </p>
          <p>
            <Out href={REPO} t={t}>{t.footer.source}</Out>
          </p>
        </div>
      </footer>
    </>
  );
}
