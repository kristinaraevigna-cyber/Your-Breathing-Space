import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function GDPRConsent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [consents, setConsents] = useState({
    gdprConsent: false,
    dataProcessingConsent: false,
    marketingConsent: false,
    privacyPolicyAccepted: false,
  });

  const requiredConsents =
    consents.gdprConsent &&
    consents.dataProcessingConsent &&
    consents.privacyPolicyAccepted;

  const handleSubmit = async () => {
    if (!requiredConsents || loading) return;
    setLoading(true);
    setError('');

    try {
      // Update profile directly via Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          gdpr_consent: consents.gdprConsent,
          gdpr_consent_date: new Date().toISOString(),
          data_processing_consent: consents.dataProcessingConsent,
          marketing_consent: consents.marketingConsent,
          privacy_policy_accepted: consents.privacyPolicyAccepted,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
      navigate('/onboarding');
    } catch (err) {
      console.error('Consent error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key) => {
    setConsents((c) => ({ ...c, [key]: !c[key] }));
  };

  const consentItems = [
    {
      key: 'gdprConsent',
      icon: '🛡',
      title: 'Data Processing Consent',
      description:
        'I consent to the processing of my personal data for the purpose of delivering the wellbeing programme.',
      required: true,
    },
    {
      key: 'dataProcessingConsent',
      icon: '💬',
      title: 'AI Coaching Consent',
      description:
        'I understand that my messages to the AI coach will be processed by OpenAI and/or Anthropic to provide responses. No data is used for training AI models.',
      required: true,
    },
    {
      key: 'privacyPolicyAccepted',
      icon: '📄',
      title: 'Privacy Policy',
      description: 'I have read and accept the Privacy Policy.',
      required: true,
      hasLink: true,
    },
    {
      key: 'marketingConsent',
      icon: '✉️',
      title: 'Marketing',
      description:
        'I would like to receive occasional wellbeing tips and programme updates by email.',
      required: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        .consent-root {
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
          --color-accent-hover: #B5845B;
          --color-error: #C0392B;
          --color-error-bg: #FDEDEC;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'Source Sans 3', system-ui, sans-serif;

          min-height: 100vh;
          background-color: var(--color-cream);
          font-family: var(--font-body);
          color: var(--color-text);
          display: flex;
          flex-direction: column;
        }

        /* Subtle grain texture overlay */
        .consent-root::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .consent-root > * {
          position: relative;
          z-index: 1;
        }

        /* Navigation */
        .consent-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.75rem 2rem;
        }

        .consent-logo {
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: var(--color-sage);
          letter-spacing: -0.01em;
        }

        /* Main Content */
        .consent-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem 3rem;
        }

        .consent-card {
          width: 100%;
          max-width: 540px;
          animation: fadeInUp 0.5s ease both;
        }

        .consent-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .consent-icon-row {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .consent-icon-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-sage-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          animation: fadeInUp 0.5s ease both;
        }

        .consent-icon-dot:nth-child(2) { animation-delay: 0.05s; }
        .consent-icon-dot:nth-child(3) { animation-delay: 0.1s; }

        .consent-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .consent-subtitle {
          font-size: 1rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto;
        }

        /* Consent Items */
        .consent-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .consent-item {
          background: white;
          border-radius: 16px;
          padding: 1.25rem 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.25s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          animation: fadeInUp 0.4s ease both;
          user-select: none;
        }

        .consent-item:nth-child(1) { animation-delay: 0.1s; }
        .consent-item:nth-child(2) { animation-delay: 0.15s; }
        .consent-item:nth-child(3) { animation-delay: 0.2s; }
        .consent-item:nth-child(4) { animation-delay: 0.25s; }

        .consent-item:hover {
          border-color: var(--color-sage-lighter);
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }

        .consent-item.checked {
          border-color: var(--color-sage-light);
          background: linear-gradient(135deg, white, var(--color-sage-lighter));
        }

        .consent-checkbox-wrap {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .consent-checkbox {
          width: 22px;
          height: 22px;
          border-radius: 8px;
          border: 2px solid var(--color-warm-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          background: white;
        }

        .consent-item.checked .consent-checkbox {
          background: var(--color-sage);
          border-color: var(--color-sage);
        }

        .consent-check-icon {
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s ease;
          color: white;
          font-size: 0.7rem;
          line-height: 1;
        }

        .consent-item.checked .consent-check-icon {
          opacity: 1;
          transform: scale(1);
        }

        .consent-item-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--color-sage-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.25s ease;
        }

        .consent-item.checked .consent-item-icon {
          background: var(--color-sage);
          transform: scale(1.05);
        }

        .consent-item.checked .consent-item-icon span {
          filter: grayscale(1) brightness(10);
        }

        .consent-item-content {
          flex: 1;
          min-width: 0;
        }

        .consent-item-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-text);
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .consent-required-dot {
          color: var(--color-accent);
          font-size: 0.75rem;
        }

        .consent-optional-tag {
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--color-text-muted);
          background: var(--color-warm);
          padding: 0.1rem 0.5rem;
          border-radius: 100px;
          letter-spacing: 0.02em;
        }

        .consent-item-desc {
          font-size: 0.85rem;
          color: var(--color-text-soft);
          font-weight: 300;
          line-height: 1.5;
        }

        .consent-item-desc a {
          color: var(--color-sage);
          text-decoration: underline;
          text-decoration-color: var(--color-sage-light);
          text-underline-offset: 2px;
          font-weight: 400;
        }

        .consent-item-desc a:hover {
          color: var(--color-accent);
        }

        /* Required note */
        .consent-required-note {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          font-weight: 300;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .consent-required-note span {
          color: var(--color-accent);
        }

        /* Error message */
        .consent-error {
          background: var(--color-error-bg);
          color: var(--color-error);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 400;
          margin-bottom: 1rem;
          text-align: center;
          animation: fadeInUp 0.3s ease both;
        }

        /* Submit Button */
        .consent-submit {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .consent-submit.active {
          background: var(--color-sage);
          color: white;
        }

        .consent-submit.active:hover {
          background: var(--color-sage-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124, 144, 130, 0.25);
        }

        .consent-submit.disabled {
          background: var(--color-warm-dark);
          color: var(--color-text-muted);
          cursor: not-allowed;
        }

        .consent-submit.loading {
          background: var(--color-sage-light);
          color: white;
          cursor: wait;
        }

        /* Spinner */
        .consent-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        /* Footer note */
        .consent-footer {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 300;
          line-height: 1.5;
        }

        /* Progress dots */
        .consent-progress {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-warm-dark);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: var(--color-sage);
          width: 24px;
          border-radius: 100px;
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .consent-container {
            padding: 1rem;
            align-items: flex-start;
          }
          .consent-title { font-size: 1.65rem; }
          .consent-item { padding: 1rem; }
          .consent-item-icon { display: none; }
        }
      `}</style>

      <div className="consent-root">
        {/* Nav */}
        <nav className="consent-nav">
          <div className="consent-logo">Breathing Space</div>
        </nav>

        {/* Content */}
        <div className="consent-container">
          <div className="consent-card">
            {/* Progress indicator: signup → consent → onboarding */}
            <div className="consent-progress">
              <div className="progress-dot" />
              <div className="progress-dot active" />
              <div className="progress-dot" />
            </div>

            <div className="consent-header">
              <div className="consent-icon-row">
                <div className="consent-icon-dot">🔒</div>
                <div className="consent-icon-dot">🌿</div>
                <div className="consent-icon-dot">🤝</div>
              </div>
              <h1 className="consent-title">Your Privacy Matters</h1>
              <p className="consent-subtitle">
                Before we begin, we need your consent to process your data.
                We take your privacy seriously and comply with GDPR.
              </p>
            </div>

            <div className="consent-items">
              {consentItems.map((item) => (
                <div
                  key={item.key}
                  className={`consent-item ${consents[item.key] ? 'checked' : ''}`}
                  onClick={() => toggle(item.key)}
                  role="checkbox"
                  aria-checked={consents[item.key]}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggle(item.key);
                    }
                  }}
                >
                  <div className="consent-checkbox-wrap">
                    <div className="consent-checkbox">
                      <span className="consent-check-icon">✓</span>
                    </div>
                  </div>
                  <div className="consent-item-icon">
                    <span>{item.icon}</span>
                  </div>
                  <div className="consent-item-content">
                    <div className="consent-item-title">
                      {item.title}
                      {item.required ? (
                        <span className="consent-required-dot">*</span>
                      ) : (
                        <span className="consent-optional-tag">Optional</span>
                      )}
                    </div>
                    <div className="consent-item-desc">
                      {item.hasLink ? (
                        <>
                          I have read and accept the{' '}
                          <a
                            href="/privacy"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </a>
                          .
                        </>
                      ) : (
                        item.description
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="consent-required-note">
              <span>*</span> Required to use Breathing Space
            </div>

            {error && <div className="consent-error">{error}</div>}

            <button
              onClick={handleSubmit}
              disabled={!requiredConsents || loading}
              className={`consent-submit ${
                loading ? 'loading' : requiredConsents ? 'active' : 'disabled'
              }`}
            >
              {loading ? (
                <>
                  <div className="consent-spinner" />
                  Saving...
                </>
              ) : (
                'Continue to Programme →'
              )}
            </button>

            <p className="consent-footer">
              You can withdraw consent and request data deletion<br />
              at any time from Settings.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
