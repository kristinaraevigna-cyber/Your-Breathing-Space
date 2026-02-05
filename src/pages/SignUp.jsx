import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { T, PHOTOS } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Failed to create account');
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={PHOTOS.forest} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: '0 0 240px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: `0 8px 32px ${T.accentGlow}`,
          }}>
            <Icons.Wind size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, color: T.cream }}>
            Begin Your Journey
          </h1>
          <p style={{ color: T.creamMuted, fontSize: 13, marginTop: 6 }}>Create your wellness space</p>
        </div>

        <div style={{
          flex: 1, background: T.bgCard, borderRadius: '28px 28px 0 0',
          padding: '32px 28px', border: `1px solid ${T.border}`, borderBottom: 'none',
        }}>
          {error && (
            <div style={{
              background: T.coralGlow, border: `1px solid rgba(232,118,106,0.3)`,
              borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 16,
              color: T.coral, fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '16px', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
              color: 'white', border: 'none',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
              fontFamily: "'DM Sans', sans-serif", marginTop: 8,
              boxShadow: `0 4px 20px ${T.accentGlow}`,
            }}>
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <Icons.ArrowRight size={18} color="white" />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: T.creamMuted, fontSize: 14 }}>Already have an account? </span>
            <span onClick={() => navigate('/login')} style={{ color: T.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
