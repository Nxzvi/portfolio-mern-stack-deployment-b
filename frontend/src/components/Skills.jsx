import React, { useState } from 'react';

export default function Skills({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories list
  const categories = ['All', 'DevOps', 'Cloud', 'Programming', 'Databases', 'Security'];

  // Filter skills
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                background: activeCategory === cat ? 'rgba(0, 255, 156, 0.15)' : 'var(--bg-glass)',
                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseOut={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '24px'
        }}>
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.id || skill._id || index} 
              className="glass-panel" 
              style={{
                padding: '24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 156, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className={skill.icon} style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>{skill.name}</h3>
              <span style={{
                fontSize: '0.8rem',
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 255, 156, 0.08)',
                color: 'var(--primary)',
                fontWeight: 500
              }}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
