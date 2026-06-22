import React from 'react';
import { ExternalLink, GitBranch, Folder } from 'lucide-react';

export default function Projects({ projects }) {
  return (
    <section id="projects" style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {projects.map((project, index) => (
            <div 
              key={project.id || project._id || index}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '28px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 229, 255, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Category Ribbon */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                color: 'var(--secondary)',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {project.category || 'DevOps'}
              </div>

              {/* Title Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 255, 156, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0, 255, 156, 0.15)'
                }}>
                  <Folder size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>{project.title}</h3>
              </div>

              {/* Description */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '20px',
                flexGrow: 1
              }}>
                {project.description}
              </p>

              {/* Tech Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px'
              }}>
                {project.technologies?.map((tech, i) => (
                  <span 
                    key={i} 
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link Buttons */}
              <div style={{ display: 'flex', gap: '16px' }}>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <GitBranch size={14} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-primary"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
