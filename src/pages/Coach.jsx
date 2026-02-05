import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function Coach() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, role: 'coach', content: "Welcome back. I'm your wellness coach. How are you feeling today? Whether you need to decompress or work on your wellbeing goals, I'm here to help." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const quickPrompts = [
    'I had a difficult day',
    'Help me with breathing',
    "I'm feeling burned out",
    'I need to decompress',
  ];

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/coach/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role === 'coach' ? 'assistant' : 'user',
            content: m.content,
          })),
        }),
      });
      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'coach', content: data.message || data.content },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'coach', content: "I hear you. Let's take a moment together. Try this: breathe in for 4 counts, hold for 4, and exhale for 6. This activates your parasympathetic nervous system and helps restore calm. Would you like me to guide you through a full session?" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.cream }}>
      <div style={{ background: T.dark, padding: '48px 20px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => navigate('/dashboard')} style={{ color: T.cream, padding: 4, cursor: 'pointer', background: 'none', border: 'none' }}>
          <Icons.ArrowLeft size={20} color={T.cream} />
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.Sparkle size={16} color="white" />
        </div>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: T.cream }}>Wellness Coach</h2>
          <p style={{ fontSize: 11, color: 'rgba(248,245,240,0.5)' }}>AI-powered guidance</p>
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 14 }}>
            {msg.role === 'coach' && (
              <div style={{
                width: 30, height: 30, borderRadius: 8, background: `${T.accent}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: 8, flexShrink: 0, marginTop: 2,
              }}>
                <Icons.Sparkle size={12} color={T.accent} />
              </div>
            )}
            <div style={{
              maxWidth: '78%', padding: '12px 16px', borderRadius: 16, fontSize: 14, lineHeight: 1.6,
              background: msg.role === 'user' ? T.dark : T.white,
              color: msg.role === 'user' ? T.cream : T.text,
              boxShadow: msg.role === 'coach' ? T.shadow : 'none',
              borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
              borderBottomLeftRadius: msg.role === 'coach' ? 4 : 16,
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${T.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Sparkle size={12} color={T.accent} />
            </div>
            <div style={{ padding: '12px 20px', background: T.white, borderRadius: 16, borderBottomLeftRadius: 4, boxShadow: T.shadow, display: 'flex', gap: 4 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: T.textMuted,
                  animation: 'bsPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
            <style>{`@keyframes bsPulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }`}</style>
          </div>
        )}

        {messages.length === 1 && (
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 11, color: T.textMuted, marginBottom: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quick start</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {quickPrompts.map((p, i) => (
                <button key={i} onClick={() => sendMessage(p)} style={{
                  padding: '8px 14px', background: T.white, border: `1.5px solid ${T.creamDark}`,
                  borderRadius: T.radiusFull, fontSize: 13, color: T.text, transition: 'all 0.2s',
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = `${T.accent}0a`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.creamDark; e.currentTarget.style.background = T.white; }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 16px 32px', background: T.cream, borderTop: `1px solid ${T.creamDark}` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Share what's on your mind..."
            style={{
              flex: 1, padding: '14px 18px', background: T.white, border: `1.5px solid ${T.creamDark}`,
              borderRadius: T.radiusFull, fontSize: 14, color: T.text, fontFamily: "'DM Sans', sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = T.accent)}
            onBlur={(e) => (e.target.style.borderColor = T.creamDark)} />
          <button onClick={() => sendMessage(input)} disabled={!input.trim()} style={{
            width: 46, height: 46, borderRadius: '50%', background: T.dark,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            cursor: input.trim() ? 'pointer' : 'default', opacity: input.trim() ? 1 : 0.5,
            transition: 'all 0.2s', border: 'none',
          }}>
            <Icons.Send size={18} color={T.cream} />
          </button>
        </div>
      </div>
    </div>
  );
}
