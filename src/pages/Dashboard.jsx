import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { T, PHOTOS } from '../lib/theme';
import { Icons } from '../components/Icons';
import { BottomNav } from '../components/BottomNav';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const weeks = [
    { num: 1, title: "Foundation", subtitle: "Building awareness", color: T.accent, status: "completed" },
    { num: 2, title: "Breath Work", subtitle: "Tactical breathing", color: T.teal, status: "completed" },
    { num: 3, title: "Inner Calm", subtitle: "Stress management", color: T.lavender, status: "current" },
    { num: 4, title: "Resilience", subtitle: "Bounce-back skills", color: T.amber, status: "locked" },
    { num: 5, title: "Connection", subtitle: "Strengthening bonds", color: T.coral, status: "locked" },
    { num: 6, title: "Flourishing", subtitle: "Thriving beyond", color: T.sage, status: "locked" },
  ];

  const features = [
    { title: "AI Coach", desc: "Personal guidance", icon: Icons.Chat, color: T.accent, glow: T.accentGlow, path: "/coach", image: PHOTOS.meditation },
    { title: "Actions", desc: "Track progress", icon: Icons.Target, color: T.teal, glow: T.skyGlow, path: "/actions", image: PHOTOS.stretch },
    { title: "Journal", desc: "Reflect & grow", icon: Icons.Book, color: T.lavender, glow: T.lavenderGlow, path: "/journal", image: PHOTOS.journal },
    { title: "Library", desc: "Exercises", icon: Icons.Leaf, color: T.amber, glow: T.amberGlow, path: "/library", image: PHOTOS.breathing },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.bg }}>
      {/* Header with background image */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 0 24px 24px' }}>
        <img src={PHOTOS.morning} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,26,31,0.75) 0%, rgba(15,26,31,0.95) 100%)' }} />

        <div style={{ position: 'relative', padding: '52px 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <p style={{ color: T.creamMuted, fontSize: 13, marginBottom: 4 }}>{greeting}</p>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 600, color: T.cream }}>
                Welcome, {firstName}
              </h1>
            </div>
            <div onClick={() => navigate('/settings')} style={{
              width: 44, height: 44, borderRadius: 14, background: T.creamGhost,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${T.border}`,
            }}>
              <Icons.User size={20} color={T.accentLight} />
            </div>
          </div>

          {/* Progress */}
          <div style={{ background: T.creamGhost, borderRadius: T.radiusSm, padding: '14px 16px', border: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: T.creamMuted, fontSize: 12, fontWeight: 500 }}>Week 3 of 6</span>
              <span style={{ color: T.accentLight, fontSize: 12, fontWeight: 600 }}>33%</span>
            </div>
            <div style={{ height: 4, background: T.creamGhost, borderRadius: 4 }}>
              <div style={{ width: '33%', height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.accentLight})`, borderRadius: 4, transition: 'width 1s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        {/* Quick Actions - photo cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <button key={i} onClick={() => navigate(f.path)} style={{
                background: T.bgCard, borderRadius: T.radius, overflow: 'hidden',
                border: `1px solid ${T.border}`, textAlign: 'left', cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: "'DM Sans', sans-serif",
                padding: 0,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = T.shadowLg; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'relative', height: 80, overflow: 'hidden' }}>
                  <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 0%, ${T.bgCard} 100%)` }} />
                </div>
                <div style={{ padding: '4px 14px 16px' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: f.glow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: -18, marginBottom: 10, border: `1px solid ${T.border}`,
                  }}>
                    <Icon size={18} color={f.color} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: T.cream }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: T.creamMuted }}>{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Programme */}
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.cream, marginBottom: 16 }}>
          Your Programme
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {weeks.map((w) => (
            <button key={w.num}
              onClick={() => w.status !== 'locked' && navigate(`/week/${w.num}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                background: T.bgCard, borderRadius: T.radiusSm,
                opacity: w.status === 'locked' ? 0.45 : 1,
                border: w.status === 'current' ? `2px solid ${T.accent}` : `1px solid ${T.border}`,
                cursor: w.status === 'locked' ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s', textAlign: 'left', width: '100%',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => w.status !== 'locked' && (e.currentTarget.style.transform = 'translateX(4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${w.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                {w.status === 'completed' ? (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.Check size={20} color="white" />
                  </div>
                ) : w.status === 'locked' ? (
                  <Icons.Lock size={18} color={T.creamMuted} />
                ) : (
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: w.color }}>{w.num}</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: w.status === 'current' ? T.accent : T.creamMuted }}>Week {w.num}</p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 500, color: T.cream }}>{w.title}</p>
                <p style={{ fontSize: 12, color: T.creamMuted }}>{w.subtitle}</p>
              </div>
              <Icons.ArrowRight size={16} color={T.creamMuted} />
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="dashboard" />
    </div>
  );
}
