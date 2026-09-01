import { ArrowUpRight, Code2 } from 'lucide-react';
import { featuredProjects } from '../../data/portfolio';

function ProjectLinks({ project, text }) {
  return (
    <div className="project-links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          {text.live}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
      <a href={project.github} target="_blank" rel="noreferrer">
        <Code2 size={15} aria-hidden="true" />
        {text.code}
      </a>
    </div>
  );
}

export default function FeaturedWork({ lang, text }) {
  const cogniVault = featuredProjects[0];
  const supportingCases = featuredProjects.slice(1);

  return (
    <section className="section featured-section" id="projetos">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>

        <article className="flagship-card">
          <div className="flagship-copy">
            <div className="flagship-kicker">
              <span>{text.flagship}</span>
              <span>2026</span>
            </div>
            <h3>CogniVault</h3>
            <p className="flagship-lead">{cogniVault.description[lang]}</p>

            <div className="case-comparison">
              <div>
                <span>{text.challenge}</span>
                <p>{text.challengeText}</p>
              </div>
              <div>
                <span>{text.solution}</span>
                <p>{text.solutionText}</p>
              </div>
            </div>

            <ul className="capability-list">
              {text.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>

            <div className="project-tags">
              {cogniVault.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <ProjectLinks project={cogniVault} text={text} />
          </div>

          <div className="cognivault-visual" aria-label="Representação da interface e arquitetura do CogniVault">
            <div className="cv-window">
              <div className="cv-topbar">
                <span className="cv-logo">CV</span>
                <span>cognivault / knowledge engine</span>
                <span className="cv-secure">PRIVATE</span>
              </div>
              <div className="cv-workspace">
                <aside>
                  <span className="is-active">01 · Vault</span>
                  <span>02 · Parts</span>
                  <span>03 · Manuals</span>
                  <span>04 · AI Search</span>
                </aside>
                <div className="cv-content">
                  <div className="cv-query">
                    <span>TECHNICAL QUERY</span>
                    <strong>{lang === 'pt' ? 'Qual componente atende este conjunto?' : 'Which component matches this assembly?'}</strong>
                  </div>
                  <div className="cv-answer">
                    <div>
                      <span className="cv-label">EVIDENCE READY</span>
                      <span className="cv-score">03 SOURCES</span>
                    </div>
                    <p>{lang === 'pt' ? 'Resposta ligada a manuais, desenhos e registros aprovados.' : 'Answer linked to approved manuals, drawings and records.'}</p>
                    <div className="source-lines">
                      <span style={{ '--line-width': '92%' }} />
                      <span style={{ '--line-width': '76%' }} />
                      <span style={{ '--line-width': '58%' }} />
                    </div>
                  </div>
                  <div className="cv-pipeline">
                    <span>UPLOAD</span><i />
                    <span>INDEX</span><i />
                    <span>RETRIEVE</span><i />
                    <span>ANSWER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="supporting-heading">
          <span>{text.moreCases}</span>
          <span>04 / 25</span>
        </div>
        <div className="featured-grid">
          {supportingCases.map((project) => (
            <article className="featured-card" key={project.name}>
              <div className="featured-image">
                <img src={project.image} alt={`Tela do projeto ${project.name}`} loading="lazy" />
                <span>{project.year}</span>
              </div>
              <div className="featured-body">
                <div className="featured-title">
                  <h3>{project.name}</h3>
                  <span>{project.language}</span>
                </div>
                <p>{project.description[lang]}</p>
                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <ProjectLinks project={project} text={text} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
