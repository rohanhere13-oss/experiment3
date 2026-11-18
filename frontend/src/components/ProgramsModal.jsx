import React from 'react';

export default function ProgramsModal({ isOpen, onClose, onAskAboutCourse }) {
  if (!isOpen) return null;

  const programs = [
    {
      id: 'cse',
      name: 'B.Tech in Computer Science & Engineering (CSE)',
      degree: 'Undergraduate • 4 Years',
      seats: '180 Seats',
      fee: '$4,500 / ₹2,40,000 per year',
      specializations: ['Artificial Intelligence & ML', 'Cloud Computing', 'Cybersecurity', 'Full-Stack Software Dev'],
      desc: 'Riverview flagship program with access to NVIDIA GPU Compute Cluster, Google Cloud Innovation Lab, and 6-month capstone industry internships.'
    },
    {
      id: 'ece',
      name: 'B.Tech in Electronics & Communication Engineering (ECE)',
      degree: 'Undergraduate • 4 Years',
      seats: '120 Seats',
      fee: '$4,000 / ₹2,10,000 per year',
      specializations: ['VLSI Design & Microchips', 'IoT & Embedded Systems', 'Robotics & Automation', '5G/6G Wireless'],
      desc: 'Industry-partnered curriculum with Texas Instruments, Cadence chip design suites, and autonomous mobile robotics arenas.'
    },
    {
      id: 'mech',
      name: 'B.Tech in Mechanical & Mechatronics Engineering',
      degree: 'Undergraduate • 4 Years',
      seats: '90 Seats',
      fee: '$4,000 / ₹2,10,000 per year',
      specializations: ['Electric Vehicles & Smart Mobility', 'Autonomous Robotics', '3D Additive Manufacturing'],
      desc: 'Hands-on engineering featuring the Formula Student Racing workshop, CNC machining studios, and wind-tunnel aero testing.'
    },
    {
      id: 'ds',
      name: 'B.Sc in Data Science & Artificial Intelligence',
      degree: 'Undergraduate • 3–4 Years (Honors)',
      seats: '60 Seats',
      fee: '$3,200 / ₹1,60,000 per year',
      specializations: ['Statistical Machine Learning', 'Computer Vision & NLP', 'Big Data Architecture'],
      desc: 'Rigorous mathematical and computational foundation designed for future data scientists, quantitative researchers, and AI analysts.'
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration (BBA)',
      degree: 'Undergraduate • 3 Years',
      seats: '120 Seats',
      fee: '$3,500 / ₹1,80,000 per year',
      specializations: ['Global Business Management', 'FinTech & Analytics', 'Digital Marketing & E-Commerce'],
      desc: 'Harvard case-study method combined with summer corporate internships and incubation support from Riverview E-Cell.'
    },
    {
      id: 'mba',
      name: 'Master of Business Administration (MBA)',
      degree: 'Postgraduate • 2 Years',
      seats: '90 Seats',
      fee: '$5,200 / ₹2,80,000 per year',
      specializations: ['Technology Leadership', 'Venture Capital & Finance', 'Product Management'],
      desc: '100% placement track record with average starting salary of $16,500 (₹14.5 LPA) across top global consultancies and financial firms.'
    }
  ];

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
        maxWidth: 860,
        width: '100%',
        maxHeight: '88vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
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
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Riverview College Academic Programs
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 2 }}>
              Undergraduate & Postgraduate Degree Curricula
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

        {/* Scrollable list of programs */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          {programs.map((prog) => (
            <div
              key={prog.id}
              style={{
                padding: '20px',
                borderRadius: 14,
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#93c5fd';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(12, 25, 44, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0c192c' }}>
                    {prog.name}
                  </h4>
                  <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: '#64748b', marginTop: 3 }}>
                    <span>{prog.degree}</span>
                    <span>•</span>
                    <strong style={{ color: '#2563eb' }}>{prog.seats}</strong>
                    <span>•</span>
                    <strong style={{ color: '#16a34a' }}>{prog.fee}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onAskAboutCourse(`Tell me about ${prog.name}, its admission requirements, and career opportunities.`);
                  }}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '8px 14px',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>🤖 Ask Chatbot About This</span>
                </button>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                {prog.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {prog.specializations.map((spec, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      backgroundColor: '#eff6ff',
                      color: '#1e40af',
                      fontSize: '0.76rem',
                      fontWeight: 600
                    }}
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
