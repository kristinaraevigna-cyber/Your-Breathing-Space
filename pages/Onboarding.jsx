import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';

export default function GDPRConsent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consents, setConsents] = useState({
    gdprConsent: false,
    dataProcessingConsent: false,
    marketingConsent: false,
    privacyPolicyAccepted: false,
  });

  const requiredMet = consents.gdprConsent && consents.dataProcessingConsent && consents.privacyPolicyAccepted;

  const handleSubmit = async () => {
    if (!requiredMet) return;
    await api.post('/gdpr/consent', consents);
    navigate('/onboarding');
  };

  return (
    <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        <div className="bs-animate" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Your Privacy Matters</h1>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.6, fontSize: '0.95rem' }}>
            Before we begin, we need your consent to process your data. We take your privacy seriously and comply with GDPR.
          </p>
        </div>

        <div className="bs-animate bs-animate-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <label className="bs-checkbox-row">
            <input type="checkbox" checked={consents.gdprConsent} onChange={e => setConsents(c => ({ ...c, gdprConsent: e.target.checked }))} />
            <div>
              <div className="bs-checkbox-label">Data Processing Consent *</div>
              <div className="bs-checkbox-desc">I consent to the processing of my personal data for the purpose of delivering the wellbeing programme.</div>
            </div>
          </label>

          <label className="bs-checkbox-row">
            <input type="checkbox" checked={consents.dataProcessingConsent} onChange={e => setConsents(c => ({ ...c, dataProcessingConsent: e.target.checked }))} />
            <div>
              <div className="bs-checkbox-label">AI Coaching Consent *</div>
              <div className="bs-checkbox-desc">I understand that my messages to the AI coach will be processed by OpenAI and/or Anthropic to provide responses. No data is used for training AI models.</div>
            </div>
          </label>

          <label className="bs-checkbox-row">
            <input type="checkbox" checked={consents.privacyPolicyAccepted} onChange={e => setConsents(c => ({ ...c, privacyPolicyAccepted: e.target.checked }))} />
            <div>
              <div className="bs-checkbox-label">Privacy Policy *</div>
              <div className="bs-checkbox-desc">I have read and accept the <span style={{ color: 'var(--color-sage)', fontWeight: 500 }}>Privacy Policy</span>.</div>
            </div>
          </label>

          <label className="bs-checkbox-row">
            <input type="checkbox" checked={consents.marketingConsent} onChange={e => setConsents(c => ({ ...c, marketingConsent: e.target.checked }))} />
            <div>
              <div className="bs-checkbox-label">Marketing (Optional)</div>
              <div className="bs-checkbox-desc">I would like to receive occasional wellbeing tips and programme updates by email.</div>
            </div>
          </label>
        </div>

        <p className="bs-animate bs-animate-delay-2" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>* Required</p>

        <button
          className="bs-btn bs-btn-primary bs-btn-full bs-animate bs-animate-delay-3"
          onClick={handleSubmit}
          disabled={!requiredMet}
          style={{ padding: '0.85rem' }}
        >
          Continue to programme
        </button>

        <p className="bs-animate bs-animate-delay-4" style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '1rem', fontWeight: 300 }}>
          You can withdraw consent and request data deletion at any time from Settings.
        </p>
      </div>
    </div>
  );
}
