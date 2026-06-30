import React from 'react';
import { Cpu, Cloud, Settings, ShieldAlert } from 'lucide-react';

export default function About({ profile }) {
  const highlights = [
    {
      icon: <Cpu size={24} style={{ color: 'var(--primary)' }} />,
      title: 'Automation & CI/CD',
      desc: 'Building robust pipelines with Jenkins and Docker to speed up releases and reduce manual tasks.'
    },
    {
      icon: <Cloud size={24} style={{ color: 'var(--secondary)' }} />,
      title: 'Cloud Infrastructure',
      desc: 'Architecting secure AWS services, virtual networks, and load-balanced server environments.'
    },
    {
      icon: <Settings size={24} style={{ color: 'var(--primary)' }} />,
      title: 'Linux Systems',
      desc: 'Proficient in Bash shell scripting, kernel administration, and package management automation.'
    },
    {
      icon: <ShieldAlert size={24} style={{ color: 'var(--secondary)' }} />,
      title: 'Security Practices',
      desc: 'Enforcing security groups, AWS IAM roles, and secret key configurations across applications.'
    }
  ];

  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Bio Panel */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '1.5rem' }}>My Story</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {profile.aboutText || 'DevOps enthusiast with experience in Linux, AWS, Docker, and CI/CD automation. I enjoy building scalable infrastructure and automating deployments.'}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              I thrive at the intersection of development and operations. My objective is to bridge the gap by deploying code rapidly and maintaining 99.9% uptime, enabling developer agility and application resilience.
            </p>
          </div>

          {/* Quick Stats/Focus Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {highlights.map((h, i) => (
              <div key={i} className="glass-panel" style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                {h.icon}
                <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>{h.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
