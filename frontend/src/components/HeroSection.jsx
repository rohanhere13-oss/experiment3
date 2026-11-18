import React from 'react';

export default function HeroSection({ onExplorePrograms, onVisitCampus }) {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #dbeafe 0%, #eef6ff 100%)',
      padding: '48px 24px 80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background curve */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 36,
        alignItems: 'center'
      }}>
        {/* Left Column */}
        <div style={{ position: 'relative', zIndex: 2, paddingLeft: 8 }}>
          {/* Sparkle Sunburst accent */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 12,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Admissions Open 2025–26
            </span>
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0c192c',
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '-0.02em',
            marginBottom: 18
          }}>
            Learn Today,<br />
            <span style={{ color: '#0c192c' }}>Lead Tomorrow</span>
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#334155',
            fontWeight: 500,
            marginBottom: 32,
            letterSpacing: '-0.01em'
          }}>
            A vibrant community. World-class education.
          </p>

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32
          }}>
            {/* Explore Programs Yellow Pill Button */}
            <button
              onClick={onExplorePrograms}
              style={{
                backgroundColor: '#f59e0b',
                color: '#0c192c',
                fontWeight: 700,
                fontSize: '0.98rem',
                padding: '13px 26px',
                borderRadius: 9999,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fbbf24';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Explore Programs</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            {/* Visit Campus Outlined Button */}
            <button
              onClick={onVisitCampus}
              style={{
                backgroundColor: 'transparent',
                color: '#0c192c',
                fontWeight: 700,
                fontSize: '0.98rem',
                padding: '12px 26px',
                borderRadius: 9999,
                border: '1.8px solid #0c192c',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(12, 25, 44, 0.06)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Visit Campus
            </button>
          </div>

          {/* Carousel indicators matching image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4 }}>
            <span style={{ width: 22, height: 8, borderRadius: 9999, backgroundColor: '#f59e0b' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
          </div>
        </div>

        {/* Right Column: Campus Building Image */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: 480,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(12, 25, 44, 0.15)',
            border: '4px solid #ffffff',
            backgroundColor: '#ffffff'
          }}>
            <img
              src="/assets/campus_hero.png"
              alt="Riverview College Campus"
              style={{
                width: '100%',
                height: 340,
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
