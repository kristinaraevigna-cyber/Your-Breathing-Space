import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { T, PHOTOS } from '../lib/theme';
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
    width: '100%', padding: '14px 16px', background: T.creamGhost,
    border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
    fontSize: 15, color: T.cream, transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: T.bg, position: 'relative', overflow: 'hidden',
    }}>
      {/* Background image with overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={PHOTOS.nature} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero */}
        <div style={{
          flex: '0 0 300px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', boxShadow: `0 8px 32px ${T.accentGlow}`,
          }}>
            <Icons.Wind size={30} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 600, color: T.cream, marginBottom: 8 }}>
            Breathing Space
          </h1>
          <p style={{ color: T.creamMuted, fontSize: 14, letterSpacing: '0.08em', fontWeight: 300 }}>
            WELLNESS COACHING
          </p>
        </div>

        {/* Form */}
        <div style={{
          flex: 1, background: T.bgCard, borderRadius: '28px 28px 0 0',
          padding: '36px 28px', border: `1px solid ${T.border}`, borderBottom: 'none',
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 600, color: T.cream, marginBottom: 28 }}>
            Welcome back
          </h2>

          {error && (
            <div style={{
              background: T.coralGlow, border: `1px solid rgba(232,118,106,0.3)`,
              borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 16,
              color: T.coral, fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '16px', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
              color: 'white', border: 'none',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
              transition: 'all 0.25s ease', fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 4px 20px ${T.accentGlow}`,
            }}>
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <Icons.ArrowRight size={18} color="white" />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{ color: T.creamMuted, fontSize: 14 }}>New here? </span>
            <span onClick={() => navigate('/signup')} style={{ color: T.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Create account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
