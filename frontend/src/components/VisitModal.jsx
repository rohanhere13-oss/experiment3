import React, { useState } from 'react';

export default function VisitModal({ isOpen, onClose }) {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('10:30 AM');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e) => {
    e.preventDefault();
    setConfirmed(true);
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
        maxWidth: 500,
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
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
              Book a Campus Visit
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 2 }}>
              Explore Riverview Valley • 120-Acre Scenic Campus
            </p>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', fontSize: '1.2rem', padding: 4 }}>
            ✕
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {confirmed ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: 10 }}>🏫</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0c192c', marginBottom: 8 }}>
                Tour Confirmed!
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 20 }}>
                We look forward to hosting you on <strong>{date || 'Next Monday'}</strong> at <strong>{slot}</strong>!
                A campus visitor parking pass and itinerary have been sent to <strong>{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                style={{
                  backgroundColor: '#0c192c',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '10px 24px',
                  borderRadius: 9999
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Visitor Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Taylor Swift"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="taylor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Tour Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="10:30 AM">Morning (10:30 AM)</option>
                    <option value="02:30 PM">Afternoon (2:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Number of Attendees
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons (Student + Parent)</option>
                    <option value="3">3–4 Persons (Family)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Preferred Tour Date (Mon / Wed / Fri)
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#0c192c',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  padding: '12px 20px',
                  borderRadius: 9999,
                  marginTop: 6
                }}
              >
                Confirm Tour Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
