import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const WEEK_INFO = {
  1: { title: 'Understanding What You Need', icon: '🌱', subtitle: 'Discovering what drains and energises you' },
  2: { title: 'Tools for Tough Moments', icon: '🛠', subtitle: 'Building your emotional first aid kit' },
  3: { title: 'Creating Connection', icon: '💛', subtitle: 'Building bonds where everyone can flourish' },
  4: { title: 'Growing Through It All', icon: '🌿', subtitle: 'Building resilience for the long haul' },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [weekProgress, setWeekProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profileData);

        // Fetch week progress
        const { data: progressData } = await supabase
          .from('week_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('week_number');

        setWeekProgress(progressData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getWeekStatus = (weekNum) => {
    const wp = weekProgress.find(w => w.week_number === weekNum);
    return wp?.status || 'locked';
  };

  const currentWeek = profile?.current_week || 1;
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'there';

  const completedWeeks = weekProgress.filter(w => w.status === 'completed').length;
  const progressPercent = (completedWeeks / 4) * 100;

  if (loading) {
    return (
      <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        .dashboard-root {
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
          --color-green: #7C9082;
          --color-green-light: #E8EFEA;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'Source Sans 3', system-ui, sans-serif;

          min-height: 100vh;
          background-color: var(--color-cream);
          font-family: var(--font-body);
          color: var(--color-text);
        }

        .dashboard-root::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .dashboard-root > * { position: relative; z-index: 1; }

        .dashboard-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .dashboard-logo {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--color-sage);
        }

        .dashboard-nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-btn {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: 0.85rem;
          cursor: pointer;
          border-radius: 100px;
          transition: all 0.2s;
        }

        .nav-btn:hover {
          background: var(--color-sage-lighter);
          color: var(--color-sage);
        }

        .dashboard-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
        }

        .welcome-section {
          padding: 2rem 0 2.5rem;
          animation: fadeInUp 0.5s ease both;
        }

        .welcome-greeting {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-soft);
          font-weight: 300;
        }

        .progress-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          animation: fadeInUp 0.5s ease 0.1s both;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .progress-title {
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--color-text);
        }

        .progress-count {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .progress-bar {
          height: 8px;
          background: var(--color-warm);
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-sage), var(--color-sage-light));
          border-radius: 100px;
          transition: width 0.5s ease;
        }

        .weeks-section {
          animation: fadeInUp 0.5s ease 0.2s both;
        }

        .section-title {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-sage);
          margin-bottom: 1rem;
        }

        .weeks-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .week-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.25s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
        }

        .week-card:hover:not(.locked) {
          border-color: var(--color-sage-light);
          transform: translateX(4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .week-card.current {
          border-color: var(--color-sage);
          background: linear-gradient(135deg, white, var(--color-sage-lighter));
        }

        .week-card.completed {
          background: var(--color-green-light);
          border-color: #C5DEC9;
        }

        .week-card.locked {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .week-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--color-sage-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .week-card.current .week-icon {
          background: var(--color-sage);
        }

        .week-card.current .week-icon span {
          filter: grayscale(1) brightness(10);
        }

        .week-card.completed .week-icon {
          background: var(--color-sage);
        }

        .week-content {
          flex: 1;
          min-width: 0;
        }

        .week-number {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          margin-bottom: 0.15rem;
        }

        .week-card.current .week-number {
          color: var(--color-sage);
        }

        .week-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--color-text);
          margin-bottom: 0.2rem;
        }

        .week-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 300;
        }

        .week-status {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-current {
          background: var(--color-sage);
          color: white;
        }

        .status-completed {
          background: #C5DEC9;
          color: var(--color-sage);
        }

        .status-locked {
          background: var(--color-warm);
          color: var(--color-text-muted);
        }

        .week-arrow {
          color: var(--color-text-muted);
          font-size: 1.2rem;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-top: 2rem;
          animation: fadeInUp 0.5s ease 0.3s both;
        }

        .quick-action {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.25s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
        }

        .quick-action:hover {
          border-color: var(--color-sage-lighter);
          transform: translateY(-2px);
        }

        .quick-action-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .quick-action-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .dashboard-container { padding: 0 1.25rem 2rem; }
          .welcome-greeting { font-size: 1.65rem; }
          .quick-actions { grid-template-columns: 1fr; }
          .week-card { padding: 1rem; gap: 1rem; }
          .week-icon { width: 44px; height: 44px; font-size: 1.25rem; }
        }
      `}</style>

      <div className="dashboard-root">
        <nav className="dashboard-nav">
          <div className="dashboard-logo">Breathing Space</div>
          <div className="dashboard-nav-links">
            <button className="nav-btn" onClick={() => navigate('/journal')}>Journal</button>
            <button className="nav-btn" onClick={() => navigate('/coach')}>Coach</button>
            <button className="nav-btn" onClick={() => navigate('/settings')}>Settings</button>
            <button className="nav-btn" onClick={signOut}>Log out</button>
          </div>
        </nav>

        <div className="dashboard-container">
          <div className="welcome-section">
            <h1 className="welcome-greeting">Welcome back, {displayName}</h1>
            <p className="welcome-subtitle">
              {completedWeeks === 0
                ? "Ready to begin your journey? Let's start with Week 1."
                : completedWeeks === 4
                ? "You've completed the programme. Amazing work! 🎉"
                : `You're on Week ${currentWeek}. Keep going — you're doing great.`}
            </p>
          </div>

          <div className="progress-card">
            <div className="progress-header">
              <span className="progress-title">Programme Progress</span>
              <span className="progress-count">{completedWeeks} of 4 weeks</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="weeks-section">
            <div className="section-title">Your Journey</div>
            <div className="weeks-grid">
              {[1, 2, 3, 4].map((num) => {
                const info = WEEK_INFO[num];
                const status = getWeekStatus(num);
                const isCurrent = status === 'unlocked' || status === 'in_progress';
                const isCompleted = status === 'completed';
                const isLocked = status === 'locked';

                return (
                  <div
                    key={num}
                    className={`week-card ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => !isLocked && navigate(`/week/${num}`)}
                  >
                    <div className="week-icon">
                      <span>{info.icon}</span>
                    </div>
                    <div className="week-content">
                      <div className="week-number">Week {num}</div>
                      <div className="week-title">{info.title}</div>
                      <div className="week-subtitle">{info.subtitle}</div>
                    </div>
                    <div className="week-status">
                      {isCurrent && <span className="status-badge status-current">Continue</span>}
                      {isCompleted && <span className="status-badge status-completed">✓ Done</span>}
                      {isLocked && <span className="status-badge status-locked">🔒 Locked</span>}
                      {!isLocked && <span className="week-arrow">→</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="quick-actions">
            <div className="quick-action" onClick={() => navigate('/journal')}>
              <div className="quick-action-icon">📝</div>
              <div className="quick-action-label">Journal</div>
            </div>
            <div className="quick-action" onClick={() => navigate('/coach')}>
              <div className="quick-action-icon">💬</div>
              <div className="quick-action-label">AI Coach</div>
            </div>
            <div className="quick-action" onClick={() => navigate('/library')}>
              <div className="quick-action-icon">📚</div>
              <div className="quick-action-label">Library</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
