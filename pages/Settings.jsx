import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [consents, setConsents] = useState({ gdprConsent: false, dataProcessingConsent: false, marketingConsent: false, privacyPolicyAccepted: false });
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleConsentUpdate = async () => {
    setSaving(true); setMessage(null);
    try { await api.post('/gdpr/consent', consents); setMessage({ type: 'success', text: 'Privacy preferences updated.' }); }
    catch { setMessage({ type: 'error', text: 'Failed to update preferences.' }); }
    finally { setSaving(false); }
  };

  const handleExport = async () => {
    setExporting(true); setMessage(null);
    try {
      const data = await api.get('/gdpr/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `breathing-space-data-${new Date().toISOString().split('T')[0]}.json`; a.click();
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Your data has been downloaded.' });
    } catch { setMessage({ type: 'error', text: 'Failed to export data.' }); }
    finally { setExporting(false); }
  };

  const handleDelete = async () => {
    if (deleteText !== 'DELETE MY DATA') return;
    setDeleting(true); setMessage(null);
    try {
      await api.post('/gdpr/delete-confirm', { confirmation: 'DELETE MY DATA' });
      setMessage({ type: 'success', text: 'Your data has been permanently deleted.' });
      setTimeout(async () => { await signOut(); navigate('/'); }, 2000);
    } catch { setMessage({ type: 'error', text: 'Failed to delete data.' }); setDeleting(false); }
  };

  const Section = ({ children, style }) => (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--color-warm-dark)', marginBottom: '1.25rem', ...style }}>{children}</div>
  );

  return (
    <div className="bs-page">
      <div className="bs-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')}>← Back</button>

        <div className="bs-animate" style={{ padding: '1rem 0 2rem' }}>
          <h1 className="bs-page-title">Settings</h1>
          <p className="bs-page-subtitle">Manage your account and privacy</p>
        </div>

        {message && <div className={`bs-message ${message.type === 'success' ? 'bs-message-success' : 'bs-message-error'}`}>{message.text}</div>}

        {/* Account */}
        <div className="bs-animate bs-animate-delay-1">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>Account</div>
          <Section>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</span>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: '0.15rem' }}>{user?.email || 'Not available'}</p>
            </div>
            <button className="bs-btn bs-btn-outline bs-btn-sm" onClick={async () => { await signOut(); navigate('/'); }} style={{ color: 'var(--color-red)' }}>
              Sign out
            </button>
          </Section>
        </div>

        {/* Privacy */}
        <div className="bs-animate bs-animate-delay-2">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>Privacy & Data</div>
          <Section>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 300, marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Control how your data is used. Required consents are marked *.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {[
                { key: 'gdprConsent', label: 'GDPR Consent *', desc: 'I consent to processing of my personal data as described in the privacy policy.' },
                { key: 'dataProcessingConsent', label: 'Data Processing *', desc: 'I consent to my data being processed to provide coaching and programme features.' },
                { key: 'privacyPolicyAccepted', label: 'Privacy Policy *', desc: 'I have read and accept the privacy policy.' },
                { key: 'marketingConsent', label: 'Marketing (optional)', desc: 'I\'d like to receive updates, tips, and new features by email.' },
              ].map(item => (
                <label key={item.key} className="bs-checkbox-row">
                  <input type="checkbox" checked={consents[item.key]} onChange={e => setConsents(prev => ({ ...prev, [item.key]: e.target.checked }))} />
                  <div>
                    <div className="bs-checkbox-label">{item.label}</div>
                    <div className="bs-checkbox-desc">{item.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <button className="bs-btn bs-btn-primary bs-btn-sm" onClick={handleConsentUpdate} disabled={saving}>
              {saving ? 'Saving...' : 'Update preferences'}
            </button>
          </Section>
        </div>

        {/* Export */}
        <div className="bs-animate bs-animate-delay-3">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>Export Your Data</div>
          <Section>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.5 }}>
              Download a copy of all your personal data (GDPR Article 20).
            </p>
            <button className="bs-btn bs-btn-secondary bs-btn-sm" onClick={handleExport} disabled={exporting}>
              {exporting ? 'Preparing...' : '⬇ Download my data'}
            </button>
          </Section>
        </div>

        {/* Delete */}
        <div className="bs-animate bs-animate-delay-4">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-red)', marginBottom: '0.75rem' }}>Delete My Data</div>
          <Section style={{ background: 'var(--color-red-light)', borderColor: '#E5C5C0' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-soft)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.5 }}>
              Permanently delete your account and all data (GDPR Article 17). This cannot be undone.
            </p>
            {!showDeleteConfirm ? (
              <button className="bs-btn bs-btn-danger bs-btn-sm" onClick={() => setShowDeleteConfirm(true)}>
                I want to delete my data
              </button>
            ) : (
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid #E5C5C0', marginTop: '0.75rem' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-red)', fontWeight: 500, marginBottom: '0.75rem' }}>
                  Type <code style={{ background: 'var(--color-red-light)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem' }}>DELETE MY DATA</code> to confirm:
                </p>
                <input type="text" className="bs-input" value={deleteText} onChange={e => setDeleteText(e.target.value)} placeholder="DELETE MY DATA" style={{ marginBottom: '0.75rem', borderColor: '#E5C5C0' }} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="bs-btn bs-btn-sm" onClick={handleDelete} disabled={deleteText !== 'DELETE MY DATA' || deleting} style={{ background: 'var(--color-red)', color: 'white' }}>
                    {deleting ? 'Deleting...' : 'Delete everything'}
                  </button>
                  <button className="bs-btn bs-btn-outline bs-btn-sm" onClick={() => { setShowDeleteConfirm(false); setDeleteText(''); }}>Cancel</button>
                </div>
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}