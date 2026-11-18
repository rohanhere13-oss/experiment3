import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000/api';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admissions Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Submitting your enquiry...' });

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (res.ok) {
        setStatus({
          state: 'success',
          msg: 'Thank you! Your message has been received by Riverview Admissions Office. We will respond to your email shortly.'
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ state: 'error', msg: 'Unable to submit enquiry right now. Please call +1 800-555-RIVER.' });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({ state: 'error', msg: 'Server connection error. Please contact admissions@riverview.edu.' });
    }
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
        maxWidth: 540,
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
              Contact Admissions Office
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 2 }}>
              Riverview College Administration & Student Affairs
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

        {/* Directory Info Strip */}
        <div style={{
          backgroundColor: '#eff6ff',
          padding: '12px 24px',
          borderBottom: '1px solid #bfdbfe',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.82rem',
          color: '#1e40af',
          fontWeight: 600
        }}>
          <span>📞 +1 (800) 555-RIVER</span>
          <span>✉️ admissions@riverview.edu</span>
          <span>🏢 Mon–Fri 9am–5pm</span>
        </div>

        {/* Form */}
        <div style={{ padding: '24px' }}>
          {status.state === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>✅</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0c192c', marginBottom: 8 }}>
                Enquiry Submitted!
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 20 }}>
                {status.msg}
              </p>
              <button
                onClick={() => {
                  setStatus({ state: 'idle', msg: '' });
                  onClose();
                }}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '10px 22px',
                  borderRadius: 8
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                >
                  <option value="Admissions Inquiry">Admissions Inquiry & Deadlines</option>
                  <option value="Tuition & Fee Structure">Tuition & Fee Structure</option>
                  <option value="Hostel & Accommodation">Hostel & Accommodation</option>
                  <option value="Scholarships & Aid">Scholarships & Financial Aid</option>
                  <option value="Campus Tour Booking">Campus Tour Booking</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our admissions team assist you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              {status.state === 'error' && (
                <div style={{ color: '#dc2626', fontSize: '0.84rem', fontWeight: 600 }}>
                  ⚠️ {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'loading'}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  padding: '12px 20px',
                  borderRadius: 10,
                  transition: 'background 0.2s',
                  marginTop: 6
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                {status.state === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
