import React from 'react';

export default function StatCards({ onSelectTopic }) {
  const stats = [
    {
      id: 'ranking',
      label: 'Top-Ranked University',
      sub: 'NIRF Top 20 & NAAC A++',
      query: 'What rankings and accreditations does Riverview College have?',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c192c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0-.02 1.838l8.57 7.9a2 2 0 0 0 1.66 0l8.61-7.9z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      id: 'community',
      label: 'Diverse Community',
      sub: '5,000+ Students, 28 States',
      query: 'Tell me about the student community, culture and diversity at Riverview.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c192c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'opportunities',
      label: 'Global Opportunities',
      sub: '96.8% Placements, 240+ Recruiters',
      query: 'What are the placement statistics, packages and top recruiters at Riverview?',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c192c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34" />
          <path d="M18 14.66V17c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 17v-4" />
          <path d="M12 9a4 4 0 0 0 4-4V3H8v2a4 4 0 0 0 4 4z" />
        </svg>
      )
    },
    {
      id: 'research',
      label: 'Innovative Research',
      sub: '$5M Supercomputing & Robotics Lab',
      query: 'What research facilities and labs are available at Riverview College?',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c192c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      maxWidth: 1140,
      margin: '-38px auto 48px',
      padding: '0 24px',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        boxShadow: '0 12px 30px rgba(12, 25, 44, 0.08), 0 4px 10px rgba(12, 25, 44, 0.03)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '24px 16px',
        gap: 12
      }}>
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            onClick={() => onSelectTopic && onSelectTopic(stat.query)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '12px 14px',
              borderRadius: 14,
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRight: idx < 3 ? '1px solid #f1f5f9' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title={`Ask assistant: "${stat.query}"`}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              color: '#0c192c'
            }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0c192c',
              marginBottom: 4
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: '0.78rem',
              color: '#64748b',
              fontWeight: 500
            }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
