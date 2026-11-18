import React, { useState } from 'react';

export default function ApplyModal({ isOpen, onClose, onAskAboutCourse }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('btech_cse');
  const [score, setScore] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(12, 25, 44, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        maxWidth: 520,
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#0c192c',
          color: '#ffffff',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Riverview College Admissions 2025–26
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 2 }}>
              Priority Application Window closes May 31, 2025
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#94a3b8',
              fontSize: '1.2rem',
              padding: 4
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0c192c', marginBottom: 8 }}>
                Application Received!
              </h4>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: 20 }}>
                Thank you, <strong>{name}</strong>! Your provisional application reference number is{' '}
                <strong style={{ color: '#2563eb' }}>RVC-2025-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                Our Admissions Counselor will reach out to <strong>{email}</strong> within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#0c192c',
                  fontWeight: 700,
                  padding: '10px 24px',
                  borderRadius: 9999
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Select Program of Interest *
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                >
                  <option value="btech_cse">B.Tech in Computer Science & Engineering (CSE) - $4,500/yr</option>
                  <option value="btech_ece">B.Tech in Electronics & Communication (ECE) - $4,000/yr</option>
                  <option value="btech_mech">B.Tech in Mechanical & Mechatronics - $4,000/yr</option>
                  <option value="bsc_ds">B.Sc in Data Science & Artificial Intelligence - $3,200/yr</option>
                  <option value="bba">Bachelor of Business Administration (BBA) - $3,500/yr</option>
                  <option value="mba">Master of Business Administration (MBA) - $5,200/yr</option>
                  <option value="mtech_ai">M.Tech in AI & Robotics - $4,200/yr</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  10+2 / High School Percentage or Entrance Rank (RSAT / JEE / SAT)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 88% aggregate or JEE 92 percentile"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#f59e0b',
                    color: '#0c192c',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    padding: '13px 20px',
                    borderRadius: 9999,
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fbbf24'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
