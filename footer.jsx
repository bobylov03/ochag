// footer.jsx — Site footer (deep, editorial)

function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer style={{ background: 'var(--bg-deep)', color: 'var(--ink-paper)', position: 'relative' }}>
      <div className="container" style={{ paddingTop: 96, paddingBottom: 32 }}>

        {/* Top — big brand statement */}
        <div className="r-footer-top" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 28 }}>
              <Logo size={32} color="var(--ink-paper)" />
            </div>
            <h2 className="display" style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: 'var(--ink-paper)',
              margin: 0, marginBottom: 24,
              maxWidth: 720,
            }}>
              {t('hero.title.1')} <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>{t('hero.title.2')}</em>
              <br />{t('hero.title.3')}.
            </h2>
            <p className="body-lg" style={{ color: 'var(--ink-paper-2)', maxWidth: 520, marginBottom: 32 }}>
              {t('ft.tagline')}.
            </p>

            {/* Contact card */}
            <div className="r-footer-contact" style={{
              display: 'inline-flex', flexDirection: 'column', gap: 8,
              padding: 24, borderRadius: 16,
              border: '1px solid var(--line-paper)',
              background: 'rgba(241,233,216,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {Icons.pin(14)}
                <span style={{ fontSize: 14 }}>{t('ft.address')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {Icons.clock(14)}
                <span className="meta" style={{ color: 'var(--ink-paper-2)' }}>{t('ft.hours')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <a href="tel:+995555515856" style={{
                  fontFamily: 'var(--ff-display)', fontSize: 22,
                  color: 'var(--ink-paper)', letterSpacing: '-0.005em',
                }}>{t('ft.phone')}</a>
              </div>
            </div>
          </div>

          {/* Right — link columns */}
          <div className="r-footer-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            <FooterCol title={t('ft.col.menu')} items={[
              { label: t('ft.menu.rations'), to: 'home' },
              { label: t('ft.menu.menu'), to: 'menu' },
              { label: t('ft.menu.weekly'), to: 'menu' },
              { label: t('ft.menu.corp'), to: 'about' },
            ]} />
            <FooterCol title={t('ft.col.about')} items={[
              { label: t('ft.about.story'), to: 'about' },
              { label: t('ft.about.kitchen'), to: 'about' },
              { label: t('ft.about.team'), to: 'about' },
              { label: t('ft.about.careers'), to: 'about' },
            ]} />
            <FooterCol title={t('ft.col.support')} items={[
              { label: t('ft.support.help'), to: 'account' },
              { label: t('ft.support.delivery'), to: 'about' },
              { label: t('ft.support.refund'), to: 'about' },
              { label: t('ft.support.contact'), to: 'about' },
            ]} />
          </div>
        </div>

        {/* Social */}
        <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span className="eyebrow" style={{ color: 'var(--ink-paper-2)' }}>Find us</span>
          <div className="r-footer-socials" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SocialPill href="https://instagram.com/ochag_tbilisi" label="Instagram" handle="@ochag_tbilisi" />
            <SocialPill href="#" label="Facebook" handle="ochag.tbilisi" />
            <SocialPill href="https://wa.me/995555515856" label="WhatsApp" handle="+995 555 515 856" />
            <SocialPill href="#" label="Telegram" handle="@ochag_ge" />
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          marginTop: 64, paddingTop: 24,
          borderTop: '1px solid var(--line-paper)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 24, flexWrap: 'wrap',
          color: 'var(--ink-paper-2)', fontSize: 13,
        }}>
          <span>{t('ft.copyright')}</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'inherit' }}>{t('ft.policy')}</a>
            <a href="#" style={{ color: 'inherit' }}>{t('ft.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="eyebrow" style={{ color: 'var(--ink-paper-2)', marginBottom: 16 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it) => (
          <li key={it.label}>
            <RouteLink to={it.to} style={{
              color: 'var(--ink-paper)', fontSize: 14.5,
              borderBottom: '1px solid transparent',
              transition: 'border-color .15s',
            }}>
              {it.label}
            </RouteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialPill({ href, label, handle }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 999,
      border: '1px solid var(--line-paper)',
      background: 'rgba(241,233,216,0.04)',
      color: 'var(--ink-paper)',
      fontSize: 13,
    }}>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span className="r-pill-handle" style={{ color: 'var(--ink-paper-2)', fontSize: 12 }}>{handle}</span>
    </a>
  );
}

Object.assign(window, { Footer });