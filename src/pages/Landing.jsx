const C = {
  cream:      '#FAF7F2',
  sand:       '#F2EDE5',
  warmWhite:  '#FFFCF8',
  sage:       '#6B8F71',
  sageLight:  '#E4EDE5',
  sagePale:   '#F0F5F0',
  terracotta: '#C4705A',
  terraLight: '#FAEAE5',
  sky:        '#7CAEC4',
  skyLight:   '#E5F0F5',
  honey:      '#D4A854',
  honeyLight: '#FBF3E0',
  ink:        '#1A1A1A',
  body:       '#5C5C5C',
  muted:      '#9C9890',
  light:      '#D4CFC8',
  divider:    'rgba(0,0,0,0.05)',
};

const SERIF = "'Fraunces', Georgia, serif";
const SANS  = "'Outfit', system-ui, sans-serif";

const IMG = {
  sprout:     'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center',
  lavender:   'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=200&h=200&fit=crop&crop=center',
  wildflower: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200&h=200&fit=crop&crop=center',
  monstera:   'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=200&h=200&fit=crop&crop=center',
  fern:       'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=200&h=200&fit=crop&crop=center',
  daisy:      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop&crop=center',
  eucalyptus: 'https://images.unsplash.com/photo-1470058869958-2a77e919978d?w=200&h=200&fit=crop&crop=center',
};

/* ── Tiny Components ────────────────────────────────────── */

function Photo({ src, size = 40, radius = '50%', shadow = false, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        flexShrink: 0,
        background: C.sand,
        boxShadow: shadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        ...style,
      }}
    >
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function Blob({ color = C.sageLight, style: s = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50% 40% 60% 50% / 50% 50% 40% 60%',
        background: color,
        opacity: 0.45,
        pointerEvents: 'none',
        ...s,
      }}
    />
  );
}

function LeafIcon({ s = 20, c = C.sage }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ArrowIcon({ s = 16, c = 'currentColor' }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const WEEKS = [
  { n: 1, title: 'Understanding You', time: '25 min', color: C.sage,      bg: C.sagePale,   photo: IMG.sprout },
  { n: 2, title: 'Tough Moments',     time: '30 min', color: C.terracotta, bg: C.terraLight, photo: IMG.lavender },
  { n: 3, title: 'Connection',        time: '30 min', color: C.sky,        bg: C.skyLight,   photo: IMG.wildflower },
  { n: 4, title: 'Resilience',        time: '30 min', color: C.honey,      bg: C.honeyLight, photo: IMG.monstera },
];

const FEATURES = [
  { photo: IMG.fern,       label: '20 min/week' },
  { photo: IMG.daisy,      label: 'Your choice' },
  { photo: IMG.wildflower, label: 'Family activities' },
  { photo: IMG.eucalyptus, label: 'No pressure' },
];

/* ══════════════════════════════════════════════════════════
   LANDING PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */

export default function Landing() {
  const handleSignup = () => {
    // Replace with your routing logic
    console.log('Navigate to signup');
  };

  const handleLogin = () => {
    // Replace with your routing logic
    console.log('Navigate to login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: SANS,
        background: C.cream,
        color: C.ink,
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <Blob color={C.sageLight} style={{ width: 400, height: 400, top: -100, right: -150 }} />
      <Blob color={C.terraLight} style={{ width: 300, height: 300, bottom: '20%', left: -100 }} />

      {/* ── Nav ───────────────────────────────────────── */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 28px',
          maxWidth: 1000,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LeafIcon s={22} />
          <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600 }}>
            Breathing Space
          </span>
        </div>
        <button
          onClick={handleSignup}
          style={{
            padding: '10px 22px',
            background: C.sage,
            color: '#fff',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: SANS,
          }}
        >
          Start free
        </button>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: 'clamp(48px, 10vh, 100px) 28px 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Photo src={IMG.sprout} size={22} />
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.sage,
                letterSpacing: '0.12em',
              }}
            >
              4-WEEK PROGRAMME FOR PARENTS
            </p>
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}
          >
            A gentle space
            <br />
            to <em style={{ fontStyle: 'italic', color: C.sage }}>breathe</em>.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: C.body,
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 380,
            }}
          >
            Your pace. Your choice. No pressure. Just support when you need it.
          </p>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={handleSignup}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                background: C.sage,
                color: '#fff',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: SANS,
              }}
            >
              Begin <ArrowIcon s={16} c="#fff" />
            </button>
            <button
              onClick={handleLogin}
              style={{
                padding: '14px 24px',
                background: 'transparent',
                color: C.body,
                fontSize: 15,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                fontFamily: SANS,
                textDecoration: 'underline',
                textDecorationColor: C.light,
                textUnderlineOffset: 3,
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* ── Week Cards (centered) ─────────────────────── */}
      <div
        style={{
          padding: '0 28px 64px',
          maxWidth: 1000,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {WEEKS.map((w) => (
            <div
              key={w.n}
              style={{
                minWidth: 155,
                background: w.bg,
                borderRadius: 20,
                padding: '24px 18px',
                flexShrink: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Photo src={w.photo} size={56} radius={16} shadow />
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: w.color,
                  letterSpacing: '0.06em',
                  marginTop: 14,
                }}
              >
                WEEK {w.n}
              </p>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  fontWeight: 500,
                  color: C.ink,
                  marginTop: 4,
                }}
              >
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ──────────────────────────────────── */}
      <div
        style={{
          background: C.warmWhite,
          padding: '64px 28px',
          borderTop: `1px solid ${C.divider}`,
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 32,
            textAlign: 'center',
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Photo src={f.photo} size={44} shadow />
              <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginTop: 10 }}>
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Footer ────────────────────────────────── */}
      <div style={{ padding: '64px 28px', textAlign: 'center', position: 'relative' }}>
        <Blob
          color={C.sageLight}
          style={{
            width: 250,
            height: 250,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 14,
            position: 'relative',
          }}
        >
          <Photo src={IMG.monstera} size={56} shadow />
        </div>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 28,
            fontWeight: 400,
            color: C.ink,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          Ready to start?
        </p>
        <button
          onClick={handleSignup}
          style={{
            padding: '14px 32px',
            background: C.sage,
            color: '#fff',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: SANS,
            position: 'relative',
          }}
        >
          Begin your journey
        </button>
      </div>
    </div>
  );
}
