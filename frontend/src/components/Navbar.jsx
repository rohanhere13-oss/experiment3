import React, { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, onOpenApply, onOpenSearch }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    {
      id: 'about',
      label: 'About',
      items: [
        { title: 'Overview & Heritage', desc: 'Est. 1968, 120-acre lush campus in Riverview Valley' },
        { title: 'Leadership & Faculty', desc: 'World-renowned researchers & academic deans' },
        { title: 'Accreditations', desc: 'NAAC A++, ABET Accredited, NIRF Top-20' },
      ],
    },
    {
      id: 'academics',
      label: 'Academics',
      items: [
        { title: 'Undergraduate Programs', desc: 'B.Tech CSE, ECE, Mechanical, B.Sc Data Science, BBA' },
        { title: 'Postgraduate Programs', desc: 'M.Tech AI & Robotics, MBA, M.Sc Cognitive Computing' },
        { title: 'Academic Calendar', desc: 'Semester dates, examinations & holiday schedules' },
      ],
    },
    {
      id: 'admissions',
      label: 'Admissions',
      items: [
        { title: 'How to Apply', desc: 'Step-by-step application guide & online portal' },
        { title: 'Eligibility Criteria', desc: 'Requirements for 10+2, RSAT, JEE & GATE candidates' },
        { title: 'Fee Structure & Aid', desc: 'Tuition fees, hostel rates & $1.5M merit scholarships' },
      ],
    },
    {
      id: 'campus',
      label: 'Campus Life',
      items: [
        { title: 'Student Residences & Hostels', desc: '6 halls with Wi-Fi, dining, gym & 24/7 security' },
        { title: 'Clubs & Societies', desc: 'Robotics Guild, GDSC, Drama Society & Sports' },
        { title: 'Health & Wellness', desc: '24/7 on-campus medical clinic & counseling' },
      ],
    },
    {
      id: 'research',
      label: 'Research',
      items: [
        { title: 'Computing & AI Center', desc: '$5M facility with NVIDIA GPU Supercluster' },
        { title: 'Autonomous Robotics Lab', desc: 'Drones, humanoid control & embedded testing' },
        { title: 'Innovation Incubator', desc: 'E-Cell venture grants & student startup patents' },
      ],
    },
  ];

  return (
    <header style={{
      backgroundColor: '#0c192c',
      color: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand / Logo */}
        <div
          onClick={() => setCurrentView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Riverview College"
            style={{ height: 42, objectFit: 'contain' }}
            onError={(e) => {
              // Fallback elegant badge if image not loaded
              e.currentTarget.style.display = 'none';
            }}
          />
          <div>
            <div style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              Riverview
            </div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#94a3b8'
            }}>
              College
            </div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}>
          {navLinks.map((link) => {
            const isHovered = activeDropdown === link.id;
            return (
              <div
                key={link.id}
                onMouseEnter={() => setActiveDropdown(link.id)}
                onMouseLeave={() => setActiveDropdown(null)}
                style={{ position: 'relative' }}
              >
                <button
                  onClick={() => {
                    if (link.id === 'academics') setCurrentView('chatbot');
                    else setCurrentView('home');
                  }}
                  style={{
                    color: (currentView === 'home' && link.id === 'about') ? '#ffffff' : '#cbd5e1',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '8px 2px',
                    transition: 'color 0.2s',
                    textDecoration: (currentView === 'chatbot' && link.id === 'academics') ? 'underline' : 'none',
                    textUnderlineOffset: 6,
                    textDecorationThickness: 2,
                    textDecorationColor: '#60a5fa'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => {
                    if (!(currentView === 'chatbot' && link.id === 'academics')) {
                      e.currentTarget.style.color = '#cbd5e1';
                    }
                  }}
                >
                  <span>{link.label}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: -20,
                    width: 280,
                    backgroundColor: '#132238',
                    borderRadius: 12,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '10px 8px',
                    zIndex: 200,
                    animation: 'fadeIn 0.15s ease-out'
                  }}>
                    {link.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveDropdown(null);
                          setCurrentView('chatbot');
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f8fafc' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Chatbot Navigation Pill */}
          <button
            onClick={() => setCurrentView(currentView === 'chatbot' ? 'home' : 'chatbot')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 9999,
              backgroundColor: currentView === 'chatbot' ? '#2563eb' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
            title="Open Riverview AI Chatbot"
          >
            <span>🤖 AI Assistant</span>
          </button>

          {/* Admin link */}
          <button
            onClick={() => setCurrentView('admin')}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              color: currentView === 'admin' ? '#f59e0b' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            title="Admin & Analytics Dashboard"
          >
            ⚙️ Admin
          </button>

          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
            title="Search Website"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Yellow Apply Now Button */}
          <button
            onClick={onOpenApply}
            style={{
              backgroundColor: '#f59e0b',
              color: '#0c192c',
              fontWeight: 700,
              fontSize: '0.88rem',
              padding: '9px 20px',
              borderRadius: 9999,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fbbf24';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f59e0b';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </header>
  );
}
