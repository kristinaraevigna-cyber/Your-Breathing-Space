import { useNavigate } from 'react-router-dom';
import { T, PHOTOS } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Icons.Chat, title: 'AI Coach', desc: 'Private, judgement-free guidance — available whenever you need it', color: T.accent, glow: T.accentGlow, image: PHOTOS.meditation },
    { icon: Icons.Book, title: 'Reflective Journal', desc: 'Process experiences through guided journaling with mood tracking', color: T.lavender, glow: T.lavenderGlow, image: PHOTOS.journal },
    { icon: Icons.Wind, title: 'Micro-Interventions', desc: 'Evidence-based breathing and grounding exercises in minutes', color: T.sky, glow: T.skyGlow, image: PHOTOS.breathing },
    { icon: Icons.Target, title: 'Goal Tracking', desc: 'Set meaningful wellness goals and build progress week by week', color: T.amber, glow: T.amberGlow, image: PHOTOS.stretch },
  ];

  const weeks = [
    { num: 1, title: 'Foundation', color: T.accent },
    { num: 2, title: 'Breath Work', color: T.teal },
    { num: 3, title: 'Inner Calm', color: T.lavender },
    { num: 4, title: 'Resilience', color: T.amber },
    { num: 5, title: 'Connection', color: T.coral },
    { num: 6, title: 'Flourishing', color: T.sage },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>

      {/* Nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 28px', maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${T.accentGlow}`,
          }}>
            <Icons.Wind size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.cream }}>
            Breathing Space
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '10px 20px', background: 'none', border: 'none',
            color: T.creamSoft, fontSize: 14, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Log in
          </button>
          <button onClick={() => navigate('/signup')} style={{
            padding: '10px 24px', background: T.accent, color: 'white',
            borderRadius: T.radiusFull, fontSize: 14, fontWeight: 500,
            border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 4px 16px ${T.accentGlow}`,
          }}>
            Get Started
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '60px 28px 80px',
        display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap',
      }}>
        <div style={{ flex: '1 1 480px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.creamGhost, padding: '8px 18px', borderRadius: T.radiusFull, marginBottom: 24,
            border: `1px solid ${T.border}`,
          }}>
            <Icons.Leaf size={14} color={T.accent} />
            <span style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              6-Week Guided Programme
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 52, fontWeight: 600, color: T.cream, lineHeight: 1.12, marginBottom: 20,
          }}>
            A gentler way to navigate{' '}
            <span style={{ color: T.accentLight, fontStyle: 'italic' }}>parenthood</span>
          </h1>

          <p style={{ fontSize: 17, color: T.creamSoft, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Breathing Space gives you the tools, reflections, and support to build resilience — at your own pace, in your own time, without pressure or judgement.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
              color: 'white', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px ${T.accentGlow}`, transition: 'transform 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              Begin your journey <Icons.ArrowRight size={18} color="white" />
            </button>
            <button onClick={() => navigate('/login')} style={{
              padding: '16px 32px', background: 'none',
              border: `1.5px solid ${T.borderLight}`, color: T.creamSoft,
              borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.borderLight; e.currentTarget.style.color = T.creamSoft; }}>
              I have an account
            </button>
          </div>
        </div>

        {/* Hero Image Card */}
        <div style={{ flex: '1 1 380px', maxWidth: 440 }}>
          <div style={{
            borderRadius: T.radiusXl, overflow: 'hidden',
            boxShadow: T.shadowLg, position: 'relative',
          }}>
            <img src={PHOTOS.parent} alt="Parent and child" style={{
              width: '100%', height: 320, objectFit: 'cover', display: 'block',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 30%, rgba(15,26,31,0.9) 100%)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)', borderRadius: T.radius, padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icons.Sparkle size={14} color="white" />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>AI Coach ready</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Private & judgement-free</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {weeks.slice(0, 4).map((w) => (
                    <div key={w.num} style={{
                      flex: 1, padding: '8px 4px', background: 'rgba(255,255,255,0.08)',
                      borderRadius: 8, textAlign: 'center',
                    }}>
                      <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>WK {w.num}</p>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: w.color, margin: '6px auto 0' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 28px', background: T.bgCard }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
            WHAT'S INSIDE
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36, fontWeight: 600, color: T.cream, textAlign: 'center', marginBottom: 48,
          }}>
            Everything you need, nothing you don't
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  background: T.bgElevated, borderRadius: T.radiusXl, overflow: 'hidden',
                  border: `1px solid ${T.border}`, transition: 'transform 0.3s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                    <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 20%, ${T.bgElevated} 100%)` }} />
                  </div>
                  <div style={{ padding: '0 20px 22px' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: f.glow,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: -22, marginBottom: 14, position: 'relative',
                      border: `1px solid ${T.border}`,
                    }}>
                      <Icon size={22} color={f.color} />
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 600, color: T.cream, marginBottom: 6 }}>{f.title}</p>
                    <p style={{ fontSize: 13, color: T.creamMuted, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programme Timeline */}
      <div style={{ padding: '80px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
          YOUR JOURNEY
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 36, fontWeight: 600, color: T.cream, textAlign: 'center', marginBottom: 48,
        }}>
          6 weeks to a calmer you
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {weeks.map((w) => (
            <div key={w.num} style={{
              background: T.bgCard, borderRadius: T.radius, padding: 20,
              textAlign: 'center', border: `1px solid ${T.border}`,
              transition: 'all 0.25s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = w.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `${w.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: w.color }}>
                  {w.num}
                </span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: T.creamMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                Week {w.num}
              </p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 500, color: T.cream }}>
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA with background image */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 28px', textAlign: 'center',
      }}>
        <img src={PHOTOS.sunset} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,26,31,0.85)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36, fontWeight: 600, color: T.cream, marginBottom: 14,
          }}>
            Ready to begin?
          </h2>
          <p style={{ color: T.creamSoft, fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
            Your wellbeing matters. Take the first step towards building resilience, one breath at a time.
          </p>
          <button onClick={() => navigate('/signup')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 40px', background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            color: 'white', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
            border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 8px 32px ${T.accentGlow}`, transition: 'transform 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            Start your journey <Icons.ArrowRight size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '24px 28px', textAlign: 'center', background: T.bg }}>
        <p style={{ fontSize: 12, color: T.creamMuted }}>
          Breathing Space — Built with care for those who care for others
        </p>
      </div>
    </div>
  );
}
