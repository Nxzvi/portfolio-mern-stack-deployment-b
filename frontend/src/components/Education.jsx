import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

export default function Education({ profile }) {
  const education = profile.education || [];

  if (!education.length) return null;

  return (
    <section id="education" style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {education.map((edu, i) => (
            <div key={i} className="glass-panel" style={{
              padding: '28px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(0, 229, 255, 0.08)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px var(--secondary-glow)'
                }}>
                  <GraduationCap size={24} style={{ color: 'var(--secondary)' }} />
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '4px' }}>{edu.degree}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.institution}</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(0, 229, 255, 0.06)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                color: 'var(--secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}>
                <Calendar size={14} />
                {edu.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
