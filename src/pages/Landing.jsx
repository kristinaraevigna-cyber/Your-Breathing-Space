import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Icons.Chat, title: 'AI Coach', desc: 'Private, judgement-free guidance available whenever you need it', color: T.sage, bg: T.bgCardSage },
    { icon: Icons.Book, title: 'Reflective Journal', desc: 'Process experiences through guided journaling with mood tracking', color: T.rose, bg: T.bgCardPink },
    { icon: Icons.Wind, title: 'Micro-Interventions', desc: 'Evidence-based breathing and grounding exercises in minutes', color: T.sage, bg: T.bgCardSageMuted },
    { icon: Icons.Target, title: 'Goal Tracking', desc: 'Set meaningful wellness goals and build progress week by week', color: T.rose, bg: T.bgCardPink },
  ];

  const weeks = [
    { num: 1, title: 'Foundation', color: T.sage },
    { num: 2, title: 'Breath Work', color: T.olive },
    { num: 3, title: 'Inner Calm', color: T.rose },
    { num: 4, title: 'Resilience', color: T.blushDark },
    { num: 5, title: 'Connection', color: T.sage },
    { num: 6, title: 'Flourishing', color: T.olive },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: T.sage, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Leaf size={18} color={T.cream} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.dark }}>Breathing Space</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', background: 'none', border: 'none', color: T.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Log in</button>
          <button onClick={() => navigate('/signup')} style={{ padding: '10px 24px', background: T.dark, color: T.cream, borderRadius: T.radiusFull, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Get Started</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '50px 28px 70px', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 480px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${T.sage}18`, padding: '8px 18px', borderRadius: T.radiusFull, marginBottom: 24 }}>
            <Icons.Leaf size={14} color={T.sage} />
            <span style={{ fontSize: 12, fontWeight: 600, color: T.sage, letterSpacing: '0.06em', textTransform: 'uppercase' }}>6-Week Guided Programme</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 50, fontWeight: 600, color: T.dark, lineHeight: 1.12, marginBottom: 20 }}>
            Welcome,{' '}
            <span style={{ color: T.sage, fontStyle: 'italic' }}>start your journey</span>
          </h1>

          <p style={{ fontSize: 17, color: T.textSec, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Breathing Space gives you the tools, reflections, and support to build resilience — at your own pace, in your own time, without pressure or judgement.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '16px 32px',
              background: T.dark, color: T.cream, borderRadius: T.radiusFull, fontSize: 16,
              fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'transform 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              Begin your journey <Icons.ArrowRight size={18} color={T.cream} />
            </button>
            <button onClick={() => navigate('/login')} style={{
              padding: '16px 32px', background: 'none', border: `1.5px solid ${T.borderDark}`,
              color: T.text, borderRadius: T.radiusFull, fontSize: 16, fontWeight: 500,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
              I have an account
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div style={{ flex: '1 1 360px', maxWidth: 400 }}>
          <div style={{ background: T.bgCardPink, borderRadius: T.radiusXl, padding: 28, position: 'relative', overflow: 'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: `1.5px solid ${T.blushDark}30`, top: -40, right: -40 }} />
            <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: `1.5px solid ${T.blushDark}20`, bottom: -30, left: -30 }} />

            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 600, color: T.dark, marginBottom: 4, position: 'relative' }}>Hello, Sarah!</p>
            <p style={{ fontSize: 14, color: T.textSec, marginBottom: 20, position: 'relative' }}>What would you like to do?</p>

            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 28px', background: T.dark, color: T.cream, borderRadius: T.radiusFull, fontSize: 14, fontWeight: 500, border: 'none', marginBottom: 20, fontFamily: "'DM Sans', sans-serif", position: 'relative' }}>
              NEXT SESSION
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, position: 'relative' }}>
              {[{ label: 'CONCENTRATE', time: '04:15', bg: T.bgCardSage }, { label: 'RELAX', time: '03:20', bg: T.bgCardPink }, { label: 'HAPPINESS', time: '07:10', bg: T.bgCardSage }, { label: 'CREATIVITY', time: '05:00', bg: T.bgCardSageMuted }].map((s, i) => (
                <div key={i} style={{ background: s.bg, borderRadius: T.radiusSm, padding: '14px 12px', position: 'relative' }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: T.cream, letterSpacing: '0.1em', marginBottom: 16 }}>{s.label}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: T.dark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icons.Play size={10} color={T.cream} />
                    </div>
                    <span style={{ fontSize: 12, color: T.cream, fontWeight: 500 }}>{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '70px 28px', background: T.cream }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: T.sage, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>WHAT'S INSIDE</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 600, color: T.text, textAlign: 'center', marginBottom: 48 }}>Everything you need, nothing you don't</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{ background: f.bg, borderRadius: T.radiusXl, padding: 24, transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', border: `1px solid rgba(255,255,255,0.2)`, top: -20, right: -20 }} />
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={24} color={T.cream} />
                  </div>
                  <p style={{ fontSize: 17, fontWeight: 600, color: T.cream, marginBottom: 8 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,248,245,0.8)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programme Timeline */}
      <div style={{ padding: '70px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: T.sage, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>YOUR JOURNEY</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 600, color: T.text, textAlign: 'center', marginBottom: 48 }}>6 weeks to a calmer you</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {weeks.map((w) => (
            <div key={w.num} style={{ background: T.cream, borderRadius: T.radius, padding: 20, textAlign: 'center', boxShadow: T.shadow }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${w.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: w.color }}>{w.num}</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Week {w.num}</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 500, color: T.text }}>{w.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: T.dark, padding: '60px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: `1px solid ${T.sage}20`, top: -60, left: -40 }} />
        <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', border: `1px solid ${T.blush}15`, bottom: -40, right: -30 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 600, color: T.cream, marginBottom: 12 }}>Ready to begin?</h2>
          <p style={{ color: T.blush, fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>Your wellbeing matters. Take the first step towards building resilience, one breath at a time.</p>
          <button onClick={() => navigate('/signup')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px',
            background: T.bgCardPink, color: T.dark, borderRadius: T.radiusFull, fontSize: 16,
            fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            Start your journey <Icons.ArrowRight size={18} color={T.dark} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '24px 28px', textAlign: 'center', background: T.bg }}>
        <p style={{ fontSize: 12, color: T.textMuted }}>Breathing Space — Built with care for those who care for others</p>
      </div>
    </div>
  );
}

