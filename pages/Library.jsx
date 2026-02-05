import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'wellbeing', label: '🌱 Wellbeing' },
  { value: 'tools', label: '🛠 Tools' },
  { value: 'connection', label: '💛 Connection' },
  { value: 'resilience', label: '🌿 Resilience' },
  { value: 'self_care', label: '💆 Self Care' },
  { value: 'mindfulness', label: '🧘 Mindfulness' },
];

const TYPE_META = {
  article: { icon: '📄', label: 'Article' },
  video: { icon: '🎬', label: 'Video' },
  audio: { icon: '🎧', label: 'Audio' },
  exercise: { icon: '💪', label: 'Exercise' },
  worksheet: { icon: '📋', label: 'Worksheet' },
  external_link: { icon: '🔗', label: 'Link' },
};

export default function Library() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [weekFilter, setWeekFilter] = useState('all');
  const [showBookmarked, setShowBookmarked] = useState(false);

  useEffect(() => { loadResources(); }, [category, weekFilter]);

  const loadResources = async () => {
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (weekFilter !== 'all') params.set('week', weekFilter);
      const qs = params.toString();
      const data = await api.get(`/library${qs ? `?${qs}` : ''}`);
      setResources(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleBookmark = async (resourceId) => {
    try {
      await api.post(`/library/${resourceId}/bookmark`);
      setResources(prev => prev.map(r => {
        if (r.id !== resourceId) return r;
        const ul = r.user_library?.[0];
        return { ...r, user_library: [{ ...(ul || {}), is_bookmarked: !ul?.is_bookmarked }] };
      }));
    } catch (err) { console.error(err); }
  };

  const handleView = async (resource) => {
    try { await api.post(`/library/${resource.id}/view`); } catch {}
    if (resource.url) window.open(resource.url, '_blank');
  };

  const isBookmarked = (r) => r.user_library?.[0]?.is_bookmarked;
  const displayed = showBookmarked ? resources.filter(r => isBookmarked(r)) : resources;

  if (loading) return <div className="bs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>Loading...</p></div>;

  return (
    <div className="bs-page">
      <div className="bs-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <button className="bs-back" onClick={() => navigate('/dashboard')}>← Back</button>

        <div className="bs-animate" style={{ padding: '1rem 0 1.5rem' }}>
          <h1 className="bs-page-title">Resource Library</h1>
          <p className="bs-page-subtitle">Articles, exercises, and tools to support your journey</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.value} className={`bs-chip ${category === cat.value ? 'bs-chip-active' : ''}`} onClick={() => setCategory(cat.value)}>{cat.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <select className="bs-select" value={weekFilter} onChange={e => setWeekFilter(e.target.value)} style={{ width: 'auto', fontSize: '0.84rem', padding: '0.45rem 0.75rem' }}>
            <option value="all">All weeks</option>
            {[1,2,3,4].map(w => <option key={w} value={w}>Week {w}</option>)}
          </select>
          <button className={`bs-chip ${showBookmarked ? 'bs-chip-active' : ''}`} onClick={() => setShowBookmarked(!showBookmarked)}>⭐ Saved</button>
        </div>

        {/* Resources */}
        {displayed.length === 0 ? (
          <div className="bs-empty">
            <div className="bs-empty-icon">📚</div>
            <p className="bs-empty-text">{showBookmarked ? 'No saved resources yet.' : 'No resources found.'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {displayed.map((resource, i) => {
              const meta = TYPE_META[resource.resource_type] || TYPE_META.article;
              const saved = isBookmarked(resource);
              return (
                <div key={resource.id} className={`bs-animate bs-animate-delay-${Math.min(i+1,4)}`} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.25rem',
                  border: '1px solid var(--color-warm-dark)', transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                    background: 'var(--color-warm)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0,
                  }}>{meta.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text)', marginBottom: '0.2rem' }}>{resource.title}</h3>
                    {resource.description && <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{resource.description}</p>}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="bs-pill bs-pill-warm">{meta.label}</span>
                      {resource.category && <span className="bs-pill bs-pill-warm" style={{ textTransform: 'capitalize' }}>{resource.category.replace('_',' ')}</span>}
                      {resource.week_number && <span className="bs-pill bs-pill-blue">Week {resource.week_number}</span>}
                      {resource.reading_time_minutes && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{resource.reading_time_minutes} min</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => handleBookmark(resource.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'transform 0.2s' }} title={saved ? 'Remove bookmark' : 'Bookmark'}>
                      {saved ? '⭐' : '☆'}
                    </button>
                    {resource.url && (
                      <button onClick={() => handleView(resource)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-sage)' }} title="Open">↗</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
