import { ArrowUpRight, Code2 } from 'lucide-react';
import { featuredProjects } from '../data/portfolio';

export default function FeaturedProjects({ lang, text }) {
  const flagship = featuredProjects[0];
  const others = featuredProjects.slice(1);

  return (
    <section className="section featured" id="projetos">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>

        {/* Flagship project */}
        <article className="flagship">
          <div className="flagship__visual">
            <div className="flagship__frame">
              <div className="flagship__toolbar" aria-hidden="true">
                <span className="flagship__dots"><i /><i /><i /></span>
                <span className="flagship__url">{flagship.name.toLowerCase()}.vercel.app</span>
              </div>
              <a href={flagship.live} target="_blank" rel="noreferrer" className="flagship__img-link">
                <img
                  src={flagship.image}
                  alt={lang === 'pt' ? `Tela do ${flagship.name}` : `${flagship.name} screen`}
                  width="1873"
                  height="955"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>

          <div className="flagship__body">
            <div className="flagship__kicker">
              <span>{text.flagship}</span>
              <span>{flagship.year}</span>
            </div>
            <h3>{flagship.name}</h3>
            <p className="flagship__desc">{flagship.description[lang]}</p>

            <div className="flagship__comparison">
              <div>
                <span>{text.challenge}</span>
                <p>{text.challengeText}</p>
              </div>
              <div>
                <span>{text.solution}</span>
                <p>{text.solutionText}</p>
              </div>
            </div>

            <ul className="flagship__caps">
              {text.capabilities.map((c) => (
                <li key={c}>
                  <span className="flagship__caps-check" aria-hidden="true">✓</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="flagship__tags">
              {flagship.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>

            <div className="flagship__links">
              {flagship.live && (
                <a className="btn btn-primary" href={flagship.live} target="_blank" rel="noreferrer">
                  {text.live} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              <a className="btn btn-secondary" href={flagship.github} target="_blank" rel="noreferrer">
                <Code2 size={16} aria-hidden="true" /> {text.code}
              </a>
            </div>
          </div>
        </article>

        {/* Other featured projects */}
        <div className="featured__heading">
          <span>{text.moreCases}</span>
        </div>
        <div className="featured__grid">
          {others.map((project) => (
            <article className="project-card card" key={project.name}>
              {project.image && (
                <div className="project-card__img">
                  <img
                    src={project.image}
                    alt={lang === 'pt' ? `${project.name}` : `${project.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="project-card__year">{project.year}</span>
                </div>
              )}
              <div className="project-card__body">
                <div className="project-card__top">
                  <h3>{project.name}</h3>
                  <span className="project-card__lang">{project.language}</span>
                </div>
                <p>{project.description[lang]}</p>
                <div className="project-card__tags">
                  {project.tags.slice(0, 4).map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="project-card__links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {text.live} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Code2 size={14} aria-hidden="true" /> {text.code}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
