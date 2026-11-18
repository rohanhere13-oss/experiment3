import React, { useState } from 'react';

export default function SearchModal({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'B.Tech CSE Seats & Curriculum', q: 'What are the curriculum, seat count, and specialization details for B.Tech in CSE?' },
    { label: 'Annual Tuition Fees 2025–26', q: 'What are the annual tuition and hostel fees for undergraduate programs?' },
    { label: 'Merit Scholarships & Aid', q: 'What scholarships and fee waivers are available for incoming students?' },
    { label: 'Hostels & Mess Facilities', q: 'Tell me about the hostel rooms, air conditioning, and dining mess facilities.' },
    { label: 'Highest & Average Placements', q: 'What was the highest package, average package, and placement rate?' },
    { label: 'Admissions Deadlines & RSAT', q: 'What is the priority application deadline and eligibility requirements?' }
  ];

  const filteredLinks = quickLinks.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.q.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(12, 25, 44, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '80px 20px 20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        maxWidth: 600,
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Search Input Bar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span style={{ color: '#94a3b8' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search programs, fees, admissions, faculty, hostels..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: '#0c192c',
              fontWeight: 500
            }}
          />
          <button onClick={onClose} style={{ color: '#94a3b8', fontSize: '1.1rem', padding: 4 }}>
            ✕
          </button>
        </div>

        {/* Results / Quick Suggestions */}
        <div style={{ padding: '16px 20px 24px', maxHeight: 360, overflowY: 'auto' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
            Instant Answers with AI Assistant:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredLinks.length === 0 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8' }}>
                <p>No exact match. Click below to ask the AI Chatbot directly:</p>
                <button
                  onClick={() => {
                    onClose();
                    onSelectTopic(query);
                  }}
                  style={{
                    marginTop: 10,
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: '0.86rem'
                  }}
                >
                  Ask Chatbot: "{query}"
                </button>
              </div>
            ) : (
              filteredLinks.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onClose();
                    onSelectTopic(item.q);
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                    e.currentTarget.style.borderColor = '#bfdbfe';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0c192c' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
                      {item.q}
                    </div>
                  </div>
                  <span style={{ color: '#2563eb', fontSize: '1rem', fontWeight: 700 }}>→</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
