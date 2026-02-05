import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const WEEK_DATA = {
  1: {
    title: 'Understanding What You Need', icon: '🌱', subtitle: 'Discovering what drains and energises you',
    mainSession: { id: 'w1-main', title: 'Your Energy Audit', description: 'Explore what drains and restores your energy as a parent. Identify your personal patterns and begin building awareness of your needs.', duration: '20 mins' },
    activities: [
      { id: 'w1-act1', title: 'Energy Tracker', description: 'Track your energy levels throughout one day — notice what lifts you up and what pulls you down.', type: 'activity_option' },
      { id: 'w1-act2', title: 'Needs Inventory', description: 'Write a list of your core needs and rate how well each is being met.', type: 'activity_option' },
    ],
    extras: [
      { id: 'w1-ext1', title: 'Gratitude Pause', description: 'Spend 2 minutes noting 3 things you\'re grateful for today.', type: 'optional_extra' },
      { id: 'w1-ext2', title: 'Body Scan', description: 'A short body scan to check in with how you\'re physically feeling.', type: 'optional_extra' },
    ],
  },
  2: {
    title: 'Tools for Tough Moments', icon: '🛠', subtitle: 'Building your emotional first aid kit',
    mainSession: { id: 'w2-main', title: 'Your Emotional First Aid Kit', description: 'Learn practical tools for managing stress, anger, and overwhelm in the heat of the moment.', duration: '20 mins' },
    activities: [
      { id: 'w2-act1', title: 'Anger Ladder', description: 'Map your personal anger ladder — from mild irritation to boiling point — and identify early warning signs.', type: 'activity_option' },
      { id: 'w2-act2', title: 'Calm-Down Plan', description: 'Create a personalised plan for what to do when you feel overwhelmed.', type: 'activity_option' },
    ],
    extras: [
      { id: 'w2-ext1', title: 'Box Breathing', description: 'Practice the 4-4-4-4 breathing technique for instant calm.', type: 'optional_extra' },
      { id: 'w2-ext2', title: 'Grounding Exercise', description: 'Use the 5-4-3-2-1 senses technique to come back to the present.', type: 'optional_extra' },
    ],
  },
  3: {
    title: 'Creating Connection', icon: '💛', subtitle: 'Building bonds where everyone can flourish',
    mainSession: { id: 'w3-main', title: 'Rupture and Repair', description: 'Understand why connection breaks happen and how repairing them strengthens your relationship.', duration: '20 mins' },
    activities: [
      { id: 'w3-act1', title: 'Connection Moments', description: 'Plan 3 small, intentional moments of connection with your child this week.', type: 'activity_option' },
      { id: 'w3-act2', title: 'Active Listening Practice', description: 'Practice listening without fixing — just being present for 5 minutes.', type: 'activity_option' },
    ],
    extras: [
      { id: 'w3-ext1', title: 'Play Together', description: 'Let your child lead a 10-minute play session. Follow their world.', type: 'optional_extra' },
      { id: 'w3-ext2', title: 'Repair Script', description: 'Write a simple repair script you can use after a tough moment.', type: 'optional_extra' },
    ],
  },
  4: {
    title: 'Growing Through It All', icon: '🌿', subtitle: 'Building resilience for the long haul',
    mainSession: { id: 'w4-main', title: 'Your Resilience Plan', description: 'Bring everything together into a sustainable plan. Reflect on your growth and set intentions for the road ahead.', duration: '20 mins' },
    activities: [
      { id: 'w4-act1', title: 'Self-Compassion Letter', description: 'Write a letter of kindness to yourself as a parent.', type: 'activity_option' },
      { id: 'w4-act2', title: 'Support Map', description: 'Map out your support network and identify where you could strengthen it.', type: 'activity_option' },
    ],
    extras: [
      { id: 'w4-ext1', title: 'Future Self Reflection', description: 'Write about the parent you\'re becoming.', type: 'optional_extra' },
      { id: 'w4-ext2', title: 'Celebration Moment', description: 'Acknowledge 3 things you\'ve done well on this programme.', type: 'optional_extra' },
    ],
  },
};

