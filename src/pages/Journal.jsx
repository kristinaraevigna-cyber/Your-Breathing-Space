import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from '../components/Icons';
import { BottomNav } from '../components/BottomNav';

export default function Journal() {
  const navigate = useNavigate();

  const [entries] = useState([
    { id: 1, date: 'Today', title: 'Feeling grounded', preview: 'After the breathing exercise this morning, I felt more centered going into my shift. The 4-7-8 technique really helped...', mood: 'Good' },
    { id: 2, date: 'Yesterday', title: 'Challenging shift', preview: 'Had a tough call but used the tactical breathing technique and managed to stay composed throughout...', mood: 'Okay' },
    { id: 3, date: 'Feb 3', title: 'Gratitude reflection', preview: "Three things I'm grateful for: my partner's support, the sunrise this morning, and a good conversation with a colleague...", mood: 'Great' },
    { id: 4, date: 'Feb 1', title: 'Weekly reset', preview: 'Took time to review my goals and reset intentions for the week ahead. Feeling motivated and clear...', mood: 'Great' },
  ]);

  const moodColors = { Great: T.accent, Good: T.sky, Okay: T.warm, Tough: T.coral };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: T.cream }}>
      <div style={{ background: T.dark, padding: '48px 20px 24px', borderRadius: '0 0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
          <button onClick={() => navigate('/dashboard')} style={{ color: T.cream, cursor: 'pointer', background: 'none', border: 'none' }}>
            <Icons.ArrowLeft size={20} />
          </button>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: T.cream }}>Journal</h1>
        </div>
        <p style={{ color: 'rgba(248,245,240,0.5)', fontSize: 13, marginLeft: 34 }}>Reflect, process, and grow</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {entries.map((entry) => (
            <div key={entry.id} style={{
              background: T.white, borderRadius: T.radius, boxShadow: T.shadow, padding: 18,
              cursor: 'pointer', transition: 'transform 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 500 }}>{entry.date}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: moodColors[entry.mood],
                  background: `${moodColors[entry.mood]}15`, padding: '4px 12px', borderRadius: T.radiusFull,
                }}>
                  {entry.mood}
                </span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 6 }}>{entry.title}</p>
              <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.5 }}>{entry.preview}</p>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginTop: 20, padding: 16, borderRadius: T.radiusFull, fontSize: 15, fontWeight: 500,
          background: T.dark, color: T.cream, border: '1.5px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          New Entry <Icons.ArrowRight size={16} color={T.cream} />
        </button>
      </div>

      <BottomNav active="journal" />
    </div>
  );
}
