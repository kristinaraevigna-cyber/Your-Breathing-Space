import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { T } from '../lib/theme';
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
    { num: 2, title: "Breath Work", subtitle: "Tactical breathing", color: T.sky, status: "completed" },
    { num: 3, title: "Inner Calm", subtitle: "Stress management", color: T.lavender, status: "current" },
    { num: 4, title: "Resilience", subtitle: "Bounce-back skills", color: T.warm, status: "locked" },
    { num: 5, title: "Connection", subtitle: "Strengthening bonds", color: T.coral, status: "locked" },
    { num: 6, title: "Flourishing", subtitle: "Thriving beyond", color: T.sage, status: "locked" },
  ];

  const features = [
    { title: "AI Coach", desc: "Personal guidance", icon: Icons.Chat, color: T.accent, path: "/coach" },
    { title: "Actions", desc: "Track progress", icon: Icons.Target, color: T.sky, path: "/actions" },
    { title: "Journal", desc: "Reflect & grow", icon: Icons.Book, color: T.lavender, path: "/journal" },
    { title: "Library", desc: "Exercises", icon: Icons.Leaf, color: T.warm, path: "/library" },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.cream }}>
      <div style={{
        background: T.dark, padding: '48px 24px 24px', borderRadius: '0 0 24px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', top: -40, right: -30 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ color: 'rgba(248,245,240,0.5)', fontSize: 13, marginBottom: 4 }}>{greeting}</p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 600, color: T.cream }}>
              Welcome, {firstName}
            </h1>
          </div>
          <div onClick={() => navigate('/settings')} style={{
            width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icons.User size={20} color={T.accentLight} />
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: T.radiusSm, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'rgba(248,245,240,0.6)', fontSize: 12, fontWeight: 500 }}>Week 3 of 6</span>
            <span style={{ color: T.accentLight, fontSize: 12, fontWeight: 600 }}>33%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
            <div style={{ width: '33%', height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.accentLight})`, borderRadius: 4, transition: 'width 1s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <button key={i} onClick={() => navigate(f.path)} style={{
                background: T.white, borderRadius: T.radius, boxShadow: T.shadow, padding: 16,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                border: 'none', textAlign: 'left', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                fontFamily: "'DM Sans', sans-serif",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = T.shadowLg; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = T.shadow; }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={f.color} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: T.textSec }}>{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 16 }}>
            Your Programme
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {weeks.map((w) => (
              <button key={w.num}
                onClick={() => w.status !== 'locked' && navigate(`/week/${w.num}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  background: T.white, borderRadius: T.radiusSm, boxShadow: T.shadow,
                  opacity: w.status === 'locked' ? 0.55 : 1,
                  border: w.status === 'current' ? `2px solid ${T.accent}` : '2px solid transparent',
                  cursor: w.status === 'locked' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s', textAlign: 'left', width: '100%',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => w.status !== 'locked' && (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${w.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                  {w.status === 'completed' ? (
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: `${T.accent}dd`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icons.Check size={20} color="white" />
                    </div>
                  ) : w.status === 'locked' ? (
                    <Icons.Lock size={18} color={T.textMuted} />
                  ) : (
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, color: w.color }}>{w.num}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: w.status === 'current' ? T.accent : T.textMuted }}>Week {w.num}</p>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 500, color: T.text }}>{w.title}</p>
                  <p style={{ fontSize: 12, color: T.textSec }}>{w.subtitle}</p>
                </div>
                <Icons.ArrowRight size={16} color={T.textMuted} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="dashboard" />
    </div>
  );
}
