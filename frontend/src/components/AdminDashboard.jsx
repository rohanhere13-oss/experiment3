import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';

export default function AdminDashboard({ onClose, onSwitchToChat }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // Form for new knowledge entry
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('courses');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, knowledgeRes] = await Promise.all([
        fetch(`${API_BASE}/admin/analytics/`),
        fetch(`${API_BASE}/admin/knowledge/`)
      ]);

      if (analyticsRes.ok) {
        setAnalytics(await analyticsRes.json());
      }
      if (knowledgeRes.ok) {
        setKnowledgeList(await knowledgeRes.json());
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKnowledge = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/admin/knowledge/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent,
          tags: newTags,
          status: 'published'
        })
      });

      if (res.ok) {
        setStatusMessage('Entry added successfully to knowledge base!');
        setIsAdding(false);
        setNewTitle('');
        setNewContent('');
        setNewTags('');
        loadData();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error creating knowledge entry:', err);
    }
  };

  const handleDeleteKnowledge = async (id) => {
    if (!window.confirm('Delete this knowledge entry?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/knowledge/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setKnowledgeList(prev => prev.filter(k => k.id !== id));
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setStatusMessage('Re-seeding Riverview College knowledge base...');
      const res = await fetch(`${API_BASE}/admin/seed/`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setStatusMessage(data.message);
        loadData();
        setTimeout(() => setStatusMessage(''), 4000);
      }
    } catch (err) {
      console.error('Seed error:', err);
    }
  };

  const filteredKnowledge = knowledgeList.filter(k =>
    k.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    k.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (k.tags || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '32px 24px 80px',
      minHeight: 'calc(100vh - 70px)'
    }}>
      {/* Dashboard Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.6rem' }}>⚙️</span>
            <h1 style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#0c192c',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              Riverview College Administration
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: 4 }}>
            Knowledge Base Management, LLM Grounding Control, Analytics & Feedback Monitoring
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleSeedDatabase}
            style={{
              padding: '9px 16px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              border: '1px solid #bfdbfe',
              borderRadius: 8,
              fontSize: '0.86rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🔄 Re-seed Knowledge</span>
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '9px 18px',
              backgroundColor: '#0c192c',
              color: '#ffffff',
              borderRadius: 8,
              fontSize: '0.86rem',
              fontWeight: 600
            }}
          >
            Back to Website
          </button>
        </div>
      </div>

      {statusMessage && (
        <div style={{
          padding: '12px 18px',
          backgroundColor: '#dcfce7',
          color: '#166534',
          borderRadius: 10,
          marginBottom: 20,
          fontWeight: 600,
          border: '1px solid #bbf7d0',
          animation: 'fadeIn 0.2s'
        }}>
          ✓ {statusMessage}
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e2e8f0',
        marginBottom: 28,
        gap: 24
      }}>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '12px 4px',
            fontWeight: 700,
            fontSize: '0.96rem',
            color: activeTab === 'analytics' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'analytics' ? '3px solid #2563eb' : '3px solid transparent',
            marginBottom: -2,
            transition: 'all 0.2s'
          }}
        >
          📊 Analytics & Metrics
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          style={{
            padding: '12px 4px',
            fontWeight: 700,
            fontSize: '0.96rem',
            color: activeTab === 'knowledge' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'knowledge' ? '3px solid #2563eb' : '3px solid transparent',
            marginBottom: -2,
            transition: 'all 0.2s'
          }}
        >
          📚 Knowledge Base ({knowledgeList.length})
        </button>
        <button
          onClick={() => setActiveTab('unanswered')}
          style={{
            padding: '12px 4px',
            fontWeight: 700,
            fontSize: '0.96rem',
            color: activeTab === 'unanswered' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'unanswered' ? '3px solid #2563eb' : '3px solid transparent',
            marginBottom: -2,
            transition: 'all 0.2s'
          }}
        >
          ❓ Unanswered Queries ({analytics?.unanswered_queries?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          style={{
            padding: '12px 4px',
            fontWeight: 700,
            fontSize: '0.96rem',
            color: activeTab === 'enquiries' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'enquiries' ? '3px solid #2563eb' : '3px solid transparent',
            marginBottom: -2,
            transition: 'all 0.2s'
          }}
        >
          ✉️ Admissions Inquiries ({analytics?.recent_enquiries?.length || 0})
        </button>
      </div>

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && analytics && (
        <div>
          {/* Key Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 32
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '20px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Conversations
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0c192c', marginTop: 4 }}>
                {analytics.total_conversations}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: 4, fontWeight: 600 }}>
                Active Session Storage
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              padding: '20px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Messages Exchanged
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', marginTop: 4 }}>
                {analytics.total_messages}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>
                {analytics.user_messages_count} users / {analytics.assistant_messages_count} assistant
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              padding: '20px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                User Satisfaction
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a', marginTop: 4 }}>
                {analytics.satisfaction_percentage}%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>
                👍 {analytics.thumbs_up} up • 👎 {analytics.thumbs_down} down
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              padding: '20px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Avg Latency
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0c192c', marginTop: 4 }}>
                {(analytics.avg_latency_ms / 1000).toFixed(1)}s
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>
                Grounded via Gemini-3.5-Flash
              </div>
            </div>
          </div>

          {/* AI Core Specifications Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0c192c', marginBottom: 14 }}>
              🤖 AI Engine & Compliance Parameters (SRS Section 5)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: '#64748b' }}>Model Architecture:</span>{' '}
                <strong style={{ color: '#0c192c' }}>Gemini-3.5-Flash</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Grounding Strategy:</span>{' '}
                <strong style={{ color: '#16a34a' }}>Strict RAG (Riverview College Data Only)</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Identity Protection (FR-4.6):</span>{' '}
                <strong style={{ color: '#2563eb' }}>Enforced (Output Guardrail Active)</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Persona Configuration (PR-1):</span>{' '}
                <strong style={{ color: '#0c192c' }}>Warm, Cheerful, Kind, Encouraging</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Off-Topic Shielding (FR-4.5):</span>{' '}
                <strong style={{ color: '#2563eb' }}>Automatic Deflection with College Redirection</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Database Persistence:</span>{' '}
                <strong style={{ color: '#0c192c' }}>PostgreSQL / SQLite Sessions & Multi-Turn History</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Knowledge Base */}
      {activeTab === 'knowledge' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            gap: 16
          }}>
            <input
              type="text"
              placeholder="Search knowledge by title, category, or keyword..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                maxWidth: 420,
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: '1.5px solid #e2e8f0',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />

            <button
              onClick={() => setIsAdding(!isAdding)}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '10px 18px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>{isAdding ? '✕ Cancel' : '+ Add New Entry'}</span>
            </button>
          </div>

          {/* Add Knowledge Form */}
          {isAdding && (
            <form
              onSubmit={handleCreateKnowledge}
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: 16,
                border: '1.5px solid #bfdbfe',
                marginBottom: 24,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0c192c', marginBottom: 16 }}>
                Add New Knowledge to Riverview College Database
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Robotics Guild & Annual Hackathon"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    <option value="general">General Info</option>
                    <option value="academics">Academics & Departments</option>
                    <option value="courses">Courses & Programs</option>
                    <option value="eligibility">Eligibility & Admissions</option>
                    <option value="fees">Fee Structure</option>
                    <option value="facilities">Facilities & Hostels</option>
                    <option value="placements">Placements & Careers</option>
                    <option value="scholarships">Scholarships</option>
                    <option value="events">Events & News</option>
                    <option value="rules">Rules & Policies</option>
                    <option value="contact">Contact Details</option>
                    <option value="faqs">FAQs</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Content / Grounding Facts
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide precise details, dates, fee amounts, and requirements that the assistant should use."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Tags / Keywords for Search (Comma-separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="robotics, hackathon, competition, prize, lab"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '10px 20px',
                  borderRadius: 8,
                }}
              >
                Save Knowledge Entry
              </button>
            </form>
          )}

          {/* Table of Entries */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Title</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Category</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Status</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Tags</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredKnowledge.map((entry) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0c192c', maxWidth: 300 }}>
                      {entry.title}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        {entry.category_display || entry.category}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        fontSize: '0.76rem',
                        fontWeight: 600
                      }}>
                        Published
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.8rem', maxWidth: 220 }}>
                      {entry.tags || '—'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteKnowledge(entry.id)}
                        style={{
                          color: '#dc2626',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          padding: '4px 8px',
                          borderRadius: 6
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Unanswered Queries (FR-7.2) */}
      {activeTab === 'unanswered' && (
        <div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 16 }}>
            These are user questions for which the chatbot found no existing college data.
            Staff can add knowledge entries to ensure these questions are answered in the future.
          </p>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            {analytics?.unanswered_queries?.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
                🎉 Great news! No unanswered queries reported so far.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 18px', fontWeight: 700, color: '#475569', textAlign: 'left' }}>Query Text</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700, color: '#475569', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.unanswered_queries?.map((uq) => (
                    <tr key={uq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0c192c' }}>
                        "{uq.query_text}"
                      </td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>
                        {new Date(uq.created_at).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setActiveTab('knowledge');
                            setIsAdding(true);
                            setNewTitle(uq.query_text);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        >
                          + Add Knowledge
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Inquiries */}
      {activeTab === 'enquiries' && (
        <div>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            {analytics?.recent_enquiries?.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
                No contact inquiries submitted yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {analytics?.recent_enquiries?.map((enq) => (
                  <div key={enq.id} style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <strong style={{ fontSize: '1rem', color: '#0c192c' }}>{enq.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{new Date(enq.created_at).toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#2563eb', marginBottom: 6 }}>
                      {enq.email} • Subject: <strong>{enq.subject}</strong>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
