import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { T } from '../lib/theme';
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
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) throw error;
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Failed to create account');
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
      <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: `${T.bgCardPink}50`, top: -60, left: -60 }} />
      <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: `1.5px solid ${T.blushDark}15`, top: 60, left: 40 }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0 0 240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Icons.Leaf size={26} color={T.cream} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 600, color: T.dark }}>Start Your Journey</h1>
          <p style={{ color: T.textMuted, fontSize: 13, marginTop: 6 }}>Create your wellness space</p>
        </div>

        <div style={{ flex: 1, background: T.cream, borderRadius: '28px 28px 0 0', padding: '32px 28px', boxShadow: '0 -4px 30px rgba(42,42,42,0.06)' }}>
          {error && (
            <div style={{ background: `${T.coral}15`, border: `1px solid ${T.coral}30`, borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 16, color: T.coral, fontSize: 13 }}>{error}</div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.sage)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.sage)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = T.sage)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '16px', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 600,
              background: T.dark, color: T.cream, border: 'none', letterSpacing: '0.03em',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
              fontFamily: "'DM Sans', sans-serif", marginTop: 8,
            }}>
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: T.textMuted, fontSize: 14 }}>Already have an account? </span>
            <span onClick={() => navigate('/login')} style={{ color: T.sage, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
