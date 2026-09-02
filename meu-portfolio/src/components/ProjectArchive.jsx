import { ArrowUpRight, Code2, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectCategories, projects } from '../data/portfolio';

const normalize = (v) => v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function ProjectArchive({ lang, text }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return projects.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const searchable = normalize(
        [p.name, p.repo, p.language, p.description[lang], ...p.tags].filter(Boolean).join(' '),
      );
      return catOk && (!q || searchable.includes(q));
    });
  }, [category, lang, query]);

  return (
    <section className="section archive" aria-labelledby="archive-title">
      <div className="container">
        <div className="archive__top">
          <div className="section-heading">
            <p className="eyebrow">{text.eyebrow}</p>
            <h2 id="archive-title">{text.title}</h2>
            <p>{text.intro}</p>
          </div>

          <label className="archive__search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">{text.search}</span>
            <input
              type="search"
              placeholder={text.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        <div className="archive__filters" role="group" aria-label={text.filterLabel}>
          {projectCategories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={category === cat ? 'is-active' : ''}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {text.categories[cat]}
            </button>
          ))}
        </div>

        <div className="archive__count" aria-live="polite">
          <span>{String(visible.length).padStart(2, '0')}</span> {text.showing}
        </div>

        {visible.length > 0 ? (
          <div className="archive__grid" id="project-list">
            {visible.map((p, i) => (
              <article className="archive-card" key={p.github}>
                <div className="archive-card__idx">{String(i + 1).padStart(2, '0')}</div>
                <div className="archive-card__body">
                  <div className="archive-card__meta">
                    <span>{p.year}</span>
                    <span>{text.categories[p.category]}</span>
                    <span>{p.language}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description[lang]}</p>
                  <div className="archive-card__tags">
                    {p.tags.slice(0, 4).map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="archive-card__links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      {text.live} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <Code2 size={14} aria-hidden="true" /> {text.code}
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="archive__empty">{text.empty}</p>
        )}
      </div>
    </section>
  );
}
