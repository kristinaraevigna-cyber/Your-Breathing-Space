import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const ACTION_TYPES = [
  { value: 'personal', label: 'Personal', emoji: '🙋' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { value: 'self_care', label: 'Self Care', emoji: '💆' },
  { value: 'connection', label: 'Connection', emoji: '💛' },
  { value: 'tool_practice', label: 'Tool Practice', emoji: '🛠' },
];

const STATUS_MAP = {
  pending: { label: 'To Do', color: 'var(--color-text-muted)' },
  in_progress: { label: 'In Progress', color: 'var(--color-blue)' },
  completed: { label: 'Done', color: 'var(--color-green)' },
  skipped: { label: 'Skipped', color: 'var(--color-text-muted)' },
};

export default function Actions() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', actionType: 'personal', weekNumber: '', dueDate: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => { loadActions(); }, []);

  const loadActions = async () => {
    try { const data = await api.get('/actions'); setActions(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    try {
      const created = await api.post('/actions', {
        title: form.title, description: form.description, actionType: form.actionType,
        weekNumber: form.weekNumber ? parseInt(form.weekNumber) : null, dueDate: form.dueDate || null,
      });
      setActions(prev => [created, ...prev]);
      setForm({ title: '', description: '', actionType: 'personal', weekNumber: '', dueDate: '' });
      setShowForm(false);
    } catch (err) { console.error(err); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await api.put(`/actions/${id}`, { status: newStatus });
      setActions(prev => prev.map(a => (a.id === id ? updated : a)));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this action?')) return;
    try { await api.delete(`/actions/${id}`); setActions(prev => prev.filter(a => a.id !== id)); }
    catch (err) { console.error(err); }
  };

  const filtered = filter === 'all' ? actions : actions.filter(a => a.status === filter);
  const completedCount = actions.filter(a => a.status === 'completed').length;

  if (loading) return <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p></div>;

  return (
    <div className="bs-page">
      <div className="bs-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')}>← Back</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1rem 0 0.5rem' }}>
          <div className="bs-animate">
            <h1 className="bs-page-title">Actions</h1>
            <p className="bs-page-subtitle">{completedCount} of {actions.length} completed</p>
          </div>
          {!showForm && (
            <button className="bs-btn bs-btn-primary bs-btn-sm bs-animate" onClick={() => setShowForm(true)}>+ Add action</button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bs-animate" style={{
            background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem',
            border: '1.5px solid var(--color-sage-light)', margin: '1rem 0 2rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>New action</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
            </div>
            <input type="text" className="bs-input" placeholder="What do you want to do?" value={form.title} onChange={e => setForm(prev => ({...prev, title: e.target.value}))} style={{ marginBottom: '0.75rem' }} />
            <textarea className="bs-input" placeholder="Description (optional)" value={form.description} onChange={e => setForm(prev => ({...prev, description: e.target.value}))} rows={2} style={{ marginBottom: '0.75rem', resize: 'none' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <span className="bs-label">Type</span>
                <select className="bs-select" value={form.actionType} onChange={e => setForm(prev => ({...prev, actionType: e.target.value}))}>
                  {ACTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>)}
                </select>
              </div>
              <div>
                <span className="bs-label">Week</span>
                <select className="bs-select" value={form.weekNumber} onChange={e => setForm(prev => ({...prev, weekNumber: e.target.value}))}>
                  <option value="">None</option>
                  {[1,2,3,4].map(w => <option key={w} value={w}>Week {w}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="bs-label">Due date (optional)</span>
              <input type="date" className="bs-input" value={form.dueDate} onChange={e => setForm(prev => ({...prev, dueDate: e.target.value}))} />
            </div>
            <button className="bs-btn bs-btn-primary bs-btn-full" onClick={handleCreate} disabled={!form.title.trim()}>Add action</button>
          </div>
        )}

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.4rem', margin: '1.25rem 0', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {[{ value: 'all', label: 'All' }, ...Object.entries(STATUS_MAP).map(([k, v]) => ({ value: k, label: v.label }))].map(opt => (
            <button key={opt.value} className={`bs-chip ${filter === opt.value ? 'bs-chip-active' : ''}`} onClick={() => setFilter(opt.value)}>{opt.label}</button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bs-empty">
            <div className="bs-empty-icon">🎯</div>
            <p className="bs-empty-text">{filter === 'all' ? 'No actions yet. Add one to get started.' : `No ${filter.replace('_', ' ')} actions.`}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filtered.map((action, i) => {
              const status = STATUS_MAP[action.status] || STATUS_MAP.pending;
              const isDone = action.status === 'completed';
              return (
                <div key={action.id} className={`bs-animate bs-animate-delay-${Math.min(i+1, 4)}`} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.25rem',
                  background: isDone ? 'var(--color-green-light)' : 'white',
                  border: `1.5px solid ${isDone ? '#C5DEC9' : 'var(--color-warm-dark)'}`,
                  borderRadius: 'var(--radius-md)', transition: 'all 0.2s',
                }}>
                  <button
                    onClick={() => {
                      const order = ['pending', 'in_progress', 'completed'];
                      const idx = order.indexOf(action.status);
                      handleStatusChange(action.id, order[(idx + 1) % order.length]);
                    }}
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      border: isDone ? 'none' : `2px solid ${status.color}`,
                      background: isDone ? 'var(--color-green)' : 'transparent',
                      color: 'white', fontSize: '0.7rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '0.1rem', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                    }}
                  >{isDone ? '✓' : ''}</button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.92rem', color: isDone ? 'var(--color-text-muted)' : 'var(--color-text)', textDecoration: isDone ? 'line-through' : 'none' }}>
                      {ACTION_TYPES.find(t => t.value === action.action_type)?.emoji} {action.title}
                    </div>
                    {action.description && <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 300, marginTop: '0.2rem' }}>{action.description}</p>}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {action.week_number && <span className="bs-pill bs-pill-blue">Week {action.week_number}</span>}
                      {action.due_date && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Due {new Date(action.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
                      <span className="bs-pill bs-pill-warm">{status.label}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(action.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.85rem', flexShrink: 0, padding: '0.25rem' }}>🗑</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}