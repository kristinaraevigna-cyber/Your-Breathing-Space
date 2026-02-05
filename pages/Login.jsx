import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bs-page" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left decorative panel */}
      <div style={{
        flex: '0 0 45%',
        background: 'var(--color-sage)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%', right: '-20%',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-10%',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '320px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌿</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'white',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}>Welcome back to your space</h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.95rem',
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            Your journey continues. Pick up right where you left off.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
      }}>
        <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            marginBottom: '0.5rem',
          }}>Log in</h1>
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.92rem',
            fontWeight: 300,
            marginBottom: '2rem',
          }}>
            Enter your details to continue
          </p>

          {error && (
            <div className="bs-message bs-message-error" style={{ marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="bs-label">Email</label>
              <input
                type="email"
                className="bs-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label className="bs-label">Password</label>
              <input
                type="password"
                className="bs-input"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bs-btn bs-btn-primary bs-btn-full"
              disabled={loading}
              style={{ padding: '0.85rem' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            fontWeight: 300,
          }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--color-sage)', fontWeight: 500, textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bs-page > div:first-child { display: none !important; }
          .bs-page { display: block !important; }
        }
      `}</style>
    </div>
  );
}
