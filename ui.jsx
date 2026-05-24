// ui.jsx — Shared UI primitives: Logo, Photo, Eyebrow, RouteLink, etc.

// ─────────── Logo (refreshed wordmark + ember mark) ───────────
function Logo({ size = 28, color, mark = true }) {
  // OCHAG wordmark in Newsreader serif + a small "ember" dot in terracotta.
  // The mark sits above the C as a tiny diamond/spark — keeps the artisan IG
  // vibe but adds a structural design element.
  const c = color || 'currentColor';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 0,
      fontFamily: 'var(--ff-display)', fontWeight: 600,
      fontSize: size, lineHeight: 1, color: c, letterSpacing: '-0.005em',
      position: 'relative',
    }}>
      {mark && (
        <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24"
             style={{ marginRight: size * 0.22, transform: 'translateY(-1px)' }}>
          {/* tiny stylised flame — three teardrops */}
          <path d="M12 2 C 8 7, 6 11, 8 15 C 9.5 18, 14.5 18, 16 15 C 18 11, 16 7, 12 2 Z"
                fill="var(--terra)" />
          <path d="M12 7 C 10.5 10, 10 12, 11 14 C 12 15.5, 14 15.5, 13.5 13 C 13 11, 13.5 9, 12 7 Z"
                fill="var(--ember)" />
        </svg>
      )}
      <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <span style={{ letterSpacing: '0.01em' }}>OCHAG</span>
      </span>
    </div>
  );
}

// ─────────── Photo placeholder ───────────
// `tone` = paper | ink | terra | wine | olive | mustard | rose
// `ratio` = "4/5", "1/1", "16/9", "3/4", etc
// `src` = if provided, renders an actual image covering the container (label/tag still shown if no src present)
function Photo({ label, tone = 'paper', ratio = '4/5', tag, src, alt, children, style = {}, className = '' }) {
  // If we have a real image, render it as a clean image container — no stripes.
  if (src) {
    return (
      <div className={className} style={{
        aspectRatio: ratio,
        borderRadius: 'var(--r)',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg-paper-2)',
        border: '1px solid var(--line)',
        ...style,
      }}>
        <img src={src} alt={alt || label || ''} loading="lazy"
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {tag && <div className="photo-tag">{tag}</div>}
      </div>
    );
  }
  const toneClass = tone === 'ink' ? 'photo photo-ink'
                  : tone === 'terra' ? 'photo photo-terra'
                  : 'photo';
  const bgOverride = ({
    wine:    { background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 14px, rgba(255,255,255,0.03) 14px 28px), var(--wine)', color: '#F6EFDC', borderColor: 'rgba(255,255,255,0.16)' },
    olive:   { background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 14px, rgba(255,255,255,0.03) 14px 28px), var(--olive)', color: '#F6EFDC', borderColor: 'rgba(255,255,255,0.16)' },
    mustard: { background: 'repeating-linear-gradient(135deg, rgba(34,25,17,0.10) 0 14px, rgba(34,25,17,0.04) 14px 28px), var(--mustard)', color: '#3A2A0A', borderColor: 'rgba(34,25,17,0.14)' },
    rose:    { background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 14px, rgba(255,255,255,0.04) 14px 28px), var(--rose)', color: '#3A1A14', borderColor: 'rgba(34,25,17,0.10)' },
  })[tone] || {};
  return (
    <div className={`${toneClass} ${className}`} style={{ aspectRatio: ratio, ...bgOverride, ...style }}>
      {tag && <div className="photo-tag">{tag}</div>}
      {children || (label && <span>{label}</span>)}
    </div>
  );
}

// ─────────── Eyebrow with line + dot ───────────
function Eyebrow({ children, line = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      {line && <span style={{ width: 24, height: 1, background: 'var(--terra)' }} />}
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terra)' }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

// ─────────── Sectioned hairline ───────────
function HRule({ label }) {
  if (!label) return <div className="divider" />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div className="divider" style={{ flex: 1 }} />
      <span className="label-mono">{label}</span>
      <div className="divider" style={{ flex: 1 }} />
    </div>
  );
}

// ─────────── Star rating ───────────
function Stars({ rating = 5, size = 14, color }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }} aria-label={`${rating} of 5`}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14">
          <path d="M7 1.2 L8.5 5 L12.7 5.2 L9.4 7.8 L10.5 11.8 L7 9.6 L3.5 11.8 L4.6 7.8 L1.3 5.2 L5.5 5 Z"
                fill={i < rating ? (color || 'var(--terra)') : 'rgba(34,25,17,0.18)'} />
        </svg>
      ))}
    </div>
  );
}

