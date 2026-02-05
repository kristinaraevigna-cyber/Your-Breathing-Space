import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        .landing-root {
          --color-sage: #7C9082;
          --color-sage-light: #A3B9A8;
          --color-sage-lighter: #E8EFEA;
          --color-warm: #F5F0EB;
          --color-warm-dark: #EDE5DB;
          --color-cream: #FAFAF7;
          --color-text: #2D3436;
          --color-text-soft: #636E72;
          --color-text-muted: #9BA3A7;
          --color-accent: #C4956A;
          --color-accent-hover: #B5845B;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'Source Sans 3', system-ui, sans-serif;

          min-height: 100vh;
          background-color: var(--color-cream);
          font-family: var(--font-body);
          color: var(--color-text);
          overflow-x: hidden;
        }

        /* Subtle grain texture overlay */
        .landing-root::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .landing-root > * {
          position: relative;
          z-index: 1;
        }

        /* Navigation */
        .landing-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.75rem 2rem;
        }

        .landing-logo {
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: var(--color-sage);
          letter-spacing: -0.01em;
        }

        .landing-nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-soft);
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .nav-link:hover {
          color: var(--color-text);
          background: var(--color-sage-lighter);
        }

        .nav-link-primary {
          background: var(--color-sage);
          color: white;
          font-weight: 500;
        }

        .nav-link-primary:hover {
          background: var(--color-sage-light);
          color: white;
        }

        /* Hero Section */
        .landing-hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2rem 4rem;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: var(--color-sage-lighter);
          color: var(--color-sage);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s ease both;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 3.5rem;
          line-height: 1.12;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          animation: fadeInUp 0.6s ease 0.1s both;
        }

        .hero-title em {
          font-style: italic;
          color: var(--color-sage);
        }

        .hero-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--color-text-soft);
          margin-bottom: 2.5rem;
          max-width: 480px;
          font-weight: 300;
          animation: fadeInUp 0.6s ease 0.2s both;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          animation: fadeInUp 0.6s ease 0.3s both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: var(--color-sage);
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
          letter-spacing: 0.01em;
        }

        .btn-primary:hover {
          background: var(--color-sage-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124, 144, 130, 0.25);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: transparent;
          color: var(--color-text-soft);
          border: 1.5px solid var(--color-warm-dark);
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .btn-secondary:hover {
          border-color: var(--color-sage-light);
          color: var(--color-sage);
          background: var(--color-sage-lighter);
        }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          animation: fadeIn 1s ease 0.3s both;
        }

        .hero-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.04);
          position: relative;
        }

        .hero-card-greeting {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .hero-card-sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .week-mini {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .week-pill {
          flex: 1;
          padding: 1rem;
          background: var(--color-warm);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .week-pill:first-child {
          background: var(--color-sage-lighter);
        }

        .week-pill-num {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }

        .week-pill:first-child .week-pill-num {
          color: var(--color-sage);
        }

        .week-pill-icon {
          font-size: 1.3rem;
        }

        .progress-bar-track {
          height: 6px;
          background: var(--color-warm);
          border-radius: 100px;
          margin-top: 1.5rem;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          width: 30%;
          background: linear-gradient(90deg, var(--color-sage), var(--color-sage-light));
          border-radius: 100px;
          animation: progressGrow 1.5s ease 0.8s both;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.78rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }

        /* Floating accent card */
        .floating-card {
          position: absolute;
          bottom: -1.25rem;
          right: -1.25rem;
          background: white;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: floatIn 0.6s ease 0.8s both;
        }

        .floating-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-sage-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .floating-text {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--color-text);
        }

        .floating-subtext {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          font-weight: 300;
        }

        /* Features Section */
        .landing-features {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
        }

        .features-label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-sage);
          text-align: center;
          margin-bottom: 0.75rem;
        }

        .features-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          text-align: center;
          color: var(--color-text);
          margin-bottom: 3.5rem;
          letter-spacing: -0.01em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
          border-color: var(--color-sage-lighter);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }

        .feature-icon-sage { background: var(--color-sage-lighter); }
        .feature-icon-warm { background: var(--color-warm); }
        .feature-icon-accent { background: #F5E6D8; }

        .feature-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-soft);
          font-weight: 300;
        }

        /* Principles Section */
        .landing-principles {
          background: var(--color-warm);
          padding: 5rem 2rem;
        }

        .principles-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .principles-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          color: var(--color-text);
          margin-bottom: 1rem;
        }

        .principles-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
        }

        .principles-row {
          display: flex;
          justify-content: center;
          gap: 3.5rem;
        }

        .principle {
          text-align: center;
        }

        .principle-word {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--color-sage);
          margin-bottom: 0.35rem;
        }

        .principle-meaning {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 300;
        }

        .principle-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-sage-light);
          margin: 0 auto 0.75rem;
        }

        /* CTA Section */
        .landing-cta {
          max-width: 700px;
          margin: 0 auto;
          padding: 5rem 2rem;
          text-align: center;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--color-text);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-desc {
          font-size: 1.05rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        /* Footer */
        .landing-footer {
          border-top: 1px solid var(--color-warm-dark);
          padding: 2rem;
          text-align: center;
        }

        .footer-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 300;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .footer-link {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          font-family: var(--font-body);
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: var(--color-sage);
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translate(10px, 10px); }
          to { opacity: 1; transform: translate(0, 0); }
        }

        @keyframes progressGrow {
          from { width: 0%; }
          to { width: 30%; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .landing-hero {
            grid-template-columns: 1fr;
            padding: 3rem 1.5rem 2rem;
            gap: 2.5rem;
          }
          .hero-title { font-size: 2.5rem; }
          .hero-description { font-size: 1.05rem; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .features-grid { grid-template-columns: 1fr; }
          .principles-row { flex-direction: column; gap: 2rem; }
          .floating-card { display: none; }
        }
      `}</style>

      <div className="landing-root">
        {/* Navigation */}
        <nav className="landing-nav">
          <div className="landing-logo">Breathing Space</div>
          <div className="landing-nav-links">
            <button className="nav-link" onClick={() => navigate('/login')}>
              Log in
            </button>
            <button className="nav-link nav-link-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="landing-hero">
          <div>
            <div className="hero-badge">
              <span>🌿</span> 4-week guided programme
            </div>
            <h1 className="hero-title">
              A gentler way to<br />navigate <em>parenthood</em>
            </h1>
            <p className="hero-description">
              Breathing Space gives you the tools, reflections, and support to 
              build resilience — at your own pace, in your own time, without 
              pressure or judgement.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                Begin your journey →
              </button>
              <button className="btn-secondary" onClick={() => navigate('/login')}>
                I have an account
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-greeting">Welcome back, Sarah</div>
              <div className="hero-card-sub">You're on Week 1 — let's keep going</div>
              <div className="week-mini">
                {[
                  { num: 'Week 1', icon: '🌱' },
                  { num: 'Week 2', icon: '🛠' },
                  { num: 'Week 3', icon: '💛' },
                  { num: 'Week 4', icon: '🌿' },
                ].map(w => (
                  <div className="week-pill" key={w.num}>
                    <div className="week-pill-num">{w.num}</div>
                    <div className="week-pill-icon">{w.icon}</div>
                  </div>
                ))}
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" />
              </div>
              <div className="progress-label">
                <span>Your progress</span>
                <span>Week 1 of 4</span>
              </div>
            </div>
            <div className="floating-card">
              <div className="floating-dot">💬</div>
              <div>
                <div className="floating-text">AI Coach ready</div>
                <div className="floating-subtext">Private & judgement-free</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="landing-features">
          <div className="features-label">What's inside</div>
          <h2 className="features-title">Everything you need, nothing you don't</h2>
          <div className="features-grid">
            {[
              {
                icon: '📖',
                iconClass: 'feature-icon-sage',
                title: 'Weekly Sessions',
                desc: 'Thoughtfully designed content that unfolds over four weeks — each building on the last, at a pace that respects your time.',
              },
              {
                icon: '💬',
                iconClass: 'feature-icon-warm',
                title: 'AI Coaching',
                desc: 'A private, always-available space to talk through challenges, process emotions, and get compassionate support when you need it.',
              },
              {
                icon: '📝',
                iconClass: 'feature-icon-accent',
                title: 'Guided Journal',
                desc: 'Reflect with purpose using weekly prompts crafted to deepen your self-awareness and track your wellbeing journey.',
              },
              {
                icon: '🎯',
                iconClass: 'feature-icon-sage',
                title: 'Action Tracker',
                desc: 'Turn insights into practice with manageable actions designed to fit into real life — not add to your to-do list.',
              },
              {
                icon: '📚',
                iconClass: 'feature-icon-warm',
                title: 'Resource Library',
                desc: 'Articles, exercises, and tools curated by wellbeing professionals — available whenever you need them.',
              },
              {
                icon: '🔒',
                iconClass: 'feature-icon-accent',
                title: 'Completely Private',
                desc: 'GDPR compliant from the ground up. Your data stays yours — export it anytime, delete it whenever you choose.',
              },
            ].map(f => (
              <div className="feature-card" key={f.title}>
                <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="landing-principles">
          <div className="principles-inner">
            <h2 className="principles-title">Built on three promises</h2>
            <p className="principles-subtitle">
              This programme was designed around the belief that parents 
              deserve support that meets them where they are.
            </p>
            <div className="principles-row">
              {[
                { word: 'Your Space', meaning: 'A place that belongs entirely to you' },
                { word: 'Your Pace', meaning: 'No deadlines, no pressure, no rush' },
                { word: 'Your Choice', meaning: 'Take what helps, leave what doesn\'t' },
              ].map(p => (
                <div className="principle" key={p.word}>
                  <div className="principle-dot" />
                  <div className="principle-word">{p.word}</div>
                  <div className="principle-meaning">{p.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-cta">
          <h2 className="cta-title">Ready to begin?</h2>
          <p className="cta-desc">
            It takes less than two minutes to get started. No credit card, 
            no commitment — just a quiet space for you.
          </p>
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Start your journey →
          </button>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="footer-text">
            Breathing Space © {new Date().getFullYear()} — Built with care for parents
          </div>
          <div className="footer-links">
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Use</button>
            <button className="footer-link">Contact</button>
          </div>
        </footer>
      </div>
    </>
  );
}

