import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Icons.Chat, title: 'AI Coach', desc: 'Private, judgement-free guidance powered by AI — available whenever you need it', color: T.accent },
    { icon: Icons.Book, title: 'Reflective Journal', desc: 'Process your experiences through guided journaling with mood tracking', color: T.lavender },
    { icon: Icons.Wind, title: 'Micro-Interventions', desc: 'Evidence-based breathing and grounding exercises you can do in minutes', color: T.sky },
    { icon: Icons.Target, title: 'Goal Tracking', desc: 'Set meaningful wellness goals and watch your progress build week by week', color: T.warm },
  ];

  const weeks = [
    { num: 1, title: 'Foundation', color: T.accent },
    { num: 2, title: 'Breath Work', color: T.sky },
    { num: 3, title: 'Inner Calm', color: T.lavender },
    { num: 4, title: 'Resilience', color: T.warm },
    { num: 5, title: 'Connection', color: T.coral },
    { num: 6, title: 'Flourishing', color: T.sage },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.cream }}>

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
          }}>
            <Icons.Wind size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.dark }}>
            Breathing Space
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '10px 20px', background: 'none', border: 'none',
            color: T.text, fontSize: 14, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Log in
          </button>
          <button onClick={() => navigate('/signup')} style={{
            padding: '10px 24px', background: T.dark, color: T.cream,
            borderRadius: T.radiusFull, fontSize: 14, fontWeight: 500,
            border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
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
            background: `${T.accent}15`, padding: '6px 16px', borderRadius: T.radiusFull, marginBottom: 24,
          }}>
            <Icons.Leaf size={14} color={T.accent} />
            <span style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              6-Week Guided Programme
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 48, fontWeight: 600, color: T.dark, lineHeight: 1.15, marginBottom: 20,
          }}>
            A gentler way to navigate{' '}
            <span style={{ color: T.accent, fontStyle: 'italic' }}>parenthood</span>
          </h1>

          <p style={{ fontSize: 17, color: T.textSec, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Breathing Space gives you the tools, reflections, and support to build resilience — at your own pace, in your own time, without pressure or judgement.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', background: T.dark, color: T.cream,
              borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'transform 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              Begin your journey <Icons.ArrowRight size={18} color={T.cream} />
            </button>
            <button onClick={() => navigate('/login')} style={{
              padding: '16px 32px', background: 'none',
              border: `1.5px solid ${T.creamDark}`, color: T.text,
              borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.creamDark)}>
              I have an account
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div style={{ flex: '1 1 380px', maxWidth: 420 }}>
          <div style={{
            background: T.white, borderRadius: T.radiusXl, boxShadow: T.shadowLg,
            padding: 28, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: `${T.accent}08`, top: -40, right: -40 }} />

            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 4 }}>
              Welcome back, Sarah
            </p>
            <p style={{ fontSize: 13, color: T.textSec, marginBottom: 20 }}>
              You're on Week 1 — let's keep going
            </p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {weeks.slice(0, 4).map((w) => (
                <div key={w.num} style={{
                  flex: 1, padding: '12px 8px', background: `${w.color}12`,
                  borderRadius: T.radiusSm, textAlign: 'center',
                }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, letterSpacing: '0.05em', marginBottom: 6 }}>
                    WEEK {w.num}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {w.num === 1 && <Icons.Leaf size={18} color={w.color} />}
                    {w.num === 2 && <Icons.Wind size={18} color={w.color} />}
                    {w.num === 3 && <Icons.Heart size={18} color={w.color} />}
                    {w.num === 4 && <Icons.Star size={18} color={w.color} />}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.textSec }}>Your progress</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.accent }}>Week 1 of 6</span>
              </div>
              <div style={{ height: 6, background: `${T.accent}15`, borderRadius: 6 }}>
                <div style={{ width: '16%', height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.accentLight})`, borderRadius: 6 }} />
              </div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', background: `${T.accent}08`, borderRadius: T.radiusSm,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icons.Sparkle size={16} color="white" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: T.text }}>AI Coach ready</p>
                <p style={{ fontSize: 12, color: T.textSec }}>Private & judgement-free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: T.white, padding: '80px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
            WHAT'S INSIDE
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36, fontWeight: 600, color: T.text, textAlign: 'center', marginBottom: 48,
          }}>
            Everything you need, nothing you don't
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  background: T.cream, borderRadius: T.radius, padding: 24,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: `${f.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <Icon size={24} color={f.color} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 8 }}>{f.title}</p>
                  <p style={{ fontSize: 14, color: T.textSec, lineHeight: 1.6 }}>{f.desc}</p>
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
          fontSize: 36, fontWeight: 600, color: T.text, textAlign: 'center', marginBottom: 48,
        }}>
          6 weeks to a calmer you
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {weeks.map((w) => (
            <div key={w.num} style={{
              background: T.white, borderRadius: T.radius, padding: 20,
              textAlign: 'center', boxShadow: T.shadow,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `${w.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: w.color }}>
                  {w.num}
                </span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                Week {w.num}
              </p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 500, color: T.text }}>
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: T.dark, padding: '60px 28px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', top: -100, left: -60 }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', bottom: -60, right: -40 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32, fontWeight: 600, color: T.cream, marginBottom: 12,
          }}>
            Ready to begin?
          </h2>
          <p style={{ color: 'rgba(248,245,240,0.6)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Your wellbeing matters. Take the first step towards building resilience, one breath at a time.
          </p>
          <button onClick={() => navigate('/signup')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 36px', background: `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
            color: 'white', borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
            border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 8px 24px rgba(124,144,130,0.3)',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            Start your journey <Icons.ArrowRight size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '24px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: T.textMuted }}>
          Breathing Space — Built with care for those who care for others
        </p>
      </div>
    </div>
  );
}

