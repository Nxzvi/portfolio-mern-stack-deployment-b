import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ currentView, setView }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (anchor) => {
    setView('home');
    setIsOpen(false);
    // Smooth scroll to anchor after changing view
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      margin: '16px auto',
      maxWidth: '1100px',
      width: '90%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      borderRadius: '24px'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-primary)',
        background: 'linear-gradient(135deg, var(--primary), #ffffff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'pointer'
      }} onClick={() => handleNav('hero')}>
        Nezvi Hussain
      </h2>

      {/* Desktop Navigation */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '24px',
        alignItems: 'center',
      }} className="desktop-menu">
        <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>About</a></li>
        <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNav('skills'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Skills</a></li>
        <li><a href="#experience" onClick={(e) => { e.preventDefault(); handleNav('experience'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Experience</a></li>
        <li><a href="#education" onClick={(e) => { e.preventDefault(); handleNav('education'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Education</a></li>
        <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNav('projects'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Projects</a></li>
        <li><a href="#certifications" onClick={(e) => { e.preventDefault(); handleNav('certifications'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Certifications</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)' }}>Contact</a></li>
        <li>
          <button 
            onClick={() => setView(currentView === 'admin' ? 'home' : 'admin')}
            className="btn-secondary" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Shield size={14} />
            {currentView === 'admin' ? 'View Site' : 'Admin'}
          </button>
        </li>
      </ul>

      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderRadius: '16px',
          zIndex: 999
        }}>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>About</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); handleNav('skills'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>Skills</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNav('experience'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>Experience</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNav('projects'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>Projects</a>
          <a href="#certifications" onClick={(e) => { e.preventDefault(); handleNav('certifications'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>Certifications</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem' }}>Contact</a>
          <button 
            onClick={() => { setView(currentView === 'admin' ? 'home' : 'admin'); setIsOpen(false); }}
            className="btn-primary" 
            style={{ 
              padding: '10px 16px', 
              fontSize: '0.95rem',
              justifyContent: 'center',
              marginTop: '8px'
            }}
          >
            <Shield size={16} />
            {currentView === 'admin' ? 'View Site' : 'Admin Panel'}
          </button>
        </div>
      )}

      {/* Quick CSS trick to show/hide menus */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
