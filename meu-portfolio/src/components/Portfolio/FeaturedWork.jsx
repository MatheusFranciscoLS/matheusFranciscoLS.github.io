import { ArrowUpRight, Code2 } from 'lucide-react';
import { featuredProjects } from '../../data/portfolio';

function ProjectLinks({ project, text }) {
  return (
    <div className="project-links">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          data-umami-event="project-live-open"
          data-umami-event-project={project.name}
        >
          {text.live}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        data-umami-event="project-code-open"
        data-umami-event-project={project.name}
      >
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

            <div className="technical-evidence" aria-label={text.evidenceEyebrow}>
              <span className="technical-evidence-label">{text.evidenceEyebrow}</span>
              <dl>
                {text.evidence.map((item) => (
                  <div key={item.label}>
                    <dt>{item.value}</dt>
                    <dd>{item.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="project-tags">
              {cogniVault.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <ProjectLinks project={cogniVault} text={text} />
          </div>

          <figure className="cognivault-visual">
            <div className="cv-shot-frame">
              <div className="cv-shot-toolbar" aria-hidden="true">
                <span className="cv-window-dots"><i /><i /><i /></span>
                <span className="cv-shot-domain">cognivault / secure access</span>
                <span className="cv-secure">PRIVATE</span>
              </div>
              <a
                className="cv-shot-link"
                href={cogniVault.live}
                target="_blank"
                rel="noreferrer"
                data-umami-event="cognivault-visual-open"
                aria-label={lang === 'pt' ? 'Abrir o CogniVault em uma nova aba' : 'Open CogniVault in a new tab'}
              >
                <img
                  src={cogniVault.image}
                  alt={lang === 'pt' ? 'Tela real de login do CogniVault' : 'Real CogniVault login screen'}
                  width="1873"
                  height="955"
                  loading="lazy"
                  decoding="async"
                />
                <span className="cv-shot-badge">
                  {lang === 'pt' ? 'Produto real · abrir projeto' : 'Real product · open project'}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </a>
            </div>

            <div className="cv-pipeline" role="group" aria-label={lang === 'pt' ? 'Fluxo técnico do CogniVault' : 'CogniVault technical flow'}>
              <span>UPLOAD</span><i />
              <span>INDEX</span><i />
              <span>RETRIEVE</span><i />
              <span>ANSWER</span>
            </div>

            <figcaption>
              <span>{lang === 'pt' ? 'Experiência de acesso · aplicação em produção' : 'Access experience · production application'}</span>
              <span>01 / 01</span>
            </figcaption>
          </figure>
        </article>

        <div className="supporting-heading">
          <span>{text.moreCases}</span>
          <span>04 / 25</span>
        </div>
        <div className="featured-grid">
          {supportingCases.map((project) => (
            <article className="featured-card" key={project.name}>
              <div className="featured-image">
                <img
                  src={project.image}
                  alt={lang === 'pt' ? `Tela do projeto ${project.name}` : `${project.name} project screen`}
                  loading="lazy"
                  decoding="async"
                />
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

