// home.jsx — Home screen: hero, configurator, week menu, how-it-works, testimonials

function HomeScreen({ tweaks, addToCart }) {
  const { t, lang } = useI18n();

  return (
    <main>
      <Hero variant={tweaks.heroVariant} />
      <RationConfigurator variant={tweaks.cfgVariant} addToCart={addToCart} />
      <WeekMenu />
      <HowItWorks />
      <TrustBlock />
    </main>
  );
}

// ─────────────────────────── HERO ───────────────────────────
function Hero({ variant = 'editorial' }) {
  const { t, lang } = useI18n();

  if (variant === 'typographic') return <HeroTypographic />;
  if (variant === 'split') return <HeroSplit />;

  // Default: editorial — clean: title on the left, single full photo on the right.
  return (
    <section style={{ paddingTop: 40, paddingBottom: 72, position: 'relative' }}>
      <div className="container-wide">
        <div className="r-hero" style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
          gap: 56, alignItems: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>

            <h1 className="display" style={{
              fontSize: 'clamp(56px, 7.6vw, 132px)',
              margin: '32px 0 32px',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              fontWeight: 500,
            }}>
              {t('hero.title.1')}{' '}
              <em className="display-italic" style={{
                color: 'var(--terra)',
                fontWeight: 400,
              }}>{t('hero.title.2')}</em>
              <br />
              {t('hero.title.3')}.
            </h1>

            <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
              <a href="#configurator" className="btn btn-primary btn-lg"
                 onClick={(e) => { e.preventDefault(); document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' }); }}>
                {t('hero.cta.primary')} {Icons.arrowRight(14)}
              </a>
              <RouteLink to="menu" className="btn btn-ghost btn-lg">
                {t('hero.cta.secondary')}
              </RouteLink>
            </div>
          </div>

          {/* Right: one big photo */}
          <Photo src="images/hero-salmon-bowl.jpg" ratio="4/5"
                 alt="Боул с лососем — OCHAG" />
        </div>
      </div>
    </section>
  );
}

function HeroTypographic() {
  const { t } = useI18n();
  return (
    <section style={{ paddingTop: 48, paddingBottom: 56 }}>
      <div className="container">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <h1 className="display" style={{
          fontSize: 'clamp(64px, 14vw, 220px)',
          margin: '32px 0 0', lineHeight: 0.88,
          letterSpacing: '-0.035em', fontWeight: 500,
        }}>
          {t('hero.title.1')}{' '}<em className="display-italic" style={{ color: 'var(--terra)' }}>{t('hero.title.2')}</em>{' '}{t('hero.title.3')}.
        </h1>

        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24,
          alignItems: 'end',
        }}>
          <p className="body-lg" style={{ color: 'var(--ink-2)', maxWidth: 420 }}>
            {t('hero.lede')}
          </p>
          <Photo tone="terra" ratio="3/4" tag="HERO" label="главное фото — боул в керамике" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <a href="#configurator" className="btn btn-primary btn-lg">
              {t('hero.cta.primary')} {Icons.arrowRight(14)}
            </a>
            <RouteLink to="menu" className="btn btn-ghost btn-lg">
              {t('hero.cta.secondary')}
            </RouteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplit() {
  const { t } = useI18n();
  return (
    <section style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                      borderRadius: 24, overflow: 'hidden',
                      background: 'var(--bg-deep)', color: 'var(--ink-paper)' }}>
          <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 640 }}>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <div>
              <h1 className="display" style={{
                fontSize: 'clamp(48px, 5.6vw, 96px)',
                color: 'var(--ink-paper)',
                margin: '32px 0 24px', lineHeight: 0.96,
                fontWeight: 500,
              }}>
                {t('hero.title.1')}{' '}<em className="display-italic" style={{ color: 'var(--terra)' }}>{t('hero.title.2')}</em>{' '}{t('hero.title.3')}.
              </h1>
              <p className="body-lg" style={{ color: 'var(--ink-paper-2)', maxWidth: 480 }}>
                {t('hero.lede')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#configurator" className="btn btn-primary btn-lg">
                {t('hero.cta.primary')} {Icons.arrowRight(14)}
              </a>
              <RouteLink to="menu" className="btn btn-lg" style={{
                background: 'transparent', color: 'var(--ink-paper)',
                border: '1px solid var(--line-paper)',
              }}>
                {t('hero.cta.secondary')}
              </RouteLink>
            </div>
          </div>
          <Photo tone="terra" tag="HERO · FULL" ratio="auto"
                 label="фото боула / полноразмерное"
                 style={{ height: '100%', borderRadius: 0 }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── RIBBON / FEATURE STRIP ───────────────────────────
function Ribbon() {
  const { t } = useI18n();
  const items = [
    { icon: Icons.truck(16), label: t('ribbon.delivery') },
    { icon: Icons.flame(14), label: t('ribbon.fresh') },
    { icon: Icons.scale(14), label: t('ribbon.kbju') },
    { icon: Icons.leaf(14),  label: t('ribbon.local') },
  ];
  return (
    <section style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          border: '1px solid var(--line)',
          borderRadius: 999,
          background: 'var(--bg-paper)',
          padding: '6px',
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 22px',
              borderRight: i < items.length - 1 ? '1px solid var(--line)' : '0',
              fontSize: 13.5,
            }}>
              <span style={{ color: 'var(--terra)', display: 'inline-flex' }}>{it.icon}</span>
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── CONFIGURATOR ───────────────────────────
// Short day labels per locale (Mon-first index 0..6)
const DAY_LABELS_SHORT = {
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ge: ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'],
};

function RationConfigurator({ variant = 'cards', addToCart }) {
  const { t, lang } = useI18n();
  const [kcal, setKcal] = React.useState(2200);
  const [days, setDays] = React.useState(14);
  // excludedDays: array of day indices (0=Mon .. 6=Sun) to skip
  const [excludedDays, setExcludedDays] = React.useState([]);

  const kcalOpt = KCAL_OPTIONS.find(k => k.id === kcal);
  const durOpt = DURATION_OPTIONS.find(d => d.days === days);
  const pricePerDay = PRICE_PER_DAY[kcal];
  const subtotal = pricePerDay * days;
  const discountRaw = subtotal * (durOpt.discount || 0);
  const discount = Math.round(discountRaw);
  const delivery = durOpt.delivery;
  const total = Math.round(subtotal - discountRaw + delivery);

  // Calendar-days math when some weekdays are skipped:
  // each delivered "block" of (7 - excluded.length) weekdays takes 7 calendar days
  const skippedCount = excludedDays.length;
  const calendarDays = skippedCount > 0
    ? days + Math.floor((days - 1) / Math.max(1, 7 - skippedCount)) * skippedCount
    : days;

  const toggleDay = (idx) => {
    setExcludedDays((curr) => {
      if (curr.includes(idx)) return curr.filter(d => d !== idx);
      // Don't allow excluding ALL 7 days
      if (curr.length >= 6) return curr;
      return [...curr, idx].sort((a, b) => a - b);
    });
  };

  const placeOrder = () => {
    const skipLabels = excludedDays.map(i => DAY_LABELS_SHORT[lang === 'ge' ? 'ge' : (lang === 'en' ? 'en' : 'ru')][i]);
    const suffix = skipLabels.length > 0 ? ` (${t('cfg.days.skip').toLowerCase()}: ${skipLabels.join(', ')})` : '';
    addToCart({
      type: 'ration',
      id: `ration-${kcal}-${days}${excludedDays.length ? '-skip-' + excludedDays.join('') : ''}`,
      name: `${kcalOpt.id} ккал × ${days} ${pluralDays(days, lang)}${suffix}`,
      price: total, qty: 1,
      meta: { kcal, days, excludedDays, calendarDays },
    });
    window.location.hash = '#/cart';
  };

  return (
    <section id="configurator" style={{ paddingTop: 80, paddingBottom: 80, position: 'relative' }}>
      <div className="container">

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <Eyebrow>{t('cfg.eyebrow')}</Eyebrow>
          <h2 className="display r-hero-title" style={{
            fontSize: 'clamp(40px, 5.6vw, 84px)',
            margin: '20px 0 0', lineHeight: 0.96, fontWeight: 500,
          }}>
            {t('cfg.title.a')}{' '}
            <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('cfg.title.b')}</em>.
          </h2>
        </div>

        {variant === 'dial' ? (
          <ConfiguratorDial kcal={kcal} setKcal={setKcal} days={days} setDays={setDays}
                            kcalOpt={kcalOpt} durOpt={durOpt}
                            excludedDays={excludedDays} toggleDay={toggleDay} calendarDays={calendarDays}
                            subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                            onSubmit={placeOrder} />
        ) : variant === 'form' ? (
          <ConfiguratorForm kcal={kcal} setKcal={setKcal} days={days} setDays={setDays}
                            kcalOpt={kcalOpt} durOpt={durOpt}
                            excludedDays={excludedDays} toggleDay={toggleDay} calendarDays={calendarDays}
                            subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                            onSubmit={placeOrder} />
        ) : (
          <ConfiguratorCards kcal={kcal} setKcal={setKcal} days={days} setDays={setDays}
                             kcalOpt={kcalOpt} durOpt={durOpt}
                             excludedDays={excludedDays} toggleDay={toggleDay} calendarDays={calendarDays}
                             subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                             onSubmit={placeOrder} />
        )}
      </div>
    </section>
  );
}

function pluralDays(n, lang) {
  if (lang === 'en') return n === 1 ? 'day' : 'days';
  if (lang === 'ge') return 'დღე';
  if (n === 1) return 'день';
  if (n >= 2 && n <= 4) return 'дня';
  return 'дней';
}

// ─── Cards variant (default) ───────────────────────────────────────────────
function ConfiguratorCards({ kcal, setKcal, days, setDays, kcalOpt, durOpt, excludedDays, toggleDay, calendarDays, subtotal, discount, delivery, total, onSubmit }) {
  const { t, lang } = useI18n();
  const dayLabels = DAY_LABELS_SHORT[lang === 'ge' ? 'ge' : (lang === 'en' ? 'en' : 'ru')];

  return (
    <div className="r-cfg" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>

      {/* Left column: steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Step 1: kcal */}
        <StepShell number="01" title={t('cfg.step.1')}>
          <div className="r-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {KCAL_OPTIONS.map(k => {
              const active = k.id === kcal;
              const accent = ({
                olive: 'var(--olive)', terra: 'var(--terra)', wine: 'var(--wine)',
              })[k.color];
              return (
                <button key={k.id} onClick={() => setKcal(k.id)}
                  style={{
                    textAlign: 'left', padding: 22, borderRadius: 20,
                    background: active ? accent : 'var(--bg-paper-2)',
                    color: active ? '#F6EFDC' : 'var(--ink)',
                    border: active ? '1px solid transparent' : '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'background .15s, color .15s, transform .15s',
                    position: 'relative', overflow: 'hidden',
                  }}>
                  <div className="num" style={{
                    fontSize: 44, lineHeight: 1, fontWeight: 500,
                    letterSpacing: '-0.02em', marginBottom: 8,
                  }}>{k.id}</div>
                  <div className="label-mono" style={{
                    color: active ? 'rgba(255,255,255,0.7)' : 'var(--ink-3)',
                    marginBottom: 16,
                  }}>{t('cfg.kcal.unit')}</div>
                  <div style={{
                    fontFamily: 'var(--ff-display)', fontSize: 22,
                    color: active ? '#F6EFDC' : 'var(--ink)',
                    lineHeight: 1.1, marginBottom: 4,
                  }}>{t(`cfg.kcal.${k.id}.label`)}</div>
                  <div className="meta" style={{
                    color: active ? 'rgba(255,255,255,0.65)' : 'var(--ink-2)',
                  }}>{t(`cfg.kcal.${k.id}.sub`)}</div>
                </button>
              );
            })}
          </div>
        </StepShell>

        {/* Step 2: duration */}
        <StepShell number="02" title={t('cfg.step.2')}>
          <div className="r-6dur" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {DURATION_OPTIONS.map(d => {
              const active = d.days === days;
              const savePct = Math.round(d.discount * 100);
              return (
                <button key={d.days} onClick={() => setDays(d.days)}
                  style={{
                    position: 'relative',
                    padding: '18px 12px 14px',
                    borderRadius: 14,
                    background: active ? 'var(--ink)' : 'var(--bg-paper-2)',
                    color: active ? 'var(--bg-paper)' : 'var(--ink)',
                    border: active ? '1px solid transparent' : '1px solid var(--line)',
                    cursor: 'pointer', textAlign: 'center',
                  }}>
                  <div className="num" style={{ fontSize: 28, lineHeight: 1, fontWeight: 500 }}>
                    {d.days}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6,
                                color: active ? 'rgba(255,255,255,0.72)' : 'var(--ink-2)',
                                letterSpacing: '0.04em' }}>
                    {pluralDays(d.days, lang)}
                  </div>
                  {savePct > 0 && (
                    <div style={{
                      position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--terra)', color: '#F6EFDC',
                      padding: '2px 8px', borderRadius: 999,
                      fontSize: 10, fontFamily: 'var(--ff-mono)',
                      letterSpacing: '0.06em',
                    }}>
                      −{savePct}%
                    </div>
                  )}
                  {d.popular && !active && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--terra)',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12,
                        fontSize: 13, color: 'var(--ink-2)' }}>
            {Icons.truck(14)}
            <span>{durOpt.delivery > 0 ? t('cfg.duration.delivery.paid') : t('cfg.duration.delivery.free')}</span>
          </div>

          {/* Day picker — exclude specific days of the week */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px dashed var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <span className="label-mono">{t('cfg.days.label')}</span>
              <span className="meta" style={{ color: 'var(--ink-3)', fontSize: 12 }}>{t('cfg.days.sub')}</span>
            </div>
            <div className="r-daypicker" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {dayLabels.map((label, idx) => {
                const skipped = excludedDays.includes(idx);
                const isWeekend = idx === 5 || idx === 6;
                return (
                  <button key={idx} onClick={() => toggleDay(idx)}
                    style={{
                      position: 'relative',
                      padding: '12px 6px', borderRadius: 12,
                      background: skipped ? 'transparent' : (isWeekend ? 'rgba(194,83,42,0.10)' : 'var(--bg-paper-2)'),
                      border: '1px solid',
                      borderColor: skipped ? 'var(--line)' : (isWeekend ? 'rgba(194,83,42,0.32)' : 'var(--line-2)'),
                      color: skipped ? 'var(--ink-3)' : 'var(--ink)',
                      cursor: 'pointer',
                      fontFamily: 'var(--ff-mono)', fontSize: 12, fontWeight: 500,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      textDecoration: skipped ? 'line-through' : 'none',
                      textDecorationColor: skipped ? 'var(--terra)' : 'transparent',
                      textDecorationThickness: '1.5px',
                      transition: 'background .12s, color .12s, border-color .12s',
                    }}>
                    {label}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10,
                          fontSize: 13, color: 'var(--ink-2)', flexWrap: 'wrap' }}>
              {excludedDays.length === 0 ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                  {t('cfg.days.delivering')}
                </span>
              ) : (
                <>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terra)' }} />
                    <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>{t('cfg.days.skip')}:</strong>
                    {excludedDays.map(i => dayLabels[i]).join(', ')}
                  </span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span>{days} × {t('common.day')} · ≈ {calendarDays} {t('cfg.weekends.calendar')}</span>
                </>
              )}
            </div>
          </div>
        </StepShell>
      </div>

      {/* Right column: summary */}
      <ConfiguratorSummary kcal={kcal} kcalOpt={kcalOpt} days={days} durOpt={durOpt}
                          excludedDays={excludedDays} calendarDays={calendarDays}
                          subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                          onSubmit={onSubmit} />
    </div>
  );
}

