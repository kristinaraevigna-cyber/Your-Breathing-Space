import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 7;

  const [data, setData] = useState({
    name: '',
    parentingSetup: '',
    childrenAges: [],
    currentSituation: '',
    biggestChallenges: [],
    strengths: [],
    supportNetwork: [],
    timeAvailability: '',
    previousExperience: '',
    hopesForProgramme: [],
    preferredCoachStyle: '',
  });

  const update = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const toggleArray = (key, value) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
    }));
  };

  const handleComplete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Store onboarding data in profile
      await supabase
        .from('profiles')
        .update({
          display_name: data.name || user?.email?.split('@')[0],
          onboarding_completed: true,
          onboarding_data: {
            parenting_setup: data.parentingSetup,
            children_ages: data.childrenAges,
            current_situation: data.currentSituation,
            biggest_challenges: data.biggestChallenges,
            strengths: data.strengths,
            support_network: data.supportNetwork,
            time_availability: data.timeAvailability,
            previous_experience: data.previousExperience,
            hopes_for_programme: data.hopesForProgramme,
            preferred_coach_style: data.preferredCoachStyle,
            completed_at: new Date().toISOString(),
          },
        })
        .eq('id', user.id);

      // Initialize programme
      await supabase.from('week_progress').upsert([
        { user_id: user.id, week_number: 1, status: 'unlocked', unlocked_at: new Date().toISOString() },
        { user_id: user.id, week_number: 2, status: 'locked', unlocked_at: null },
        { user_id: user.id, week_number: 3, status: 'locked', unlocked_at: null },
        { user_id: user.id, week_number: 4, status: 'locked', unlocked_at: null },
      ], { onConflict: 'user_id,week_number' });

      await supabase
        .from('profiles')
        .update({
          current_week: 1,
          programme_start_date: new Date().toISOString(),
        })
        .eq('id', user.id);

      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding error:', err);
    } finally {
      setLoading(false);
    }
  };

  const canContinue = () => {
    switch (step) {
      case 1: return true; // Name is optional
      case 2: return data.parentingSetup !== '';
      case 3: return data.biggestChallenges.length > 0;
      case 4: return data.strengths.length > 0;
      case 5: return data.timeAvailability !== '';
      case 6: return data.hopesForProgramme.length > 0;
      case 7: return data.preferredCoachStyle !== '';
      default: return true;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        .onboarding-root {
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
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'Source Sans 3', system-ui, sans-serif;

          min-height: 100vh;
          background-color: var(--color-cream);
          font-family: var(--font-body);
          color: var(--color-text);
          display: flex;
          flex-direction: column;
        }

        .onboarding-root::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .onboarding-root > * { position: relative; z-index: 1; }

        .onboarding-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }

        .onboarding-logo {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--color-sage);
        }

        .step-indicator {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .onboarding-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem 3rem;
        }

        .onboarding-card {
          width: 100%;
          max-width: 580px;
          animation: fadeInUp 0.4s ease both;
        }

        .progress-bar {
          height: 4px;
          background: var(--color-warm-dark);
          border-radius: 100px;
          margin-bottom: 2.5rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-sage), var(--color-sage-light));
          border-radius: 100px;
          transition: width 0.4s ease;
        }

        .step-content {
          animation: fadeIn 0.3s ease both;
        }

        .step-emoji {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .step-subtitle {
          font-size: 1rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Input styles */
        .text-input {
          width: 100%;
          padding: 1rem 1.25rem;
          font-size: 1.1rem;
          font-family: var(--font-body);
          border: 2px solid var(--color-warm-dark);
          border-radius: 16px;
          background: white;
          color: var(--color-text);
          transition: all 0.25s ease;
          outline: none;
          margin-bottom: 1.5rem;
        }

        .text-input:focus {
          border-color: var(--color-sage);
          box-shadow: 0 0 0 4px var(--color-sage-lighter);
        }

        .text-input::placeholder { color: var(--color-text-muted); }

        /* Single select options */
        .options-single {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .option-single {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: white;
          border: 2px solid transparent;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .option-single:hover {
          border-color: var(--color-sage-lighter);
        }

        .option-single.selected {
          border-color: var(--color-sage);
          background: var(--color-sage-lighter);
        }

        .option-icon {
          font-size: 1.25rem;
          width: 32px;
          text-align: center;
        }

        .option-text {
          flex: 1;
        }

        .option-label {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--color-text);
        }

        .option-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          font-weight: 300;
          margin-top: 0.1rem;
        }

        .option-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--color-warm-dark);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .option-single.selected .option-radio {
          border-color: var(--color-sage);
          background: var(--color-sage);
        }

        .option-radio::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .option-single.selected .option-radio::after { opacity: 1; }

        /* Multi select options */
        .options-multi {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .option-chip {
          padding: 0.6rem 1.1rem;
          background: white;
          border: 2px solid var(--color-warm-dark);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--color-text-soft);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .option-chip:hover {
          border-color: var(--color-sage-light);
          color: var(--color-text);
        }

        .option-chip.selected {
          border-color: var(--color-sage);
          background: var(--color-sage);
          color: white;
        }

        .option-chip .chip-icon {
          font-size: 1rem;
        }

        /* Helper text */
        .helper-text {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        /* Summary card */
        .summary-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .summary-greeting {
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: var(--color-text);
          margin-bottom: 1rem;
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .summary-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .summary-item-icon {
          font-size: 1rem;
          margin-top: 0.1rem;
        }

        .summary-item-text {
          font-size: 0.9rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.4;
        }

        .summary-item-text strong {
          color: var(--color-text);
          font-weight: 500;
        }

        /* Buttons */
        .btn-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .btn-primary {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 100px;
          background: var(--color-sage);
          color: white;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--color-sage-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124, 144, 130, 0.25);
        }

        .btn-primary:disabled {
          background: var(--color-warm-dark);
          color: var(--color-text-muted);
          cursor: not-allowed;
        }

        .btn-back {
          padding: 1rem 1.5rem;
          border: 2px solid var(--color-warm-dark);
          border-radius: 100px;
          background: none;
          color: var(--color-text-soft);
          font-family: var(--font-body);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-back:hover {
          border-color: var(--color-sage-light);
          color: var(--color-sage);
        }

        .btn-skip {
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: none;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-skip:hover { color: var(--color-sage); }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .step-title { font-size: 1.5rem; }
          .options-multi { gap: 0.4rem; }
          .option-chip { padding: 0.5rem 0.9rem; font-size: 0.85rem; }
        }
      `}</style>

      <div className="onboarding-root">
        <nav className="onboarding-nav">
          <div className="onboarding-logo">Breathing Space</div>
          <div className="step-indicator">{step} of {totalSteps}</div>
        </nav>

        <div className="onboarding-container">
          <div className="onboarding-card" key={step}>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            {/* Step 1: Name */}
            {step === 1 && (
              <div className="step-content">
                <div className="step-emoji">👋</div>
                <h1 className="step-title">Welcome to Breathing Space</h1>
                <p className="step-subtitle">
                  We're so glad you're here. This programme is designed to support you — 
                  let's start by getting to know each other a little better.
                </p>
                <input
                  type="text"
                  className="text-input"
                  placeholder="What should we call you?"
                  value={data.name}
                  onChange={(e) => update('name', e.target.value)}
                  autoFocus
                />
                <div className="btn-row">
                  <button className="btn-primary" onClick={() => setStep(2)}>
                    Continue →
                  </button>
                </div>
                <button className="btn-skip" onClick={() => setStep(2)}>
                  Skip for now
                </button>
              </div>
            )}

            {/* Step 2: Parenting Setup */}
            {step === 2 && (
              <div className="step-content">
                <div className="step-emoji">🏠</div>
                <h1 className="step-title">Tell us about your family</h1>
                <p className="step-subtitle">
                  Understanding your situation helps us tailor the content to be genuinely useful for you.
                </p>
                <div className="options-single">
                  {[
                    { id: 'two-parent', icon: '👫', label: 'Two-parent household', desc: 'Parenting with a partner' },
                    { id: 'single', icon: '💪', label: 'Single parent', desc: 'Primary caregiver on your own' },
                    { id: 'co-parent', icon: '🤝', label: 'Co-parenting', desc: 'Sharing care across households' },
                    { id: 'extended', icon: '👨‍👩‍👧‍👦', label: 'Extended family', desc: 'Multi-generational or with relatives' },
                    { id: 'other', icon: '🏡', label: 'Other arrangement', desc: 'Something else entirely' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-single ${data.parentingSetup === opt.id ? 'selected' : ''}`}
                      onClick={() => update('parentingSetup', opt.id)}
                    >
                      <div className="option-icon">{opt.icon}</div>
                      <div className="option-text">
                        <div className="option-label">{opt.label}</div>
                        <div className="option-desc">{opt.desc}</div>
                      </div>
                      <div className="option-radio" />
                    </div>
                  ))}
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(1)}>←</button>
                  <button className="btn-primary" onClick={() => setStep(3)} disabled={!canContinue()}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Challenges */}
            {step === 3 && (
              <div className="step-content">
                <div className="step-emoji">🌊</div>
                <h1 className="step-title">What feels hardest right now?</h1>
                <p className="step-subtitle">
                  Select all that resonate. There are no wrong answers — this helps us understand where to focus.
                </p>
                <div className="options-multi">
                  {[
                    { id: 'overwhelm', icon: '😮‍💨', label: 'Feeling overwhelmed' },
                    { id: 'time', icon: '⏰', label: 'Never enough time' },
                    { id: 'patience', icon: '🫠', label: 'Running out of patience' },
                    { id: 'guilt', icon: '💭', label: 'Parent guilt' },
                    { id: 'balance', icon: '⚖️', label: 'Work-life balance' },
                    { id: 'sleep', icon: '😴', label: 'Sleep deprivation' },
                    { id: 'connection', icon: '💔', label: 'Feeling disconnected' },
                    { id: 'identity', icon: '🪞', label: 'Losing sense of self' },
                    { id: 'anxiety', icon: '😰', label: 'Worry and anxiety' },
                    { id: 'loneliness', icon: '🏝️', label: 'Loneliness' },
                    { id: 'conflict', icon: '⚡', label: 'Family conflict' },
                    { id: 'motivation', icon: '🔋', label: 'Low energy/motivation' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-chip ${data.biggestChallenges.includes(opt.id) ? 'selected' : ''}`}
                      onClick={() => toggleArray('biggestChallenges', opt.id)}
                    >
                      <span className="chip-icon">{opt.icon}</span>
                      {opt.label}
                    </div>
                  ))}
                </div>
                <div className="helper-text">
                  Selected: {data.biggestChallenges.length || 'None yet'}
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(2)}>←</button>
                  <button className="btn-primary" onClick={() => setStep(4)} disabled={!canContinue()}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Strengths */}
            {step === 4 && (
              <div className="step-content">
                <div className="step-emoji">💪</div>
                <h1 className="step-title">What are you already good at?</h1>
                <p className="step-subtitle">
                  We build on strengths here, not just fix problems. What do you bring to your family?
                </p>
                <div className="options-multi">
                  {[
                    { id: 'patience', icon: '🧘', label: 'Patience' },
                    { id: 'playfulness', icon: '🎈', label: 'Playfulness' },
                    { id: 'listening', icon: '👂', label: 'Good listener' },
                    { id: 'organised', icon: '📋', label: 'Organised' },
                    { id: 'creative', icon: '🎨', label: 'Creative' },
                    { id: 'calm', icon: '🌊', label: 'Staying calm' },
                    { id: 'affectionate', icon: '🤗', label: 'Affectionate' },
                    { id: 'consistent', icon: '🎯', label: 'Consistent' },
                    { id: 'flexible', icon: '🌿', label: 'Flexible' },
                    { id: 'advocate', icon: '📣', label: 'Advocating for my kids' },
                    { id: 'provider', icon: '🏠', label: 'Providing stability' },
                    { id: 'fun', icon: '🎉', label: 'Making things fun' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-chip ${data.strengths.includes(opt.id) ? 'selected' : ''}`}
                      onClick={() => toggleArray('strengths', opt.id)}
                    >
                      <span className="chip-icon">{opt.icon}</span>
                      {opt.label}
                    </div>
                  ))}
                </div>
                <div className="helper-text">
                  It's okay to acknowledge what you're good at ✨
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(3)}>←</button>
                  <button className="btn-primary" onClick={() => setStep(5)} disabled={!canContinue()}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Time Availability */}
            {step === 5 && (
              <div className="step-content">
                <div className="step-emoji">⏰</div>
                <h1 className="step-title">How much time do you realistically have?</h1>
                <p className="step-subtitle">
                  Be honest — we'll pace the programme to fit your life, not the other way around.
                </p>
                <div className="options-single">
                  {[
                    { id: 'minimal', icon: '🫣', label: '5–10 minutes', desc: 'Honestly, barely anything' },
                    { id: 'short', icon: '☕', label: '10–20 minutes', desc: 'A coffee break here and there' },
                    { id: 'moderate', icon: '🌅', label: '20–30 minutes', desc: 'Some quiet morning or evening time' },
                    { id: 'flexible', icon: '📅', label: '30+ minutes', desc: 'I can carve out dedicated time' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-single ${data.timeAvailability === opt.id ? 'selected' : ''}`}
                      onClick={() => update('timeAvailability', opt.id)}
                    >
                      <div className="option-icon">{opt.icon}</div>
                      <div className="option-text">
                        <div className="option-label">{opt.label}</div>
                        <div className="option-desc">{opt.desc}</div>
                      </div>
                      <div className="option-radio" />
                    </div>
                  ))}
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(4)}>←</button>
                  <button className="btn-primary" onClick={() => setStep(6)} disabled={!canContinue()}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Hopes */}
            {step === 6 && (
              <div className="step-content">
                <div className="step-emoji">🌟</div>
                <h1 className="step-title">What are you hoping to get from this?</h1>
                <p className="step-subtitle">
                  Select everything that speaks to you. This shapes what we'll focus on together.
                </p>
                <div className="options-multi">
                  {[
                    { id: 'calm', icon: '🧘', label: 'Feel calmer' },
                    { id: 'patience', icon: '🌿', label: 'More patience' },
                    { id: 'joy', icon: '✨', label: 'Find more joy' },
                    { id: 'present', icon: '🎁', label: 'Be more present' },
                    { id: 'connection', icon: '💛', label: 'Better connection with kids' },
                    { id: 'partner', icon: '💑', label: 'Stronger partnership' },
                    { id: 'boundaries', icon: '🚧', label: 'Set better boundaries' },
                    { id: 'guilt', icon: '🎈', label: 'Less guilt' },
                    { id: 'self-care', icon: '💆', label: 'Prioritize self-care' },
                    { id: 'perspective', icon: '🔭', label: 'Fresh perspective' },
                    { id: 'tools', icon: '🧰', label: 'Practical tools' },
                    { id: 'support', icon: '🤝', label: 'Feel supported' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-chip ${data.hopesForProgramme.includes(opt.id) ? 'selected' : ''}`}
                      onClick={() => toggleArray('hopesForProgramme', opt.id)}
                    >
                      <span className="chip-icon">{opt.icon}</span>
                      {opt.label}
                    </div>
                  ))}
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(5)}>←</button>
                  <button className="btn-primary" onClick={() => setStep(7)} disabled={!canContinue()}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Coach Style */}
            {step === 7 && (
              <div className="step-content">
                <div className="step-emoji">💬</div>
                <h1 className="step-title">How would you like the AI coach to talk to you?</h1>
                <p className="step-subtitle">
                  Everyone's different. Choose the style that would feel most helpful.
                </p>
                <div className="options-single">
                  {[
                    { id: 'warm', icon: '🤗', label: 'Warm & nurturing', desc: 'Gentle encouragement and emotional support' },
                    { id: 'practical', icon: '🎯', label: 'Practical & direct', desc: 'Straight to actionable advice' },
                    { id: 'curious', icon: '🔍', label: 'Curious & reflective', desc: 'Asks questions to help me think' },
                    { id: 'cheerleader', icon: '📣', label: 'Motivating & upbeat', desc: 'Celebrates wins and keeps me going' },
                    { id: 'balanced', icon: '⚖️', label: 'Balanced mix', desc: 'A bit of everything depending on the moment' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-single ${data.preferredCoachStyle === opt.id ? 'selected' : ''}`}
                      onClick={() => update('preferredCoachStyle', opt.id)}
                    >
                      <div className="option-icon">{opt.icon}</div>
                      <div className="option-text">
                        <div className="option-label">{opt.label}</div>
                        <div className="option-desc">{opt.desc}</div>
                      </div>
                      <div className="option-radio" />
                    </div>
                  ))}
                </div>
                <div className="btn-row">
                  <button className="btn-back" onClick={() => setStep(6)}>←</button>
                  <button className="btn-primary" onClick={handleComplete} disabled={!canContinue() || loading}>
                    {loading ? (
                      <>
                        <div className="spinner" />
                        Setting up...
                      </>
                    ) : (
                      'Start my journey →'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
