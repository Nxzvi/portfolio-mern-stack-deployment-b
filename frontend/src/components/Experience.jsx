import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function Experience({ profile }) {
  const experience = profile.experience || [];

  if (!experience.length) return null;

  return (
    <section id="experience" style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title">Work Experience</h2>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experience.map((job, i) => (
            <div key={i} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
              {/* Timeline indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 255, 156, 0.08)',
                  border: '2px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px var(--primary-glow)'
                }}>
                  <Briefcase size={18} style={{ color: 'var(--primary)' }} />
                </div>
                {i < experience.length - 1 && (
                  <div style={{ width: '2px', flex: 1, minHeight: '40px', background: 'linear-gradient(to bottom, var(--primary), transparent)', marginTop: '8px' }}></div>
                )}
              </div>

              {/* Card */}
              <div className="glass-panel" style={{ padding: '28px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '4px' }}>{job.role}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>{job.company}</p>
                  </div>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: 'rgba(0, 255, 156, 0.08)',
                    border: '1px solid rgba(0, 255, 156, 0.2)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    height: 'fit-content'
                  }}>
                    {job.period}
                  </span>
                </div>

                <ul style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', paddingLeft: 0 }}>
                  {job.highlights.map((point, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
