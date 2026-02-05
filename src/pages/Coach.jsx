import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Coach() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => { loadConversations(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadConversations = async () => {
    try {
      const data = await api.get('/coach/conversations');
      setConversations(data);
      if (data.length > 0) loadMessages(data[0].id);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadMessages = async (convId) => {
    try {
      const data = await api.get(`/coach/conversations/${convId}/messages`);
      setMessages(data);
      setActiveConvId(convId);
      setShowSidebar(false);
    } catch (err) { console.error(err); }
  };

  const startNew = () => { setActiveConvId(null); setMessages([]); setShowSidebar(false); };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userMsg = input.trim();
    setInput('');
    setSending(true);
    setMessages(prev => [...prev, { id: `t-${Date.now()}`, role: 'user', content: userMsg, created_at: new Date().toISOString() }]);
    try {
      const res = await api.post('/coach/message', { conversationId: activeConvId, message: userMsg, provider: 'anthropic' });
      if (!activeConvId) { setActiveConvId(res.conversationId); loadConversations(); }
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: res.message, created_at: new Date().toISOString() }]);
    } catch {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, role: 'assistant', content: 'Sorry, I wasn\'t able to respond just now. Please try again.', created_at: new Date().toISOString() }]);
    } finally { setSending(false); }
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const fmtTime = (d) => new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  if (loading) return <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p></div>;

  return (
    <div className="bs-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', background: 'var(--color-cream)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.75rem 1.5rem', background: 'white',
        borderBottom: '1px solid var(--color-warm-dark)', flexShrink: 0,
      }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')} style={{ padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-text)' }}>AI Coach</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 300 }}>A safe space to talk things through</p>
        </div>
        <button onClick={() => setShowSidebar(!showSidebar)} style={{ background: 'var(--color-warm)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '0.85rem' }} title="History">💬</button>
        <button onClick={startNew} style={{ background: 'var(--color-sage-lighter)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '0.9rem' }} title="New">+</button>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div style={{
          position: 'absolute', top: '60px', right: '1rem', zIndex: 10,
          width: '280px', background: 'white', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-warm-dark)', boxShadow: 'var(--shadow-lg)',
          maxHeight: '320px', overflowY: 'auto',
        }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-warm)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-soft)' }}>Past conversations</div>
          {conversations.length === 0 ? (
            <p style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>None yet</p>
          ) : conversations.map(c => (
            <button key={c.id} onClick={() => loadMessages(c.id)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 1rem',
              background: c.id === activeConvId ? 'var(--color-sage-lighter)' : 'transparent',
              border: 'none', borderBottom: '1px solid var(--color-warm)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.2s',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text)' }}>{c.title || 'Conversation'}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{new Date(c.updated_at || c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '8vh' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💛</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Welcome to your coaching space</h2>
            <p style={{ color: 'var(--color-text-muted)', fontWeight: 300, maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.6, fontSize: '0.92rem' }}>
              A safe, private place to talk about parenting, stress, emotions, or anything on your mind.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '460px', margin: '0 auto' }}>
              {['I\'m feeling overwhelmed today', 'I lost my temper with my child', 'I need some self-care ideas', 'Help me process a tough moment'].map(s => (
                <button key={s} onClick={() => setInput(s)} style={{
                  padding: '0.5rem 1rem', border: '1.5px solid var(--color-warm-dark)',
                  borderRadius: 'var(--radius-full)', background: 'white', color: 'var(--color-text-soft)',
                  fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-sage-light)'; e.currentTarget.style.background = 'var(--color-sage-lighter)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-warm-dark)'; e.currentTarget.style.background = 'white'; }}
                >{s}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', borderRadius: 'var(--radius-lg)',
                  padding: '0.85rem 1.15rem',
                  background: msg.role === 'user' ? 'var(--color-sage)' : 'white',
                  color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--color-warm-dark)',
                  borderBottomRightRadius: msg.role === 'user' ? '6px' : 'var(--radius-lg)',
                  borderBottomLeftRadius: msg.role === 'user' ? 'var(--radius-lg)' : '6px',
                }}>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontWeight: 300 }}>{msg.content}</p>
                  <p style={{ fontSize: '0.65rem', marginTop: '0.4rem', opacity: 0.5 }}>{fmtTime(msg.created_at)}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'white', border: '1px solid var(--color-warm-dark)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1.15rem', borderBottomLeftRadius: '6px' }}>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-muted)', animation: `bsPulse 1s ease ${i * 0.15}s infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ background: 'white', borderTop: '1px solid var(--color-warm-dark)', padding: '0.75rem 1.5rem', flexShrink: 0 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <textarea
            value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Type your message..." rows={1} disabled={sending}
            className="bs-input" style={{ flex: 1, minHeight: 'unset', padding: '0.65rem 1rem', resize: 'none' }}
          />
          <button onClick={handleSend} disabled={!input.trim() || sending} className="bs-btn bs-btn-primary" style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '1rem' }}>→</span>
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', fontWeight: 300 }}>
          Private & encrypted. Not a substitute for professional support.
        </p>
      </div>

      <style>{`@keyframes bsPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }`}</style>
    </div>
  );
}