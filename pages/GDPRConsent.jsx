import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function GDPRConsent() {
  const navigate = useNavigate();
  const [consents, setConsents] = useState({
    gdprConsent: false,
    dataProcessingConsent: false,
    marketingConsent: false,
    privacyPolicyAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const requiredConsents = consents.gdprConsent &&
    consents.dataProcessingConsent && consents.privacyPolicyAccepted;

  const handleSubmit = async () => {
    if (!requiredConsents) return;
    setLoading(true);
    try {
      await api.post('/gdpr/consent', consents);
      navigate('/onboarding');
    } catch (err) {
      console.error('Consent error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Your Privacy Matters
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Before we begin, we need your consent to process your data.
          We take your privacy seriously and comply with GDPR.
        </p>

        <div className="space-y-4">
          <label className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={consents.gdprConsent}
              onChange={(e) => setConsents(c => ({
                ...c, gdprConsent: e.target.checked
              }))}
            />
            <div>
              <p className="font-medium text-slate-700">
                Data Processing Consent *
              </p>
              <p className="text-sm text-slate-500">
                I consent to the processing of my personal data for
                the purpose of delivering the wellbeing programme.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={consents.dataProcessingConsent}
              onChange={(e) => setConsents(c => ({
                ...c, dataProcessingConsent: e.target.checked
              }))}
            />
            <div>
              <p className="font-medium text-slate-700">
                AI Coaching Consent *
              </p>
              <p className="text-sm text-slate-500">
                I understand that my messages to the AI coach will be
                processed by OpenAI and/or Anthropic to provide responses.
                No data is used for training AI models.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={consents.privacyPolicyAccepted}
              onChange={(e) => setConsents(c => ({
                ...c, privacyPolicyAccepted: e.target.checked
              }))}
            />
            <div>
              <p className="font-medium text-slate-700">
                Privacy Policy *
              </p>
              <p className="text-sm text-slate-500">
                I have read and accept the Privacy Policy.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={consents.marketingConsent}
              onChange={(e) => setConsents(c => ({
                ...c, marketingConsent: e.target.checked
              }))}
            />
            <div>
              <p className="font-medium text-slate-700">
                Marketing (Optional)
              </p>
              <p className="text-sm text-slate-500">
                I would like to receive occasional wellbeing tips
                and programme updates by email.
              </p>
            </div>
          </label>
        </div>

        <p className="text-xs text-slate-400 mt-4">* Required</p>

        <button
          onClick={handleSubmit}
          disabled={!requiredConsents || loading}
          className={`w-full mt-6 py-3 rounded-xl font-medium text-white transition
            ${requiredConsents
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {loading ? 'Saving...' : 'Continue to Programme'}
        </button>

        <p className="text-xs text-slate-400 mt-4 text-center">
          You can withdraw consent and request data deletion at
          any time from Settings.
        </p>
      </div>
    </div>
  );
}