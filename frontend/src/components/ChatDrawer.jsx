import React, { useState } from 'react';

export default function ChatDrawer({
  isOpen,
  onClose,
  conversations,
  currentConvId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onClearAll
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(12, 25, 44, 0.5)',
      backdropFilter: 'blur(3px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-start',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0c192c',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Chat History</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#94a3b8',
              fontSize: '1.2rem',
              padding: 4,
              borderRadius: 6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            ✕
          </button>
        </div>

        {/* New Chat Button */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '11px 16px',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <span>+</span>
            <span>Start New Conversation</span>
          </button>
        </div>

        {/* Conversation List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          {conversations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No past conversations yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Ask a question to begin!</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isSelected = conv.id === currentConvId;
              const isEditing = editingId === conv.id;

              return (
                <div
                  key={conv.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
                    border: isSelected ? '1.5px solid #60a5fa' : '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onClick={() => {
                    if (!isEditing) {
                      onSelectConversation(conv.id);
                      onClose();
                    }
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onRenameConversation(conv.id, editTitle);
                            setEditingId(null);
                          } else if (e.key === 'Escape') {
                            setEditingId(null);
                          }
                        }}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '100%',
                          padding: '4px 6px',
                          borderRadius: 6,
                          border: '1px solid #3b82f6',
                          fontSize: '0.86rem',
                          outline: 'none'
                        }}
                      />
                    ) : (
                      <>
                        <div style={{
                          fontSize: '0.88rem',
                          fontWeight: isSelected ? 700 : 600,
                          color: '#0c192c',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {conv.title || 'Conversation'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                          {conv.message_count} messages • {new Date(conv.updated_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} onClick={(e) => e.stopPropagation()}>
                    {isEditing ? (
                      <button
                        onClick={() => {
                          onRenameConversation(conv.id, editTitle);
                          setEditingId(null);
                        }}
                        style={{ padding: 4, color: '#16a34a', fontSize: '0.85rem' }}
                        title="Save title"
                      >
                        ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(conv.id);
                          setEditTitle(conv.title);
                        }}
                        style={{ padding: 4, color: '#94a3b8', fontSize: '0.85rem' }}
                        title="Rename"
                      >
                        ✎
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteConversation(conv.id)}
                      style={{ padding: 4, color: '#ef4444', fontSize: '0.85rem' }}
                      title="Delete conversation"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Clear All Footer */}
        {conversations.length > 0 && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all past conversations?')) {
                  onClearAll();
                }
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #fca5a5',
                color: '#dc2626',
                fontSize: '0.82rem',
                fontWeight: 600,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            >
              Clear All Chat History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
