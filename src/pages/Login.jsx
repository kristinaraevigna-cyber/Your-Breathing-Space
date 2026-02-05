import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: T.cream,
    border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
    fontSize: 15, color: T.dark, fontFamily: "'DM Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `${T.bgCardPink}60`, top: -80, right: -80 }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: `1.5px solid ${T.blushDark}20`, top: 40, right: 20 }} />
      <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: `${T.bgCardPink}30`, bottom: 100, left: -80 }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Logo area */}
        <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: T.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Icons.Leaf size={30} color={T.cream} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, color: T.dark, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Breathing Space</h1>
        </div>

        {/* Form card */}
        <div style={{ flex: 1, background: T.cream, borderRadius: '28px 28px 0 0', padding: '36px 28px', boxShadow: '0 -4px 30px rgba(42,42,42,0.06)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 600, color: T.dark, marginBottom: 28 }}>Welcome back</h2>

          {error && (
            <div style={{ background: `${T.coral}15`, border: `1px solid ${T.coral}30`, borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 16, color: T.coral, fontSize: 13 }}>{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.sage)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.sage)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '16px', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 600,
              background: T.dark, color: T.cream, border: 'none', letterSpacing: '0.03em',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {loading ? 'Signing in...' : 'LOG IN'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{ color: T.textMuted, fontSize: 14 }}>OR </span>
            <span onClick={() => navigate('/signup')} style={{ color: T.sage, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>SIGN UP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