export default function WeekView() {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const weekNum = parseInt(weekNumber);
  const week = WEEK_DATA[weekNum];
  
  const [progress, setProgress] = useState(null);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        // Fetch week progress
        const { data: progressData } = await supabase
          .from('week_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('week_number', weekNum)
          .single();

        setProgress(progressData);
        
        if (progressData?.extras_completed) {
          setCompletions(progressData.extras_completed);
        }

        // Fetch activity completions
        const { data: activityData } = await supabase
          .from('activity_completions')
          .select('activity_id')
          .eq('user_id', user.id)
          .eq('week_number', weekNum);

        if (activityData) {
          setCompletions(prev => [
            ...prev,
            ...activityData.map(a => a.activity_id)
          ]);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, weekNum]);

  const isCompleted = (id) => completions.includes(id);

  const handleComplete = async (activityId, activityType) => {
    if (!user) return;

    try {
      // Insert activity completion
      await supabase.from('activity_completions').upsert({
        user_id: user.id,
        week_number: weekNum,
        activity_id: activityId,
        activity_type: activityType,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,week_number,activity_id' });

      // Update local state
      setCompletions(prev => [...prev, activityId]);

      // If main session, update week progress
      if (activityType === 'main_session') {
        await supabase
          .from('week_progress')
          .update({ 
            main_session_completed: true,
            status: 'in_progress'
          })
          .eq('user_id', user.id)
          .eq('week_number', weekNum);

        setProgress(prev => ({ ...prev, main_session_completed: true, status: 'in_progress' }));
      }
    } catch (err) {
      console.error('Error completing activity:', err);
    }
  };

  const handleCompleteWeek = async () => {
    if (!user) return;

    try {
      // Mark current week as completed
      await supabase
        .from('week_progress')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('week_number', weekNum);

      // Unlock next week if not week 4
      if (weekNum < 4) {
        await supabase
          .from('week_progress')
          .update({ 
            status: 'unlocked',
            unlocked_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('week_number', weekNum + 1);

        // Update profile current week
        await supabase
          .from('profiles')
          .update({ current_week: weekNum + 1 })
          .eq('id', user.id);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Error completing week:', err);
    }
  };

  if (!week) {
    return (
      <>
        <style>{weekViewStyles}</style>
        <div className="week-root">
          <div className="week-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>Week not found.</p>
            <button className="btn-back-main" onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <style>{weekViewStyles}</style>
        <div className="week-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p>
        </div>
      </>
    );
  }

  const mainDone = progress?.main_session_completed || isCompleted(week.mainSession.id);

  return (
    <>
      <style>{weekViewStyles}</style>
      <div className="week-root">
        <div className="week-container">
          <button className="btn-back-main" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>

          {/* Week Header */}
          <div className="week-header">
            <span className="week-icon-large">{week.icon}</span>
            <h1 className="week-title">Week {weekNum}: {week.title}</h1>
            <p className="week-subtitle">{week.subtitle}</p>
          </div>

          {/* Main Session */}
          <div className="section">
            <div className="section-label">Main Session</div>
            <div className={`main-session-card ${mainDone ? 'completed' : ''}`}>
              <div className="main-session-content">
                <h3 className="main-session-title">{week.mainSession.title}</h3>
                <p className="main-session-desc">{week.mainSession.description}</p>
                <span className="main-session-duration">⏱ {week.mainSession.duration}</span>
              </div>
              {!mainDone ? (
                <button
                  className="btn-complete"
                  onClick={() => handleComplete(week.mainSession.id, 'main_session')}
                >
                  Mark complete
                </button>
              ) : (
                <div className="completed-badge">✓ Completed</div>
              )}
            </div>
          </div>

          {/* Activities */}
          <div className="section">
            <div className="section-label">Activities — choose what suits you</div>
            <div className="activity-list">
              {week.activities.map(act => (
                <ActivityItem
                  key={act.id}
                  item={act}
                  done={isCompleted(act.id)}
                  onComplete={() => handleComplete(act.id, act.type)}
                />
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="section">
            <div className="section-label muted">Optional extras</div>
            <div className="activity-list">
              {week.extras.map(ext => (
                <ActivityItem
                  key={ext.id}
                  item={ext}
                  done={isCompleted(ext.id)}
                  onComplete={() => handleComplete(ext.id, ext.type)}
                />
              ))}
            </div>
          </div>

          {/* Complete Week */}
          {mainDone && progress?.status !== 'completed' && (
            <div className="complete-week-section">
              <p className="complete-week-prompt">Ready to move on?</p>
              <button className="btn-primary" onClick={handleCompleteWeek}>
                Complete Week {weekNum} & Unlock Next →
              </button>
            </div>
          )}
          
          {progress?.status === 'completed' && (
            <div className="week-completed-badge">
              ✓ Week {weekNum} completed
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ActivityItem({ item, done, onComplete }) {
  return (
    <div className={`activity-item ${done ? 'completed' : ''}`}>
      <button
        className={`activity-checkbox ${done ? 'checked' : ''}`}
        onClick={() => !done && onComplete()}
        disabled={done}
      >
        {done && '✓'}
      </button>
      <div className="activity-content">
        <div className="activity-title">{item.title}</div>
        <div className="activity-desc">{item.description}</div>
      </div>
    </div>
  );
}

const weekViewStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600&display=swap');

  .week-root {
    --color-sage: #7C9082;
    --color-sage-light: #A3B9A8;
    --color-sage-lighter: #E8EFEA;
    --color-warm: #F5F0EB;
    --color-warm-dark: #EDE5DB;
    --color-cream: #FAFAF7;
    --color-text: #2D3436;
    --color-text-soft: #636E72;
    --color-text-muted: #9BA3A7;
    --color-green: #7C9082;
    --color-green-light: #E8EFEA;
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'Source Sans 3', system-ui, sans-serif;

    min-height: 100vh;
    background-color: var(--color-cream);
    font-family: var(--font-body);
    color: var(--color-text);
  }

  .week-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .week-root > * { position: relative; z-index: 1; }

  .week-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 1.5rem 2rem 3rem;
  }

  .btn-back-main {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0;
    border: none;
    background: none;
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s;
  }

  .btn-back-main:hover {
    color: var(--color-sage);
  }

  .week-header {
    padding: 1.5rem 0 2rem;
    animation: fadeIn 0.4s ease both;
  }

  .week-icon-large {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .week-title {
    font-family: var(--font-display);
    font-size: 1.85rem;
    margin-bottom: 0.35rem;
  }

  .week-subtitle {
    color: var(--color-text-muted);
    font-weight: 300;
  }

  .section {
    margin-bottom: 2rem;
    animation: fadeIn 0.4s ease both;
  }

  .section:nth-child(3) { animation-delay: 0.05s; }
  .section:nth-child(4) { animation-delay: 0.1s; }
  .section:nth-child(5) { animation-delay: 0.15s; }

  .section-label {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-sage);
    margin-bottom: 0.75rem;
  }

  .section-label.muted {
    color: var(--color-text-muted);
  }

  .main-session-card {
    padding: 1.5rem;
    background: white;
    border: 1.5px solid var(--color-sage-light);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .main-session-card.completed {
    background: var(--color-green-light);
    border-color: #C5DEC9;
    box-shadow: none;
  }

  .main-session-title {
    font-family: var(--font-display);
    font-size: 1.15rem;
    margin-bottom: 0.35rem;
  }

  .main-session-desc {
    font-size: 0.88rem;
    color: var(--color-text-soft);
    font-weight: 300;
    line-height: 1.6;
  }

  .main-session-duration {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    margin-top: 0.5rem;
    display: inline-block;
  }

  .btn-complete {
    margin-top: 1rem;
    padding: 0.6rem 1.25rem;
    background: var(--color-sage);
    color: white;
    border: none;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-complete:hover {
    background: var(--color-sage-light);
  }

  .completed-badge {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--color-green);
    font-weight: 500;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: white;
    border: 1.5px solid var(--color-warm-dark);
    border-radius: 12px;
    transition: all 0.2s;
  }

  .activity-item.completed {
    background: var(--color-green-light);
    border-color: #C5DEC9;
  }

  .activity-checkbox {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid var(--color-warm-dark);
    background: transparent;
    color: white;
    font-size: 0.7rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.1rem;
    transition: all 0.2s;
    font-family: var(--font-body);
  }

  .activity-checkbox:hover:not(.checked) {
    border-color: var(--color-sage-light);
  }

  .activity-checkbox.checked {
    background: var(--color-green);
    border-color: var(--color-green);
    cursor: default;
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-weight: 500;
    font-size: 0.92rem;
    color: var(--color-text);
  }

  .activity-desc {
    font-size: 0.84rem;
    color: var(--color-text-muted);
    font-weight: 300;
    margin-top: 0.2rem;
    line-height: 1.5;
  }

  .complete-week-section {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-warm-dark);
    animation: fadeIn 0.4s ease both;
  }

  .complete-week-prompt {
    color: var(--color-text-muted);
    font-size: 0.92rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .btn-primary {
    padding: 1rem 2rem;
    background: var(--color-sage);
    color: white;
    border: none;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s;
  }

  .btn-primary:hover {
    background: var(--color-sage-light);
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(124, 144, 130, 0.25);
  }

  .week-completed-badge {
    text-align: center;
    padding: 1.5rem 0;
    color: var(--color-green);
    font-family: var(--font-display);
    font-size: 1.1rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    .week-container { padding: 1rem 1.25rem 2rem; }
    .week-title { font-size: 1.5rem; }
    .activity-item { padding: 0.85rem 1rem; }
  }
`;

