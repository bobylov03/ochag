// nav.jsx — Top navigation with language switcher, cart, account + mobile drawer.

function Nav({ route, cartCount = 0, paused = false }) {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  React.useEffect(() => { setDrawerOpen(false); }, [route]);

  // Lock scroll when drawer open
  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navItems = [
    { id: 'home',  label: lang === 'en' ? 'Home' : (lang === 'ge' ? 'მთავარი' : 'Главная') },
    { id: 'menu',  label: t('nav.menu') },
    { id: 'about', label: t('nav.about') },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(238, 228, 204, 0.92)',
      backdropFilter: 'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'border-color .2s',
    }}>
      <div className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>

          {/* Left: logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <RouteLink to="home" style={{ display: 'inline-flex' }}>
              <Logo size={26} color="var(--ink)" />
            </RouteLink>
            <span className="meta r-nav-locale" style={{ marginLeft: 4, color: 'var(--ink-3)', fontSize: 12 }}>
              Tbilisi · GE
            </span>
          </div>

          {/* Center: nav pills (desktop) */}
          <nav className="r-nav-pills" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(34,25,17,0.04)',
            border: '1px solid var(--line)',
            borderRadius: 999, padding: 4,
          }}>
            {navItems.map((item) => {
              const active = route === item.id;
              return (
                <RouteLink key={item.id} to={item.id}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--bg-paper)' : 'var(--ink)',
                    transition: 'background .15s, color .15s',
                  }}>
                  {item.label}
                </RouteLink>
              );
            })}
          </nav>

          {/* Right: lang, cart, account, hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <span className="r-lang">
              <LangSwitcher lang={lang} setLang={setLang} />
            </span>

            <RouteLink to="cart" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 999,
              border: '1px solid var(--line-2)',
              fontSize: 13.5, fontWeight: 500,
            }}>
              {Icons.cart(18)}
              <span className="tabular">{cartCount}</span>
            </RouteLink>

            <RouteLink to="account" className="r-hide-mobile" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 999,
              background: 'var(--ink)', color: 'var(--bg-paper)',
              fontSize: 13.5, fontWeight: 500,
            }}>
              {Icons.user(16)}
              <span className="r-nav-account-label">{t('nav.account')}</span>
            </RouteLink>

            {/* Hamburger (mobile only) */}
            <button onClick={() => setDrawerOpen(true)}
                    aria-label="Open menu"
                    className="r-show-mobile"
                    style={{
                      width: 44, height: 44, borderRadius: 999,
                      background: 'var(--ink)', color: 'var(--bg-paper)',
                      border: 0, cursor: 'pointer',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
              {Icons.menu(20)}
            </button>
          </div>
        </div>
      </div>

      {/* Pause banner directly under nav */}
      {paused && <PauseBanner />}

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
                    route={route} navItems={navItems} t={t} lang={lang} setLang={setLang} />
    </header>
  );
}

function MobileDrawer({ open, onClose, route, navItems, t, lang, setLang }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(31, 22, 16, 0.6)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 'min(380px, 86vw)',
          background: 'var(--bg)',
          padding: '20px 24px 32px',
          display: 'flex', flexDirection: 'column', gap: 12,
          overflow: 'auto',
          animation: 'ochag-drawer-in .22s cubic-bezier(.3,.7,.4,1)',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Logo size={22} color="var(--ink)" />
          <button onClick={onClose} aria-label="Close menu"
                  style={{
                    width: 40, height: 40, borderRadius: 999,
                    background: 'transparent', border: '1px solid var(--line)',
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
            {Icons.close(14)}
          </button>
        </div>

        {/* Lang */}
        <LangSwitcher lang={lang} setLang={setLang} />

        {/* Nav items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
          {navItems.concat([
            { id: 'cart', label: t('nav.cart') },
            { id: 'account', label: t('nav.account') },
          ]).map((item) => {
            const active = route === item.id;
            return (
              <RouteLink key={item.id} to={item.id}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', borderRadius: 14,
                  background: active ? 'var(--ink)' : 'var(--bg-paper)',
                  color: active ? 'var(--bg-paper)' : 'var(--ink)',
                  fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 500,
                  border: '1px solid',
                  borderColor: active ? 'transparent' : 'var(--line)',
                }}>
                {item.label}
                <span style={{ opacity: 0.5 }}>{Icons.arrowRight(14)}</span>
              </RouteLink>
            );
          })}
        </nav>

        {/* Quick contact */}
        <div style={{
          marginTop: 'auto', padding: 20, borderRadius: 16,
          background: 'var(--bg-deep)', color: 'var(--ink-paper)',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>
            {lang === 'en' ? 'Contact' : (lang === 'ge' ? 'კონტაქტი' : 'Связаться')}
          </span>
          <a href="tel:+995555515856" style={{
            fontFamily: 'var(--ff-display)', fontSize: 22, color: 'var(--ink-paper)',
          }}>+995 555 515 856</a>
          <a href="https://wa.me/995555515856" target="_blank" rel="noreferrer"
             className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
            WhatsApp {Icons.arrowRight(14)}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ochag-drawer-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function LangSwitcher({ lang, setLang }) {
  const items = [
    { id: 'ru', label: 'RU' },
    { id: 'ge', label: 'GE' },
    { id: 'en', label: 'EN' },
  ];
  return (
    <div style={{
      display: 'inline-flex',
      background: 'rgba(34,25,17,0.04)',
      border: '1px solid var(--line)',
      borderRadius: 999,
      padding: 3,
      fontFamily: 'var(--ff-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => setLang(it.id)}
          style={{
            border: 0, background: lang === it.id ? 'var(--ink)' : 'transparent',
            color: lang === it.id ? 'var(--bg-paper)' : 'var(--ink-2)',
            padding: '6px 10px', borderRadius: 999, cursor: 'pointer',
            transition: 'background .15s, color .15s',
          }}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

function PauseBanner() {
  const { t } = useI18n();
  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--ink-paper)' }}>
      <div className="container" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 10px', borderRadius: 999,
            background: 'var(--terra)', color: '#F6EFDC',
            fontSize: 11, fontFamily: 'var(--ff-mono)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F6EFDC',
                            animation: 'ochag-pulse 2s ease-in-out infinite' }} />
            PAUSED
          </div>
          <span style={{ fontSize: 14 }}>{t('pause.title')}</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span className="meta r-hide-mobile" style={{ color: 'var(--ink-paper-2)' }}>{t('pause.resume')}: —</span>
            <button className="btn btn-sm" style={{
              background: 'transparent', color: 'var(--ink-paper)',
              border: '1px solid rgba(241,233,216,0.32)',
            }}>{t('pause.cta')} →</button>
          </span>
        </div>
      </div>
      <style>{`@keyframes ochag-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }`}</style>
    </div>
  );
}

Object.assign(window, { Nav, LangSwitcher, PauseBanner, MobileDrawer });
