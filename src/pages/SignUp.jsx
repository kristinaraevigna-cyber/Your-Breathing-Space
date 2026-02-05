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
    width: '100%', padding: '14px 16px', background: T.white,
    border: `1.5px solid ${T.creamDark}`, borderRadius: T.radiusSm,
    fontSize: 15, color: T.text, transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(180deg, ${T.dark} 0%, ${T.darkAlt} 100%)`,
    }}>
      <div style={{
        flex: '0 0 280px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', border: '1px solid rgba(168,189,166,0.1)', top: -60, left: -50 }} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <Icons.Wind size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, color: T.cream }}>
            Begin Your Journey
          </h1>
          <p style={{ color: 'rgba(248,245,240,0.5)', fontSize: 13, marginTop: 6 }}>
            Create your wellness space
          </p>
        </div>
      </div>

      <div style={{
        flex: 1, background: T.cream, borderRadius: '28px 28px 0 0',
        padding: '32px 28px', display: 'flex', flexDirection: 'column',
      }}>
        {error && (
          <div style={{
            background: `${T.coral}15`, border: `1px solid ${T.coral}40`,
            borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 16,
            color: T.coral, fontSize: 13,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: T.textSec, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.creamDark)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: T.textSec, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.creamDark)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: T.textSec, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = T.accent)} onBlur={(e) => (e.target.style.borderColor = T.creamDark)} />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '16px', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
            background: T.dark, color: T.cream, border: '1.5px solid rgba(255,255,255,0.1)',
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
            fontFamily: "'DM Sans', sans-serif", marginTop: 8,
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <Icons.ArrowRight size={18} color={T.cream} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ color: T.textSec, fontSize: 14 }}>Already have an account? </span>
          <span onClick={() => navigate('/login')} style={{ color: T.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
