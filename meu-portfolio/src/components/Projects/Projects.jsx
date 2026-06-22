import { useContext, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { projectsData } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const { t, lang } = useContext(LanguageContext);
  
  // Estado que guarda a categoria selecionada (padrão: 'all' - todos)
  const [filter, setFilter] = useState('all');

  // Filtra os projetos dinamicamente
  const filteredProjects = projectsData.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  // Separa o projeto mestre (o gigante) dos secundários
  const masterProject = filteredProjects.find(p => p.isMaster);
  const secondaryProjects = filteredProjects.filter(p => !p.isMaster);

  return (
    <section id="projetos" className="section">
      <div className="container">
        
        <div className="center-text">
          <h2 className="section-title" style={{ marginBottom: '10px' }}>
            {t('projects.title')}
          </h2>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>

          {/* --- SISTEMA DE FILTROS --- */}
          <div className="project-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              {lang === 'pt' ? 'Todos' : 'All'}
            </button>
            <button className={`filter-btn ${filter === 'backend' ? 'active' : ''}`} onClick={() => setFilter('backend')}>
              Data & Back-end
            </button>
            <button className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>
              Full-Stack
            </button>
            <button className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`} onClick={() => setFilter('frontend')}>
              Front-end UI
            </button>
          </div>
        </div>

        <div className="projects-showcase">
          
          {/* RENDERIZA O PROJETO DESTAQUE SE ELE ESTIVER NO FILTRO */}
          {masterProject && (
            <article className="master-card">
              <div className="master-img">
                <img 
  src={masterProject.img} 
  alt={t(masterProject.titleKey)} 
  loading="lazy" 
  onError={(e) => { 
    e.target.onerror = null; 
    e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"%3E%3Crect fill="%23334155" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="10" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"%3EImagem Indisponível%3C/text%3E%3C/svg%3E';
  }} 
/>
              </div>
              <div className="master-content">
                <div className="proj-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className={masterProject.iconClass} style={{ fontSize: '1.8rem', color: masterProject.iconColor }}></i>
                    <h3>{t(masterProject.titleKey)}</h3>
                  </div>
                  <span className={`tag ${masterProject.tagClass}`}>{t(masterProject.typeKey)}</span>
                </div>
                <p className="proj-desc">{t(masterProject.descKey)}</p>
                <div className="proj-tags">
                  {masterProject.tagKeys.map((tag, idx) => (
                    <span key={idx} className="tag">{t(tag)}</span>
                  ))}
                </div>
                <div className="proj-footer">
                  <div className="tech-stack">{masterProject.techStack}</div>
                  <div className="proj-actions">
                    <a href={masterProject.github} target="_blank" rel="noreferrer" className="link-item code">
                      <i className="devicon-github-original"></i> Code
                    </a>
                    <a href={masterProject.live} target="_blank" rel="noreferrer" className="link-item live">
                      Site ↗
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* RENDERIZA O GRID DOS PROJETOS MENORES (MAP) */}
          <div className="secondary-grid">
            {secondaryProjects.map(project => (
              <article className="std-card" key={project.id}>
                <img 
  src={project.img} 
  alt={t(project.titleKey)} 
  loading="lazy" 
  onError={(e) => { 
    e.target.onerror = null; 
    e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"%3E%3Crect fill="%23334155" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="10" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"%3EImagem Indisponível%3C/text%3E%3C/svg%3E';
  }} 
/>
                <div className="std-content">
                  <div className="proj-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className={project.iconClass} style={{ fontSize: '1.8rem', color: project.iconColor }}></i>
                      <h3>{t(project.titleKey)}</h3>
                    </div>
                    <span className={`tag ${project.tagClass}`}>{t(project.typeKey)}</span>
                  </div>
                  <p className="proj-desc">{t(project.descKey)}</p>
                  <div className="proj-tags">
                    {project.tagKeys.map((tag, idx) => (
                      <span key={idx} className="tag">{t(tag)}</span>
                    ))}
                  </div>
                  <div className="proj-footer">
                    <div className="tech-stack">{project.techStack}</div>
                    <div className="proj-actions">
                      <a href={project.github} target="_blank" rel="noreferrer" className="link-item code">
                        <i className="devicon-github-original"></i> Code
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer" className="link-item live">
                        Site ↗
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;