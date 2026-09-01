import { ArrowUpRight, Code2, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectCategories, projects } from '../../data/portfolio';

const normalize = (value) =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function ProjectArchive({ lang, text }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const visibleProjects = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return projects.filter((project) => {
      const categoryMatches = category === 'all' || project.category === category;
      const searchable = normalize([
        project.name,
        project.repo,
        project.language,
        project.description[lang],
        ...project.tags,
      ].filter(Boolean).join(' '));
      return categoryMatches && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, lang, query]);

  return (
    <section className="section archive-section" aria-labelledby="archive-title">
      <div className="section-inner">
        <div className="archive-top">
          <div className="section-heading">
            <p className="section-eyebrow">{text.eyebrow}</p>
            <h2 id="archive-title">{text.title}</h2>
            <p>{text.intro}</p>
          </div>

          <label className="project-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">{text.search}</span>
            <input
              type="search"
              placeholder={text.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="archive-filters" role="group" aria-label="Filtrar projetos">
          {projectCategories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? 'is-active' : ''}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {text.categories[item]}
            </button>
          ))}
        </div>

        <div className="archive-count" aria-live="polite">
          <span>{String(visibleProjects.length).padStart(2, '0')}</span>
          {text.showing}
        </div>

        {visibleProjects.length > 0 ? (
          <div className="project-archive">
            {visibleProjects.map((project, index) => (
              <article className="archive-card" key={project.github}>
                <div className="archive-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="archive-content">
                  <div className="archive-meta">
                    <span>{project.year}</span>
                    <span>{text.categories[project.category]}</span>
                    <span>{project.language}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description[lang]}</p>
                  <div className="archive-tags">
                    {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="archive-links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {text.live}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Code2 size={16} aria-hidden="true" />
                    {text.code}
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="archive-empty">{text.empty}</p>
        )}
      </div>
    </section>
  );
}
