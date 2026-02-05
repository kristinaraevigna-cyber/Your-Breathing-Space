import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';
import { BottomNav } from '../components/BottomNav';

export default function Actions() {
  const navigate = useNavigate();

  const [goals] = useState([
    { id: 1, title: 'Daily Breathing Practice', desc: 'Complete tactical breathing 5x this week', progress: 60, color: T.accent },
    { id: 2, title: 'Gratitude Journaling', desc: 'Write 3 things grateful for daily', progress: 40, color: T.lavender },
    { id: 3, title: 'Mindful Moments', desc: '2 min mindfulness before shift', progress: 80, color: T.sky },
    { id: 4, title: 'Physical Activity', desc: '30 min exercise 4x this week', progress: 25, color: T.coral },
  ]);

  const avgProgress = Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.cream }}>
      <div style={{ background: T.dark, padding: '48px 20px 24px', borderRadius: '0 0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <button onClick={() => navigate('/dashboard')} style={{ color: T.cream, cursor: 'pointer', background: 'none', border: 'none' }}>
            <Icons.ArrowLeft size={20} />
          </button>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: T.cream }}>Your Actions</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: T.radiusSm, padding: 14 }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: T.accentLight }}>{goals.length}</p>
            <p style={{ fontSize: 11, color: 'rgba(248,245,240,0.5)' }}>Active goals</p>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: T.radiusSm, padding: 14 }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: T.accentLight }}>{avgProgress}%</p>
            <p style={{ fontSize: 11, color: 'rgba(248,245,240,0.5)' }}>Avg progress</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {goals.map((g) => (
            <div key={g.id} style={{ background: T.white, borderRadius: T.radius, boxShadow: T.shadow, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>{g.title}</p>
                  <p style={{ fontSize: 13, color: T.textSec }}>{g.desc}</p>
                </div>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: g.color }}>{g.progress}%</span>
              </div>
              <div style={{ height: 6, background: `${g.color}18`, borderRadius: 6 }}>
                <div style={{ width: `${g.progress}%`, height: '100%', background: g.color, borderRadius: 6, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginTop: 20, padding: 16, borderRadius: T.radiusFull, fontSize: 15, fontWeight: 500,
          background: T.dark, color: T.cream, border: '1.5px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          Add New Goal <Icons.ArrowRight size={16} color={T.cream} />
        </button>
      </div>

      <BottomNav active="actions" />
    </div>
  );
}