// ─── Dial variant (the "hearth dial") ─────────────────────────────────────
function ConfiguratorDial({ kcal, setKcal, days, setDays, kcalOpt, durOpt, excludedDays, toggleDay, calendarDays, subtotal, discount, delivery, total, onSubmit }) {
  const { t, lang } = useI18n();
  // Dial: SVG knob — rotating selects kcal tier
  const idx = KCAL_OPTIONS.findIndex(k => k.id === kcal);
  const angle = -60 + (idx * 60); // -60, 0, 60
  const tickAngles = [-60, 0, 60];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div className="card" style={{ padding: 40, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <span className="label-mono">{t('cfg.step.1')}</span>
          <span className="meta">{t('cfg.kcal.meals')}</span>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', margin: '24px auto', maxWidth: 420 }}>
          {/* outer dial */}
          <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="dialBg" cx="50%" cy="50%">
                <stop offset="60%" stopColor="var(--bg-paper-2)" />
                <stop offset="100%" stopColor="var(--bg-paper)" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#dialBg)" stroke="var(--line-2)" strokeWidth="1" />
            <circle cx="200" cy="200" r="155" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 6" />
            {/* tick marks */}
            {tickAngles.map((a, i) => {
              const rad = (a - 90) * Math.PI / 180;
              const x1 = 200 + Math.cos(rad) * 168;
              const y1 = 200 + Math.sin(rad) * 168;
              const x2 = 200 + Math.cos(rad) * 180;
              const y2 = 200 + Math.sin(rad) * 180;
              const tx = 200 + Math.cos(rad) * 145;
              const ty = 200 + Math.sin(rad) * 145 + 5;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={i === idx ? 'var(--terra)' : 'var(--ink-2)'}
                        strokeWidth={i === idx ? 3 : 1} />
                  <text x={tx} y={ty} textAnchor="middle"
                        fontFamily="var(--ff-mono)" fontSize="13"
                        fill={i === idx ? 'var(--terra)' : 'var(--ink-2)'}
                        fontWeight={i === idx ? 600 : 400}>
                    {KCAL_OPTIONS[i].id}
                  </text>
                </g>
              );
            })}
            {/* knob */}
            <g transform={`rotate(${angle} 200 200)`}>
              <circle cx="200" cy="200" r="100" fill="var(--terra)" stroke="var(--terra-deep)" strokeWidth="1" />
              <circle cx="200" cy="200" r="100" fill="url(#dialBg)" opacity="0.05" />
              <line x1="200" y1="200" x2="200" y2="118" stroke="#F6EFDC" strokeWidth="3" strokeLinecap="round" />
              <circle cx="200" cy="118" r="6" fill="#F6EFDC" />
            </g>
            {/* center label */}
            <text x="200" y="218" textAnchor="middle"
                  fontFamily="var(--ff-display)" fontSize="22" fill="#F6EFDC" fontWeight="500">
              {t(`cfg.kcal.${kcal}.label`)}
            </text>
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {KCAL_OPTIONS.map(k => (
            <button key={k.id} onClick={() => setKcal(k.id)}
              className={k.id === kcal ? 'btn btn-ink btn-sm' : 'btn btn-paper btn-sm'}
              style={{ flex: 1 }}>
              {k.id}
            </button>
          ))}
        </div>
      </div>

      <ConfiguratorSummary kcal={kcal} kcalOpt={kcalOpt} days={days} durOpt={durOpt}
                          excludedDays={excludedDays} toggleDay={toggleDay} calendarDays={calendarDays}
                          subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                          onSubmit={onSubmit}
                          showDuration setDays={setDays} showDayPicker />
    </div>
  );
}

