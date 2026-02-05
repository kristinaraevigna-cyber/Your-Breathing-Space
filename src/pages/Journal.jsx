import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const MOOD_LABELS = ['', 'Awful', 'Terrible', 'Bad', 'Low', 'Meh', 'Okay', 'Good', 'Great', 'Brilliant', 'Amazing'];

export default function Journal() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', moodRating: 5, tags: [], weekNumber: null, promptId: null });

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    try { const data = await api.get('/journal'); setEntries(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadPrompts = async (weekNum) => {
    if (!weekNum) return;
    try { const data = await api.get(`/journal/prompts/${weekNum}`); setPrompts(data); }
    catch (err) { console.error(err); }
  };

  const handleSubmit = async () => {
    if (!form.content.trim()) return;
    try {
      if (editingId) {
        const updated = await api.put(`/journal/${editingId}`, { title: form.title, content: form.content, moodRating: form.moodRating, tags: form.tags });
        setEntries(prev => prev.map(e => (e.id === editingId ? updated : e)));
      } else {
        const created = await api.post('/journal', { title: form.title, content: form.content, moodRating: form.moodRating, tags: form.tags, weekNumber: form.weekNumber, promptId: form.promptId });
        setEntries(prev => [created, ...prev]);
      }
      resetForm();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal entry?')) return;
    try { await api.delete(`/journal/${id}`); setEntries(prev => prev.filter(e => e.id !== id)); }
    catch (err) { console.error(err); }
  };

  const startEdit = (entry) => {
    setForm({ title: entry.title || '', content: entry.content, moodRating: entry.mood_rating || 5, tags: entry.tags || [], weekNumber: entry.week_number, promptId: entry.prompt_id });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const usePrompt = (prompt) => {
    setForm(prev => ({ ...prev, title: prompt.prompt_text, promptId: prompt.id, weekNumber: prompt.week_number }));
  };

  const resetForm = () => {
    setForm({ title: '', content: '', moodRating: 5, tags: [], weekNumber: null, promptId: null });
    setEditingId(null);
    setShowForm(false);
    setPrompts([]);
  };

  if (loading) return <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p></div>;

  return (
    <div className="bs-page">
      <div className="bs-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')}>← Back</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1rem 0 2rem' }}>
          <div className="bs-animate">
            <h1 className="bs-page-title">Journal</h1>
            <p className="bs-page-subtitle">Your private space to reflect</p>
          </div>
          {!showForm && (
            <button className="bs-btn bs-btn-primary bs-btn-sm bs-animate" onClick={() => setShowForm(true)}>+ New entry</button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bs-animate" style={{
            background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem',
            border: '1.5px solid var(--color-sage-light)', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{editingId ? 'Edit entry' : 'New entry'}</h2>
              <button onClick={resetForm} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
            </div>

            {!editingId && (
              <div style={{ marginBottom: '1rem' }}>
                <span className="bs-label">Use a prompt (optional)</span>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  {[1,2,3,4].map(w => (
                    <button key={w} className="bs-chip" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }} onClick={() => loadPrompts(w)}>Week {w}</button>
                  ))}
                </div>
                {prompts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {prompts.map(p => (
                      <button key={p.id} onClick={() => usePrompt(p)} style={{
                        textAlign: 'left', padding: '0.6rem 0.75rem', background: 'var(--color-sage-lighter)',
                        border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                        fontSize: '0.85rem', color: 'var(--color-text-soft)', fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s',
                      }}>{p.prompt_text}</button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <input type="text" className="bs-input" placeholder="Title (optional)" value={form.title} onChange={e => setForm(prev => ({...prev, title: e.target.value}))} style={{ marginBottom: '0.75rem' }} />
            <textarea className="bs-input bs-textarea" placeholder="Write your thoughts..." value={form.content} onChange={e => setForm(prev => ({...prev, content: e.target.value}))} rows={5} style={{ marginBottom: '1rem' }} />

            <div style={{ marginBottom: '1.25rem' }}>
              <span className="bs-label">Mood: {MOOD_LABELS[form.moodRating]} ({form.moodRating}/10)</span>
              <input type="range" min="1" max="10" value={form.moodRating} onChange={e => setForm(prev => ({...prev, moodRating: parseInt(e.target.value)}))} style={{ width: '100%', accentColor: 'var(--color-sage)' }} />
            </div>

            <button className="bs-btn bs-btn-primary bs-btn-full" onClick={handleSubmit} disabled={!form.content.trim()}>
              {editingId ? 'Update entry' : 'Save entry'}
            </button>
          </div>
        )}

        {/* Entries */}
        {entries.length === 0 ? (
          <div className="bs-empty">
            <div className="bs-empty-icon">📝</div>
            <p className="bs-empty-text">No entries yet. Start writing to track your reflections.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {entries.map((entry, i) => (
              <div key={entry.id} className={`bs-animate bs-animate-delay-${Math.min(i + 1, 4)}`} style={{
                background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem',
                border: '1px solid var(--color-warm-dark)', transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    {entry.title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>{entry.title}</h3>}
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-soft)', fontWeight: 300, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(entry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      {entry.mood_rating && <span className="bs-pill bs-pill-sage">{MOOD_LABELS[entry.mood_rating]}</span>}
                      {entry.week_number && <span className="bs-pill bs-pill-blue">Week {entry.week_number}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '1rem', flexShrink: 0 }}>
                    <button onClick={() => startEdit(entry)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.85rem', padding: '0.25rem' }}>✏️</button>
                    <button onClick={() => handleDelete(entry.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.85rem', padding: '0.25rem' }}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