// ─────────── Chip ───────────
function Chip({ tone, children, dot = false }) {
  const cls = tone === 'terra' ? 'chip chip-terra'
            : tone === 'olive' ? 'chip chip-olive'
            : tone === 'mustard' ? 'chip chip-mustard'
            : tone === 'paper' ? 'chip chip-paper'
            : 'chip';
  return <span className={cls + (dot ? ' chip-dot' : '')}>{children}</span>;
}

// ─────────── Icons ───────────
const Icons = {
  arrowRight: (s=16) => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M2 8 L13 8 M8 3 L13 8 L8 13" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  arrowDown: (s=16) => <svg width={s} height={s} viewBox="0 0 16 16"><path d="M8 2 L8 13 M3 8 L8 13 L13 8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  plus: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 2 V12 M2 7 H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  minus: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M2 7 H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  close: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  check: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M3 7 L6 10 L11 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  cart: (s=20) => <svg width={s} height={s} viewBox="0 0 20 20"><path d="M3 4 H5 L6.5 13 H16 L17.5 6.5 H6.2 M8 16.5 A1 1 0 1 1 8 16.6 M15 16.5 A1 1 0 1 1 15 16.6" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  user: (s=20) => <svg width={s} height={s} viewBox="0 0 20 20"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.3" fill="none" /><path d="M3 18 C 3 13, 17 13, 17 18" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>,
  menu: (s=20) => <svg width={s} height={s} viewBox="0 0 20 20"><path d="M3 6 H17 M3 10 H17 M3 14 H17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  search: (s=16) => <svg width={s} height={s} viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" fill="none" /><path d="M10.3 10.3 L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  star: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 1.2 L8.5 5 L12.7 5.2 L9.4 7.8 L10.5 11.8 L7 9.6 L3.5 11.8 L4.6 7.8 L1.3 5.2 L5.5 5 Z" fill="currentColor" /></svg>,
  leaf: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M2 12 C 2 6, 6 2, 12 2 C 12 8, 8 12, 2 12 Z M2 12 L8 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  flame: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 1 C 5 4, 4 6, 5 8 C 5.5 9.5, 8.5 9.5, 9 8 C 10 6, 9 4, 7 1 Z M7 4.5 C 6.5 6, 6.5 7, 7 7.5 C 7.5 7, 7.5 6, 7 4.5 Z" fill="currentColor" /></svg>,
  clock: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M7 3.5 V7 L9.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" /></svg>,
  pin: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><path d="M7 1 C 4 1, 2 3, 2 6 C 2 9, 7 13, 7 13 C 7 13, 12 9, 12 6 C 12 3, 10 1, 7 1 Z" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="7" cy="6" r="1.5" fill="currentColor" /></svg>,
  scale: (s=14) => <svg width={s} height={s} viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M7 2 V7 L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  truck: (s=14) => <svg width={s} height={s} viewBox="0 0 16 14"><rect x="1" y="3" width="9" height="7" stroke="currentColor" strokeWidth="1.2" fill="none" rx="0.5" /><path d="M10 5 H13 L15 7.5 V10 H10 Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" /><circle cx="4" cy="11" r="1.3" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="12" cy="11" r="1.3" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>,
};

// ─────────── Stat block ───────────
function Stat({ value, label, accent = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="num" style={{
        fontSize: 40, color: accent ? 'var(--terra)' : 'var(--ink)',
        lineHeight: 1, letterSpacing: '-0.02em',
      }}>{value}</span>
      <span className="meta" style={{ maxWidth: 180 }}>{label}</span>
    </div>
  );
}

// ─────────── Router link ───────────
function RouteLink({ to, children, className, style, onClick }) {
  return (
    <a href={`#/${to}`} className={className} style={style}
       onClick={(e) => { e.preventDefault(); window.location.hash = `#/${to}`; onClick && onClick(e); }}>
      {children}
    </a>
  );
}

// ─────────── KBJU bar (protein / fat / carb) ───────────
function KbjuBar({ p, f, c, height = 6 }) {
  const total = p + f + c;
  const pp = (p / total) * 100;
  const fp = (f / total) * 100;
  const cp = (c / total) * 100;
  return (
    <div style={{ display: 'flex', height, borderRadius: 999, overflow: 'hidden',
                  background: 'rgba(34,25,17,0.08)' }}>
      <div style={{ width: `${pp}%`, background: 'var(--olive)' }} />
      <div style={{ width: `${fp}%`, background: 'var(--mustard)' }} />
      <div style={{ width: `${cp}%`, background: 'var(--terra)' }} />
    </div>
  );
}

Object.assign(window, {
  Logo, Photo, Eyebrow, HRule, Stars, Chip, Icons, Stat, RouteLink, KbjuBar,
});