// ─── Compact form variant ────────────────────────────────────────────────
function ConfiguratorForm({ kcal, setKcal, days, setDays, kcalOpt, durOpt, excludedDays, toggleDay, calendarDays, subtotal, discount, delivery, total, onSubmit }) {
  const { t, lang } = useI18n();
  return (
    <div className="card" style={{ padding: 32, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <span className="field-label">{t('cfg.step.1')}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {KCAL_OPTIONS.map(k => (
              <button key={k.id} onClick={() => setKcal(k.id)}
                className={kcal === k.id ? 'btn btn-ink' : 'btn btn-paper'} style={{ flex: 1, height: 56 }}>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                  <span className="num" style={{ fontSize: 20 }}>{k.id}</span>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>{t(`cfg.kcal.${k.id}.label`)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="field-label">{t('cfg.step.2')}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {DURATION_OPTIONS.map(d => (
              <button key={d.days} onClick={() => setDays(d.days)}
                style={{
                  padding: '14px 0',
                  borderRadius: 10,
                  background: d.days === days ? 'var(--ink)' : 'var(--bg-paper-2)',
                  color: d.days === days ? 'var(--bg-paper)' : 'var(--ink)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                }}>
                <span className="num" style={{ fontSize: 16 }}>{d.days}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <ConfiguratorSummary kcal={kcal} kcalOpt={kcalOpt} days={days} durOpt={durOpt}
                          excludedDays={excludedDays} toggleDay={toggleDay} calendarDays={calendarDays}
                          subtotal={subtotal} discount={discount} delivery={delivery} total={total}
                          onSubmit={onSubmit} embedded showDayPicker />
    </div>
  );
}

// ─── Step shell wrapper ──────────────────────────────────────────────────
function StepShell({ number, title, children }) {
  return (
    <div className="card r-step" style={{ padding: 28, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span className="num" style={{
          fontSize: 12, color: 'var(--terra)', letterSpacing: '0.16em',
          fontFamily: 'var(--ff-mono)', fontWeight: 500,
        }}>{number}</span>
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <span className="label-mono">{title}</span>
      </div>
      {children}
    </div>
  );
}

// ─── Summary card (shared) ───────────────────────────────────────────────
function ConfiguratorSummary({ kcal, kcalOpt, days, durOpt, excludedDays = [], toggleDay, calendarDays, subtotal, discount, delivery, total, onSubmit, embedded = false, showDuration = false, setDays, showDayPicker = false }) {
  const { t, lang } = useI18n();
  const dayLabels = DAY_LABELS_SHORT[lang === 'ge' ? 'ge' : (lang === 'en' ? 'en' : 'ru')];

  const card = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--terra)' }} />
        <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>{t('cfg.summary.title')}</span>
      </div>

      <div className="num" style={{
        fontSize: 88, lineHeight: 0.92, fontWeight: 500,
        color: 'var(--ink-paper)', letterSpacing: '-0.025em',
        marginTop: 20,
      }}>{total}<span style={{
        fontSize: 28, marginLeft: 6, color: 'var(--ink-paper-2)',
        fontFamily: 'var(--ff-display)', fontWeight: 400,
      }}>₾</span></div>
      <div className="meta" style={{ color: 'var(--ink-paper-2)' }}>
        {Math.round(total / days)} ₾ {t('cfg.summary.per_day')}
      </div>

      {showDuration && (
        <div style={{ marginTop: 28 }}>
          <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>{t('cfg.step.2')}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginTop: 10 }}>
            {DURATION_OPTIONS.map(d => (
              <button key={d.days} onClick={() => setDays(d.days)}
                style={{
                  padding: '12px 0',
                  borderRadius: 10,
                  background: d.days === days ? 'var(--terra)' : 'rgba(241,233,216,0.06)',
                  color: 'var(--ink-paper)',
                  border: '1px solid var(--line-paper)',
                  cursor: 'pointer',
                  fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 500,
                }}>
                {d.days}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{
        marginTop: 32, paddingTop: 24,
        borderTop: '1px solid var(--line-paper)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <SummaryRow label={`${kcal} ккал × ${days} ${pluralDays(days, lang)}`} value={`${subtotal} ₾`} />
        {discount > 0 && (
          <SummaryRow label={`${t('cfg.summary.discount')} −${Math.round((durOpt.discount || 0) * 100)}%`} value={`−${Math.round(discount)} ₾`} accent />
        )}
        <SummaryRow label={t('cart.delivery')} value={delivery > 0 ? `${delivery} ₾` : t('cart.delivery.free')} />
        {excludedDays.length > 0 && (
          <SummaryRow label={`${t('cfg.days.skip')}: ${excludedDays.map(i => dayLabels[i]).join(', ')}`}
                       value={`≈ ${calendarDays} ${t('cfg.weekends.calendar')}`} />
        )}
      </div>

      {/* Optional inline day picker (for dial/form variants) */}
      {showDayPicker && toggleDay && (
        <div style={{ marginTop: 18 }}>
          <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>{t('cfg.days.label')}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 10 }}>
            {dayLabels.map((label, idx) => {
              const skipped = excludedDays.includes(idx);
              return (
                <button key={idx} onClick={() => toggleDay(idx)}
                  style={{
                    padding: '8px 4px', borderRadius: 8,
                    background: skipped ? 'transparent' : 'rgba(241,233,216,0.08)',
                    border: '1px solid var(--line-paper)',
                    color: skipped ? 'var(--ink-paper-2)' : 'var(--ink-paper)',
                    cursor: 'pointer',
                    fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.04em',
                    textDecoration: skipped ? 'line-through' : 'none',
                    textDecorationColor: 'var(--terra)',
                  }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button onClick={onSubmit} className="btn btn-primary btn-lg" style={{ marginTop: 28, width: '100%', justifyContent: 'space-between' }}>
        <span>{t('cfg.summary.cta')}</span>
        {Icons.arrowRight(14)}
      </button>
      <p className="meta" style={{ color: 'var(--ink-paper-2)', textAlign: 'center', marginTop: 12, fontSize: 12 }}>
        {t('cfg.summary.start')} {t('cfg.summary.tomorrow')}
      </p>
    </>
  );

  return (
    <div className="card-ink r-summary-sticky r-summary" style={{
      background: embedded ? 'var(--bg-deep)' : 'var(--bg-deep)',
      color: 'var(--ink-paper)',
      borderRadius: embedded ? 16 : 20,
      padding: embedded ? 24 : 36,
      position: 'sticky', top: 100,
      alignSelf: 'start',
      height: 'fit-content',
    }}>
      {card}
    </div>
  );
}

function SummaryRow({ label, value, accent = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span style={{ color: 'var(--ink-paper-2)' }}>{label}</span>
      <span style={{ color: accent ? 'var(--terra)' : 'var(--ink-paper)', fontWeight: 500 }} className="tabular">{value}</span>
    </div>
  );
}

// ─────────────────────────── WEEK MENU ───────────────────────────
function WeekMenu() {
  const { t, lang } = useI18n();
  const dishKey = lang === 'ge' ? 'name_ge' : (lang === 'en' ? 'name_en' : 'name_ru');

  return (
    <section style={{ paddingTop: 80, paddingBottom: 80, background: 'var(--bg-paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 48 }}>
          <div>
            <Eyebrow>{t('week.eyebrow')}</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5.6vw, 84px)', margin: '20px 0 0', lineHeight: 0.96, fontWeight: 500 }}>
              {t('week.title.a')}{' '}
              <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('week.title.b')}</em>.
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
            <RouteLink to="menu" className="btn btn-paper">
              {t('week.viewall')} {Icons.arrowRight(14)}
            </RouteLink>
          </div>
        </div>

        {/* 7-day strip */}
        <div className="r-7col-wrap" style={{ position: 'relative' }}>
          <div className="r-7col" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
          {WEEK_MENU.map((day, di) => {
            const lead = DISHES.find(d => d.id === day.dishes[0]); // main dish
            const today = di === 0;
            return (
              <div key={day.day} style={{
                background: today ? 'var(--bg-deep)' : 'var(--bg-paper-2)',
                color: today ? 'var(--ink-paper)' : 'var(--ink)',
                borderRadius: 18,
                border: today ? '1px solid transparent' : '1px solid var(--line)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ padding: '14px 14px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="label-mono" style={{ color: today ? 'var(--ink-paper-2)' : 'var(--ink-2)' }}>
                    {t(`week.day.${day.day}`).slice(0, 3).toUpperCase()}
                  </span>
                  <span className="num" style={{ fontSize: 14, color: today ? 'var(--terra)' : 'var(--ink-2)' }}>
                    {di + 1}/7
                  </span>
                </div>
                <Photo tone={lead?.tone || 'paper'} ratio="1/1"
                       src={lead?.src}
                       label={lead?.[dishKey]}
                       style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0,
                                margin: '0 14px 12px' }} />
                <div style={{ padding: '0 14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>
                    {lead?.[dishKey]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Scroll affordance (mobile only): fade hint on the right edge */}
        <div className="r-scroll-fade r-show-mobile" aria-hidden="true" style={{
          position: 'absolute', top: 0, bottom: 12, right: 0,
          width: 56, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent, var(--bg-paper))',
        }} />
        {/* Scroll dots hint on mobile */}
        <div className="r-scroll-hint r-show-mobile" aria-hidden="true" style={{
          position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(34,25,17,0.06)',
          fontSize: 11, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em',
          color: 'var(--ink-2)',
        }}>
          ← swipe
        </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── HOW IT WORKS ───────────────────────────
function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { num: '01', title: t('how.s1.title'), body: t('how.s1.body'), icon: Icons.scale(20), tone: 'olive' },
    { num: '02', title: t('how.s2.title'), body: t('how.s2.body'), icon: Icons.flame(18), tone: 'terra' },
    { num: '03', title: t('how.s3.title'), body: t('how.s3.body'), icon: Icons.truck(18), tone: 'wine' },
  ];
  return (
    <section style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Eyebrow>{t('how.eyebrow')}</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.6vw, 84px)', margin: '20px 0 0', lineHeight: 0.96, fontWeight: 500 }}>
            {t('how.title.a')}{' '}
            <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('how.title.b')}</em>.
          </h2>
        </div>
        <div className="r-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{
              padding: 32, borderRadius: 24,
              background: s.tone === 'terra' ? 'var(--terra)' : (s.tone === 'wine' ? 'var(--wine)' : 'var(--olive)'),
              color: '#F6EFDC',
              minHeight: 280,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <span style={{
                  fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.16em',
                  color: 'rgba(246,239,230,0.7)',
                }}>{s.num}</span>
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1px solid rgba(246,239,230,0.35)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.icon}</span>
              </div>
              <div>
                <h3 className="display" style={{ fontSize: 30, margin: '0 0 12px', lineHeight: 1.05, fontWeight: 500 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(246,239,230,0.84)', margin: 0 }}>
                  {s.body}
                </p>
              </div>
              {/* Decorative number watermark */}
              <span style={{
                position: 'absolute',
                right: -20, bottom: -60,
                fontFamily: 'var(--ff-display)',
                fontSize: 260, lineHeight: 1, fontWeight: 500,
                color: 'rgba(255,255,255,0.06)',
                pointerEvents: 'none',
              }}>{s.num.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── TRUST BLOCK ───────────────────────────
function TrustBlock() {
  const { t, lang } = useI18n();
  const quoteKey = lang === 'ge' ? 'quote_ge' : (lang === 'en' ? 'quote_en' : 'quote_ru');

  return (
    <section style={{ paddingTop: 96, paddingBottom: 120, background: 'var(--bg-paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 900 }}>
          <Eyebrow>{t('trust.eyebrow')}</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 5vw, 76px)', margin: '20px 0 0', lineHeight: 0.96, fontWeight: 500 }}>
            {t('trust.title.a')}{' '}
            <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('trust.title.b')}</em>
          </h2>
        </div>

        <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {TESTIMONIALS.slice(0, 2).map(test => (
            <figure key={test.id} style={{
              margin: 0, padding: 32,
              background: 'var(--bg-paper-2)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              display: 'flex', flexDirection: 'column', gap: 20,
            }}>
              <Stars rating={test.rating} size={14} />
              <blockquote style={{
                margin: 0,
                fontFamily: 'var(--ff-display)',
                fontSize: 22, lineHeight: 1.35,
                letterSpacing: '-0.005em',
                color: 'var(--ink)',
                fontWeight: 400,
              }}>
                «{test[quoteKey]}»
              </blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--terra)', color: '#F6EFDC',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 500,
                }}>{test.name[0]}</span>
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{test.name}</span>
                  <span className="meta" style={{ fontSize: 12 }}>{test.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomeScreen, Hero, Ribbon, RationConfigurator, WeekMenu, HowItWorks, TrustBlock });
