import React, { useState, useEffect, useRef } from 'react';
import ChatDrawer from './ChatDrawer';

const API_BASE = 'http://localhost:8000/api';

export default function ChatbotView({ onOpenContact, initialQuery = '' }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState(() => {
    return localStorage.getItem('riverview_session_token') || '';
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const starterChips = [
    { label: '🎓 Admissions & Deadlines', query: 'What are the admission deadlines and application process for 2025?' },
    { label: '💻 B.Tech in CSE & Specializations', query: 'What are the details, seats, and curriculum of B.Tech CSE?' },
    { label: '💰 Annual Fees & Hostels', query: 'What are the annual tuition and hostel fees at Riverview College?' },
    { label: '🏆 Scholarships & Financial Aid', query: 'What scholarships and fee concessions are available?' },
    { label: '🚀 Placement Stats & Recruiters', query: 'What is the placement percentage, average package, and top recruiters?' },
    { label: '🏡 Campus Facilities & Labs', query: 'What labs, sports facilities, and library resources are on campus?' }
  ];

  // Load conversations list on mount
  useEffect(() => {
    fetchConversations();
  }, [sessionToken]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hello! I'm Riverview's assistant. How can I help you today?",
          created_at: new Date().toISOString(),
          is_welcome: true
        }
      ]);
    }
  }, []);

  // Handle initial query if passed
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations/`, {
        headers: {
          'X-Session-Token': sessionToken || ''
        }
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        if (data.session_token && data.session_token !== sessionToken) {
          setSessionToken(data.session_token);
          localStorage.setItem('riverview_session_token', data.session_token);
        }
      }
    } catch (err) {
      console.warn('Backend connection notice:', err);
    }
  };

  const handleSelectConversation = async (convId) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/conversations/${convId}/messages/`, {
        headers: { 'X-Session-Token': sessionToken }
      });
      if (res.ok) {
        const data = await res.json();
        setConversationId(convId);
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Error fetching conversation messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setConversationId(null);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm Riverview's assistant. How can I help you today?",
        created_at: new Date().toISOString(),
        is_welcome: true
      }
    ]);
  };

  const handleDeleteConversation = async (convId) => {
    try {
      const res = await fetch(`${API_BASE}/conversations/${convId}/`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': sessionToken }
      });
      if (res.ok) {
        setConversations(prev => prev.filter(c => c.id !== convId));
        if (conversationId === convId) {
          handleNewChat();
        }
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  };

  const handleRenameConversation = async (convId, newTitle) => {
    try {
      const res = await fetch(`${API_BASE}/conversations/${convId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken
        },
        body: JSON.stringify({ title: newTitle })
      });
      if (res.ok) {
        const updated = await res.json();
        setConversations(prev => prev.map(c => c.id === convId ? { ...c, title: updated.title } : c));
      }
    } catch (err) {
      console.error('Error renaming conversation:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations/clear_all/`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': sessionToken }
      });
      if (res.ok) {
        setConversations([]);
        handleNewChat();
      }
    } catch (err) {
      console.error('Error clearing conversations:', err);
    }
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isLoading) return;

    // Reset input
    setInputValue('');

    // Append user message to UI immediately
    const tempUserMsg = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: textToSend,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken
        },
        body: JSON.stringify({
          message: textToSend,
          conversation_id: conversationId,
          session_token: sessionToken
        })
      });

      if (res.ok) {
        const data = await res.json();

        if (data.session_token && data.session_token !== sessionToken) {
          setSessionToken(data.session_token);
          localStorage.setItem('riverview_session_token', data.session_token);
        }

        if (data.conversation_id) {
          setConversationId(data.conversation_id);
        }

        const assistantMsg = {
          id: data.message_id || Date.now(),
          role: 'assistant',
          content: data.reply,
          created_at: data.created_at || new Date().toISOString(),
          is_grounded: data.is_grounded,
          latency_ms: data.latency_ms,
          feedback_rating: null
        };

        setMessages(prev => [...prev, assistantMsg]);
        fetchConversations();
      } else {
        const errData = await res.json().catch(() => ({}));
        setMessages(prev => [
          ...prev,
          {
            id: 'err-' + Date.now(),
            role: 'assistant',
            content: errData.error || "Hello! 😊 I'm having a brief connection delay reaching our campus server, but I'm here to assist you! For urgent queries regarding admissions, programs, or campus visits, please contact our friendly Admissions Office at admissions@riverview.edu or call +1 800-555-RIVER.",
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: "Hello! 😊 I'm having a brief connection delay reaching our campus server, but I'm here to assist you! For urgent queries regarding admissions, programs, or campus visits, please contact our Admissions Office at admissions@riverview.edu or call +1 800-555-RIVER.",
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleFeedback = async (msgId, rating) => {
    if (!msgId || typeof msgId === 'string') return;
    try {
      const res = await fetch(`${API_BASE}/messages/${msgId}/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken
        },
        body: JSON.stringify({ rating })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, feedback_rating: rating } : m));
      }
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  // Basic Markdown-like format renderer for assistant text
  const renderFormattedContent = (content) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 4px', color: '#0c192c' }}>{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} style={{ fontSize: '1.05rem', fontWeight: 800, margin: '10px 0 6px', color: '#0c192c' }}>{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('• ') || line.startsWith('* ') || line.startsWith('- ')) {
        const itemText = line.replace(/^[•*-]\s*/, '');
        return (
          <div key={idx} style={{ display: 'flex', gap: 6, margin: '2px 0 2px 8px' }}>
            <span style={{ color: '#2563eb', fontWeight: 700 }}>•</span>
            <span>{renderInlineBold(itemText)}</span>
          </div>
        );
      }
      if (line.trim() === '---') {
        return <hr key={idx} style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />;
      }
      if (!line.trim()) {
        return <div key={idx} style={{ height: 6 }} />;
      }
      return <p key={idx} style={{ margin: '3px 0' }}>{renderInlineBold(line)}</p>;
    });
  };

  const renderInlineBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#0c192c' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(180deg, #dbeafe 0%, #edf5fc 40%, #e2f0fc 100%)',
      position: 'relative',
      padding: '24px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Background skyline of Riverview campus at the bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        backgroundImage: 'url(/assets/skyline_bg.png)',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
        opacity: 0.28,
        pointerEvents: 'none'
      }} />

      {/* Center Top Section matching Right Panel Mockup */}
      <div style={{
        textAlign: 'center',
        maxWidth: 720,
        marginBottom: 20,
        position: 'relative',
        zIndex: 2
      }}>
        {/* Robot Character Illustration */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 6
        }}>
          <div style={{
            width: 140,
            height: 140,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src="/assets/robot_hero.png"
              alt="Riverview Robot Assistant"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 20px rgba(37, 99, 235, 0.2))'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Title and Speech Bubble Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 6
        }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#0c192c',
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '-0.02em'
          }}>
            Riverview College Chatbot
          </h1>
          {/* Blue Speech Bubble Icon matching mockup */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.4)'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        </div>

        <p style={{
          fontSize: '1.05rem',
          color: '#334155',
          fontWeight: 500,
          marginBottom: 14
        }}>
          Ask anything about admissions, programs, campus life and more!
        </p>
      </div>

      {/* Main Chat Container Card matching Mockup */}
      <div style={{
        width: '100%',
        maxWidth: 780,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 20px 45px rgba(12, 25, 44, 0.08), 0 4px 16px rgba(12, 25, 44, 0.04)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden'
      }}>
        {/* Card Header Toolbar */}
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
            }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
              Online • Grounded with Gemini-3.5-Flash
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* History Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#2563eb',
                padding: '6px 12px',
                borderRadius: 8,
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
              title="View past conversations"
            >
              <span>💬 History</span>
              {conversations.length > 0 && (
                <span style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  borderRadius: 9999,
                  padding: '1px 6px',
                  fontSize: '0.72rem'
                }}>
                  {conversations.length}
                </span>
              )}
            </button>

            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                padding: '6px 12px',
                borderRadius: 8,
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Start a new chat"
            >
              <span>+</span>
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div style={{
          minHeight: 340,
          maxHeight: 460,
          overflowY: 'auto',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id || index}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: 12
                }}
              >
                {/* Assistant Avatar matching mockup */}
                {!isUser && (
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    backgroundColor: '#e0f2fe',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1.5px solid #bfdbfe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2
                  }}>
                    <img
                      src="/assets/robot_avatar.png"
                      alt="Riverview Assistant"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div style={{ maxWidth: '82%' }}>
                  <div style={{
                    padding: isUser ? '12px 18px' : '14px 20px',
                    borderRadius: isUser ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                    backgroundColor: isUser ? '#0c192c' : '#f1f5f9',
                    color: isUser ? '#ffffff' : '#1e293b',
                    fontSize: '0.94rem',
                    lineHeight: 1.55,
                    boxShadow: isUser ? '0 4px 12px rgba(12, 25, 44, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
                    border: isUser ? 'none' : '1px solid #e2e8f0',
                  }}>
                    {isUser ? (
                      <div>{msg.content}</div>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}
                  </div>

                  {/* Feedback and Timestamp for Assistant Messages */}
                  {!isUser && !msg.is_welcome && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 6,
                      marginLeft: 4,
                      fontSize: '0.74rem',
                      color: '#94a3b8'
                    }}>
                      <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                      {/* Thumbs up / down feedback (SRS FR-2.7) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          onClick={() => handleFeedback(msg.id, 'up')}
                          style={{
                            padding: '2px 5px',
                            borderRadius: 4,
                            backgroundColor: msg.feedback_rating === 'up' ? '#dcfce7' : 'transparent',
                            color: msg.feedback_rating === 'up' ? '#16a34a' : '#94a3b8',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                          }}
                          title="Helpful response"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, 'down')}
                          style={{
                            padding: '2px 5px',
                            borderRadius: 4,
                            backgroundColor: msg.feedback_rating === 'down' ? '#fee2e2' : 'transparent',
                            color: msg.feedback_rating === 'down' ? '#dc2626' : '#94a3b8',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                          }}
                          title="Needs improvement"
                        >
                          👎
                        </button>
                      </div>

                      {msg.latency_ms && (
                        <span>• {(msg.latency_ms / 1000).toFixed(1)}s</span>
                      )}
                    </div>
                  )}

                  {/* Timestamp for User message */}
                  {isUser && (
                    <div style={{ textAlign: 'right', marginTop: 4, marginRight: 4, fontSize: '0.72rem', color: '#94a3b8' }}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #bfdbfe',
              }}>
                <img
                  src="/assets/robot_avatar.png"
                  alt="Assistant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '4px 20px 20px 20px',
                backgroundColor: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                border: '1px solid #e2e8f0'
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2563eb', animation: 'bounceDot 1.4s infinite ease-in-out both' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2563eb', animation: 'bounceDot 1.4s infinite ease-in-out both 0.2s' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2563eb', animation: 'bounceDot 1.4s infinite ease-in-out both 0.4s' }} />
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: 6, fontWeight: 500 }}>
                  Riverview assistant is typing...
                </span>
              </div>
            </div>
          )}

          {/* Starter Chips (shown when only 1 or 2 messages) */}
          {messages.length <= 2 && !isLoading && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Suggested Questions:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.query)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 9999,
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0c192c',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.15s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                      e.currentTarget.style.borderColor = '#93c5fd';
                      e.currentTarget.style.color = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.color = '#0c192c';
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area strictly matching Mockup */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#ffffff'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              position: 'relative'
            }}
          >
            {/* Rounded pill input with magnifying glass on left */}
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                position: 'absolute',
                left: 18,
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>

              <input
                ref={inputRef}
                type="text"
                placeholder="Type your question..."
                value={inputValue}
                maxLength={500}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 70px 14px 48px',
                  borderRadius: 9999,
                  border: '1.5px solid #e2e8f0',
                  fontSize: '0.96rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#0c192c',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.03)';
                }}
              />

              {/* Character counter (SRS FR-2.9) */}
              {inputValue.length > 0 && (
                <span style={{
                  position: 'absolute',
                  right: 18,
                  fontSize: '0.74rem',
                  color: inputValue.length > 450 ? '#ef4444' : '#94a3b8',
                  fontWeight: 500
                }}>
                  {inputValue.length}/500
                </span>
              )}
            </div>

            {/* Blue Ask Pill Button matching Mockup */}
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{
                backgroundColor: inputValue.trim() ? '#2563eb' : '#94a3b8',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.94rem',
                padding: '13px 26px',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
                boxShadow: inputValue.trim() ? '0 4px 14px rgba(37, 99, 235, 0.35)' : 'none',
                cursor: inputValue.trim() ? 'pointer' : 'default'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Paper Airplane Send Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>

      {/* Info notice strictly matching Mockup */}
      <div style={{
        marginTop: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.86rem',
        color: '#475569',
        position: 'relative',
        zIndex: 5
      }}>
        <span style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#0c192c',
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.72rem',
          fontWeight: 800
        }}>
          i
        </span>
        <span>
          For urgent inquiries, please{' '}
          <button
            onClick={onOpenContact}
            style={{
              color: '#0c192c',
              fontWeight: 700,
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            contact our admissions office.
          </button>
        </span>
      </div>

      {/* History Drawer Modal */}
      <ChatDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        conversations={conversations}
        currentConvId={conversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
