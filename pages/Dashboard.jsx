import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

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
  const weekNum = parseInt(weekNumber);
  const week = WEEK_DATA[weekNum];
  const [progress, setProgress] = useState(null);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/progress').then(data => {
      const wp = data.find(p => p.week_number === weekNum);
      setProgress(wp);
      if (wp?.extras_completed) setCompletions(wp.extras_completed);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [weekNum]);

  const isCompleted = (id) => completions.includes(id);

  const handleComplete = async (activityId, activityType) => {
    try {
      await api.post('/progress/complete-activity', { weekNumber: weekNum, activityId, activityType });
      setCompletions(prev => [...prev, activityId]);
    } catch (err) { console.error(err); }
  };

  const handleCompleteWeek = async () => {
    try {
      await api.post('/progress/complete-week', { weekNumber: weekNum });
      navigate('/dashboard');
    } catch (err) { console.error(err); }
  };

  if (!week) return (
    <div className="bs-page bs-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--color-text-muted)' }}>Week not found.</p>
      <button className="bs-btn bs-btn-outline" onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>Back</button>
    </div>
  );

  if (loading) return (
    <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p>
    </div>
  );

  const mainDone = progress?.main_session_completed || isCompleted(week.mainSession.id);

  const ActivityItem = ({ item, done }) => (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '1rem',
      padding: '1rem 1.25rem',
      background: done ? 'var(--color-green-light)' : 'white',
      border: `1.5px solid ${done ? '#C5DEC9' : 'var(--color-warm-dark)'}`,
      borderRadius: 'var(--radius-md)',
      transition: 'all 0.2s',
    }}>
      <button
        onClick={() => !done && handleComplete(item.id, item.type)}
        disabled={done}
        style={{
          width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
          border: done ? 'none' : '2px solid var(--color-warm-dark)',
          background: done ? 'var(--color-green)' : 'transparent',
          color: 'white', fontSize: '0.7rem', cursor: done ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: '0.1rem', transition: 'all 0.2s',
          fontFamily: 'var(--font-body)',
        }}
      >{done ? '✓' : ''}</button>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--color-text)' }}>{item.title}</div>
        <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 300, marginTop: '0.2rem', lineHeight: 1.5 }}>{item.description}</div>
      </div>
    </div>
  );

  return (
    <div className="bs-page">
      <div className="bs-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')}>← Back</button>

        {/* Week Header */}
        <div className="bs-animate" style={{ padding: '1.5rem 0 2rem' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>{week.icon}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', marginBottom: '0.35rem' }}>
            Week {weekNum}: {week.title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>{week.subtitle}</p>
        </div>

        {/* Main Session */}
        <div className="bs-animate bs-animate-delay-1" style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>
            Main Session
          </div>
          <div style={{
            padding: '1.5rem',
            background: mainDone ? 'var(--color-green-light)' : 'white',
            border: mainDone ? '1.5px solid #C5DEC9' : '1.5px solid var(--color-sage-light)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: mainDone ? 'none' : 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.35rem' }}>{week.mainSession.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-soft)', fontWeight: 300, lineHeight: 1.6 }}>{week.mainSession.description}</p>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'inline-block' }}>⏱ {week.mainSession.duration}</span>
              </div>
            </div>
            {!mainDone && (
              <button
                className="bs-btn bs-btn-primary bs-btn-sm"
                onClick={() => handleComplete(week.mainSession.id, 'main_session')}
                style={{ marginTop: '1rem' }}
              >Mark complete</button>
            )}
            {mainDone && <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-green)', fontWeight: 500 }}>✓ Completed</div>}
          </div>
        </div>

        {/* Activities */}
        <div className="bs-animate bs-animate-delay-2" style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>
            Activities — choose what suits you
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {week.activities.map(act => <ActivityItem key={act.id} item={act} done={isCompleted(act.id)} />)}
          </div>
        </div>

        {/* Extras */}
        <div className="bs-animate bs-animate-delay-3" style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            Optional extras
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {week.extras.map(ext => <ActivityItem key={ext.id} item={ext} done={isCompleted(ext.id)} />)}
          </div>
        </div>

        {/* Complete Week */}
        {mainDone && progress?.status !== 'completed' && (
          <div className="bs-animate" style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--color-warm-dark)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', fontWeight: 300, marginBottom: '1rem' }}>Ready to move on?</p>
            <button className="bs-btn bs-btn-primary" onClick={handleCompleteWeek}>Complete Week {weekNum} & Unlock Next →</button>
          </div>
        )}
        {progress?.status === 'completed' && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--color-green)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
            ✓ Week {weekNum} completed
          </div>
        )}
      </div>
    </div>
  );
}