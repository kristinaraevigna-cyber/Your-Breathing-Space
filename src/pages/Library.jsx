import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';
import { BottomNav } from '../components/BottomNav';

export default function Library() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Calming', 'Energising', 'Coping', 'Gratitude', 'Meaning'];

  const interventions = [
    { title: 'Tactical Breathing', category: 'Calming', duration: '4 min', desc: 'Box breathing to activate your parasympathetic response', color: T.accent, icon: Icons.Wind },
    { title: 'Gratitude Letter', category: 'Gratitude', duration: '10 min', desc: 'Write a heartfelt letter to someone who matters', color: T.lavender, icon: Icons.Heart },
    { title: 'Body Scan', category: 'Calming', duration: '8 min', desc: 'Progressive relaxation from head to toe', color: T.sky, icon: Icons.Sparkle },
    { title: 'Strengths Spotting', category: 'Energising', duration: '5 min', desc: 'Identify and lean into your signature strengths', color: T.warm, icon: Icons.Star },
    { title: 'Values Alignment', category: 'Meaning', duration: '12 min', desc: 'Reconnect with what matters most to you', color: T.coral, icon: Icons.Target },
    { title: 'Mindful Moment', category: 'Coping', duration: '3 min', desc: '5-4-3-2-1 grounding technique for right now', color: T.sage, icon: Icons.Leaf },
  ];

  const filtered = activeCategory === 'All' ? interventions : interventions.filter((i) => i.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.cream }}>
      <div style={{ background: T.dark, padding: '48px 20px 20px', borderRadius: '0 0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <button onClick={() => navigate('/dashboard')} style={{ color: T.cream, cursor: 'pointer', background: 'none', border: 'none' }}>
            <Icons.ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: T.cream }}>Micro-Interventions</h1>
            <p style={{ color: 'rgba(248,245,240,0.5)', fontSize: 13, marginTop: 2 }}>Evidence-based exercises</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '7px 16px', borderRadius: T.radiusFull, fontSize: 12, fontWeight: 500,
              background: activeCategory === cat ? T.accent : 'rgba(255,255,255,0.08)',
              color: activeCategory === cat ? 'white' : 'rgba(248,245,240,0.6)',
              whiteSpace: 'nowrap', transition: 'all 0.2s', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{
                background: T.white, borderRadius: T.radius, boxShadow: T.shadow, overflow: 'hidden',
                cursor: 'pointer', transition: 'transform 0.2s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div style={{ width: 80, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={28} color={item.color} />
                  </div>
                  <div style={{ flex: 1, padding: '16px 16px 16px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{item.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icons.Clock size={12} color={T.textMuted} />
                        <span style={{ fontSize: 11, color: T.textMuted }}>{item.duration}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.4, marginBottom: 10 }}>{item.desc}</p>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, color: item.color,
                      fontSize: 13, fontWeight: 600, background: 'none', border: 'none',
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0,
                    }}>
                      Begin exercise <Icons.ArrowRight size={14} color={item.color} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav active="library" />
    </div>
  );
}
