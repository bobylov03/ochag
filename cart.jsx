// cart.jsx — Shopping cart

function CartScreen({ cart, updateCart, removeFromCart }) {
  const { t, lang } = useI18n();
  const [promo, setPromo] = React.useState('');
  const [appliedPromo, setAppliedPromo] = React.useState(null);
  const [note, setNote] = React.useState('');

  const subtotal = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 0 && cart.some(i => i.type === 'ration') ? 0 : (subtotal > 0 ? 7 : 0);
  const total = subtotal - discount + delivery;

  if (cart.length === 0) {
    return (
      <main>
        <section style={{ paddingTop: 80, paddingBottom: 120 }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <Eyebrow>{t('cart.title')}</Eyebrow>
            <div style={{ marginTop: 40, display: 'inline-flex',
                          width: 88, height: 88, borderRadius: '50%',
                          background: 'var(--bg-paper)', border: '1px solid var(--line)',
                          alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)' }}>
              {Icons.cart(36)}
            </div>
            <h1 className="display" style={{
              fontSize: 'clamp(48px, 6vw, 96px)',
              margin: '32px 0 16px', lineHeight: 0.96, fontWeight: 500,
            }}>
              {t('cart.empty.title')}.
            </h1>
            <p className="body-lg" style={{ color: 'var(--ink-2)' }}>{t('cart.empty.body')}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <RouteLink to="home" className="btn btn-primary btn-lg">
                {lang === 'en' ? 'Build ration' : (lang === 'ge' ? 'რაციონის შედგენა' : 'Собрать рацион')} {Icons.arrowRight(14)}
              </RouteLink>
              <RouteLink to="menu" className="btn btn-ghost btn-lg">{t('cart.empty.cta')}</RouteLink>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container">
          <Eyebrow>{t('cart.title')}</Eyebrow>
          <div className="r-flex-stack" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24, marginBottom: 48 }}>
            <h1 className="display" style={{
              fontSize: 'clamp(48px, 6vw, 96px)',
              margin: 0, lineHeight: 0.96, fontWeight: 500,
            }}>
              {t('cart.title')}{' '}<span style={{ color: 'var(--ink-3)' }} className="num">— {cart.length}</span>
            </h1>
            <RouteLink to="menu" className="btn btn-ghost">{t('cart.continue')}</RouteLink>
          </div>

          <div className="r-cfg" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, alignItems: 'start' }}>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map(item => <CartRow key={item.id} item={item}
                                          onChange={(qty) => updateCart(item.id, qty)}
                                          onRemove={() => removeFromCart(item.id)} />)}

              {/* Note */}
              <div className="card" style={{ padding: 20, marginTop: 8 }}>
                <span className="field-label">{t('cart.note')}</span>
                <textarea value={note} onChange={(e) => setNote(e.target.value)}
                          placeholder={t('cart.note.placeholder')}
                          rows={3}
                          style={{
                            width: '100%', border: 0, background: 'transparent',
                            resize: 'vertical', outline: 'none', fontSize: 14,
                            fontFamily: 'inherit',
                          }} />
              </div>
            </div>

            {/* Summary */}
            <aside className="card-ink r-summary-sticky r-summary" style={{
              padding: 32, borderRadius: 20,
              position: 'sticky', top: 100,
              background: 'var(--bg-deep)', color: 'var(--ink-paper)',
              border: '1px solid rgba(241,233,216,0.10)',
            }}>
              <div className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>{lang === 'en' ? 'Order' : (lang === 'ge' ? 'შეკვეთა' : 'Заказ')}</div>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <RowKV label={t('cart.subtotal')} value={`${subtotal} ₾`} />
                {discount > 0 && <RowKV label={t('cart.discount')} value={`−${discount} ₾`} accent />}
                <RowKV label={t('cart.delivery')} value={delivery === 0 ? t('cart.delivery.free') : `${delivery} ₾`} />
              </div>

              <div style={{
                marginTop: 24, paddingTop: 20,
                borderTop: '1px solid var(--line-paper)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <span style={{ color: 'var(--ink-paper-2)' }}>{t('cart.total')}</span>
                <span className="num" style={{ fontSize: 48, lineHeight: 1, fontWeight: 500 }}>
                  {total}<span style={{ fontSize: 18, color: 'var(--ink-paper-2)' }}> ₾</span>
                </span>
              </div>

              {/* Promo */}
              <div style={{
                marginTop: 24, display: 'flex', gap: 6,
                background: 'rgba(241,233,216,0.06)',
                border: '1px solid var(--line-paper)',
                borderRadius: 12, padding: 4,
              }}>
                <input value={promo} onChange={(e) => setPromo(e.target.value)}
                       placeholder={t('cart.promo.placeholder')}
                       style={{
                         flex: 1, border: 0, background: 'transparent',
                         outline: 'none', padding: '0 12px', color: 'var(--ink-paper)',
                         fontSize: 13, height: 40,
                       }} />
                <button onClick={() => promo && setAppliedPromo(promo)}
                        className="btn btn-sm" style={{
                          background: 'var(--terra)', color: '#F6EFDC', height: 36, border: 0,
                        }}>
                  {t('cart.promo.apply')}
                </button>
              </div>

              <RouteLink to="checkout" className="btn btn-primary btn-lg"
                         style={{ marginTop: 24, width: '100%', justifyContent: 'space-between' }}>
                <span>{t('cart.checkout')}</span>
                {Icons.arrowRight(14)}
              </RouteLink>

              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--ink-paper-2)' }}>
                {Icons.truck(14)}
                <span>{lang === 'en' ? 'Delivery 9 AM – 12 PM tomorrow' : (lang === 'ge' ? 'მიწოდება ხვალ 9:00-12:00' : 'Доставка завтра 9:00 – 12:00')}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function CartRow({ item, onChange, onRemove }) {
  const { t, lang } = useI18n();
  const isRation = item.type === 'ration';
  const [expanded, setExpanded] = React.useState(false);
  const dishKey = lang === 'ge' ? 'name_ge' : (lang === 'en' ? 'name_en' : 'name_ru');

  return (
    <article className="r-cart-row" style={{
      display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 20,
      alignItems: 'center', padding: 16,
      background: 'var(--bg-paper)',
      border: '1px solid var(--line)',
      borderRadius: 16,
    }}>
      <Photo tone={isRation ? 'terra' : 'olive'} ratio="1/1"
             label={isRation ? 'RATION' : item.name}
             style={{ borderRadius: 12 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {isRation && (
          <Chip tone="terra">★ {lang === 'en' ? 'Ration' : (lang === 'ge' ? 'რაციონი' : 'Рацион')}</Chip>
        )}
        <h3 style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 500, lineHeight: 1.2 }}>
          {item.name}
        </h3>
        {isRation && (
          <button onClick={() => setExpanded(!expanded)}
                  style={{
                    marginTop: 6, alignSelf: 'flex-start',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 999,
                    background: 'transparent',
                    border: '1px solid var(--line-2)',
                    color: 'var(--ink)', cursor: 'pointer',
                    fontSize: 12, fontWeight: 500,
                  }}>
            <span style={{
              display: 'inline-block', transition: 'transform .2s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
            }}>{Icons.arrowDown(10)}</span>
            {expanded ? t('cart.ration.hide') : t('cart.ration.shows')}
          </button>
        )}
      </div>

      <div className="r-cart-controls" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {!isRation && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            background: 'var(--bg-paper-2)', border: '1px solid var(--line)',
            borderRadius: 999, padding: 4,
          }}>
            <button onClick={() => onChange(Math.max(1, item.qty - 1))}
                    style={{ border: 0, background: 'transparent', cursor: 'pointer',
                             width: 28, height: 28, borderRadius: '50%' }}>
              {Icons.minus(12)}
            </button>
            <span className="num tabular" style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 500 }}>
              {item.qty}
            </span>
            <button onClick={() => onChange(item.qty + 1)}
                    style={{ border: 0, background: 'transparent', cursor: 'pointer',
                             width: 28, height: 28, borderRadius: '50%' }}>
              {Icons.plus(12)}
            </button>
          </div>
        )}
        <div style={{ minWidth: 80, textAlign: 'right' }}>
          <span className="num" style={{ fontSize: 22, fontWeight: 500 }}>
            {item.price * item.qty}
          </span>
          <span style={{ marginLeft: 4, color: 'var(--ink-2)' }}>₾</span>
        </div>
        <button onClick={onRemove}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid var(--line)', background: 'transparent',
                  color: 'var(--ink-2)', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
          {Icons.close(12)}
        </button>
      </div>

      {/* Expanded ration details */}
      {isRation && expanded && (
        <div style={{
          gridColumn: '1 / -1',
          marginTop: 8,
          paddingTop: 16,
          borderTop: '1px dashed var(--line)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <span className="label-mono">{t('cart.ration.menu_week')}</span>
            <RouteLink to="menu" className="meta" style={{
              color: 'var(--terra)', display: 'inline-flex', alignItems: 'center', gap: 6,
              fontWeight: 500,
            }}>
              {t('week.viewall')} {Icons.arrowRight(11)}
            </RouteLink>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WEEK_MENU.map((day) => (
              <div key={day.day} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16,
                padding: '10px 0',
                borderBottom: '1px dashed var(--line)',
              }}>
                <span className="label-mono" style={{ alignSelf: 'start', paddingTop: 2 }}>
                  {t(`week.day.${day.day}`).slice(0, 3).toUpperCase()}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 13 }}>
                  {day.dishes.map((id, i) => {
                    const dish = DISHES.find(d => d.id === id);
                    if (!dish) return null;
                    return (
                      <span key={id} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span>{dish[dishKey]}</span>
                        {i < day.dishes.length - 1 && (
                          <span style={{ color: 'var(--ink-3)', margin: '0 6px' }}>·</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function RowKV({ label, value, accent = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span style={{ color: 'var(--ink-paper-2)' }}>{label}</span>
      <span style={{ color: accent ? 'var(--terra)' : 'var(--ink-paper)', fontWeight: 500 }} className="tabular">{value}</span>
    </div>
  );
}

Object.assign(window, { CartScreen, CartRow });
