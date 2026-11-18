import React, { useState } from 'react';

export default function NewsAndPrograms({ onSelectTopic, onOpenProgramsModal }) {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsItems = [
    {
      id: 1,
      title: 'Riverview College Commencement 2025',
      date: 'May 20, 2025',
      img: '/assets/news_commencement.png',
      summary: 'Over 1,200 graduating seniors from the Class of 2025 gathered at the Grand Auditorium to receive their bachelor and master degrees in the presence of keynote speaker Dr. Elena Vance.',
      query: 'Tell me about the Riverview College Commencement 2025 event.'
    },
    {
      id: 2,
      title: 'New Research Center Launches on Campus',
      date: 'May 15, 2025',
      img: '/assets/news_research.png',
      summary: 'Riverview officially inaugurated its $5M Advanced Computing and Clean Energy Research Center housing high-performance NVIDIA GPU clusters and autonomous robotics testbeds.',
      query: 'What is the new research center launched at Riverview College?'
    },
    {
      id: 3,
      title: 'Spring Festival Brings Campus Together',
      date: 'May 10, 2025',
      img: '/assets/news_festival.png',
      summary: 'Over 5,000 students and visitors celebrated the annual 3-day Riverview Fest 2025 featuring music battles, cultural showcases, hackathons, and food carnivals.',
      query: 'Tell me about student festivals and campus life at Riverview College.'
    }
  ];

  return (
    <section style={{
      maxWidth: 1200,
      margin: '0 auto 64px',
      padding: '0 24px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 36,
        alignItems: 'start'
      }}>
        {/* Left Column: Latest News */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20
          }}>
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0c192c',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              Latest News
            </h2>
            <button
              onClick={() => onSelectTopic && onSelectTopic('What are the latest news and announcements at Riverview College?')}
              style={{
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#2563eb',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {newsItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '10px 12px',
                  borderRadius: 14,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(12, 25, 44, 0.08)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  width: 90,
                  height: 60,
                  borderRadius: 8,
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#e2e8f0'
                }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#0c192c',
                    lineHeight: 1.3,
                    marginBottom: 4
                  }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Our Programs */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20
          }}>
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0c192c',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              Our Programs
            </h2>
            <button
              onClick={() => onOpenProgramsModal ? onOpenProgramsModal() : onSelectTopic('What undergraduate and graduate programs are offered?')}
              style={{
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#2563eb',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          {/* Large Program Banner Card */}
          <div
            onClick={() => onOpenProgramsModal ? onOpenProgramsModal() : onSelectTopic('What programs are offered?')}
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(12, 25, 44, 0.12)',
              cursor: 'pointer',
              height: 236,
              backgroundColor: '#1e293b'
            }}
          >
            <img
              src="/assets/programs_card.png"
              alt="Riverview Programs"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80';
              }}
            />

            {/* Bottom Dark Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 20px 16px',
              background: 'linear-gradient(to top, rgba(12, 25, 44, 0.92) 0%, rgba(12, 25, 44, 0.6) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12
            }}>
              <p style={{
                color: '#ffffff',
                fontSize: '0.92rem',
                fontWeight: 600,
                lineHeight: 1.35,
                maxWidth: 320
              }}>
                Discover a wide range of undergraduate and graduate programs.
              </p>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Detail Popup Modal */}
      {selectedNews && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(12, 25, 44, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 18,
            maxWidth: 520,
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ position: 'relative', height: 200, backgroundColor: '#0c192c' }}>
              <img
                src={selectedNews.img}
                alt={selectedNews.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedNews(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700 }}>
                {selectedNews.date}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0c192c', marginTop: 4, marginBottom: 12 }}>
                {selectedNews.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 20 }}>
                {selectedNews.summary}
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => {
                    const q = selectedNews.query;
                    setSelectedNews(null);
                    if (onSelectTopic) onSelectTopic(q);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '10px 16px',
                    borderRadius: 10,
                    fontSize: '0.88rem'
                  }}
                >
                  Ask Assistant About This
                </button>
                <button
                  onClick={() => setSelectedNews(null)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    fontWeight: 600,
                    fontSize: '0.88rem'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
