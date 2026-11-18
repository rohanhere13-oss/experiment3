import React from 'react';

export default function FloatingChatButton({ onClick, isOpen, unreadCount = 1 }) {
  if (isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }}>
      {/* Floating Prompt Bubble */}
      <div style={{
        backgroundColor: '#ffffff',
        color: '#0c192c',
        padding: '8px 14px',
        borderRadius: '16px 16px 4px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        fontSize: '0.84rem',
        fontWeight: 600,
        border: '1px solid #e2e8f0',
        animation: 'fadeIn 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span>👋 Need help? Chat with me!</span>
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="pulse-bot-btn"
        style={{
          width: 62,
          height: 62,
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(37, 99, 235, 0.45)',
          position: 'relative',
          transition: 'transform 0.2s, background-color 0.2s',
          border: '3px solid #ffffff'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.backgroundColor = '#1d4ed8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#2563eb';
        }}
        title="Open Riverview AI Chatbot"
      >
        <img
          src="/assets/bot_button.png"
          alt="Chatbot"
          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Fallback Icon if image fails */}
        <span style={{ fontSize: 26, display: 'none' }} id="bot-fallback-icon">🤖</span>

        {/* Red notification dot matching image */}
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            border: '2px solid #ffffff'
          }} />
        )}
      </button>
    </div>
  );
}
