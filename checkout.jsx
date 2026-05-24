// checkout.jsx — Multi-step checkout flow

function CheckoutScreen({ cart, clearCart }) {
  const { t, lang } = useI18n();
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    name: '', phone: '', email: '',
    address: '', entrance: '',
    window: '10:00 – 11:00',
    start: 'tomorrow',
    payment: 'card',
  });
  const [placed, setPlaced] = React.useState(false);

  const subtotal = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  const delivery = cart.some(i => i.type === 'ration') ? 0 : 7;
  const total = subtotal + delivery;

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const place = () => {
    setPlaced(true);
    setTimeout(() => {
      clearCart();
      window.location.hash = '#/account';
    }, 2400);
  };

  if (placed) {
    return (
      <main>
        <section style={{ paddingTop: 120, paddingBottom: 160 }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'var(--olive)', color: '#F6EFDC',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 32px',
            }}>{Icons.check(36)}</div>
            <h1 className="display" style={{
              fontSize: 'clamp(48px, 6vw, 88px)',
              margin: '0 0 16px', lineHeight: 0.96, fontWeight: 500,
            }}>
              {lang === 'en' ? 'Order placed.' : (lang === 'ge' ? 'შეკვეთა მიღებულია.' : 'Заказ принят.')}
            </h1>
            <p className="body-lg" style={{ color: 'var(--ink-2)' }}>
              {lang === 'en' ? 'We sent the confirmation to your phone. First delivery: tomorrow, 10:00–11:00.' :
               (lang === 'ge' ? 'დადასტურება გავაგზავნეთ თქვენს ნომერზე. პირველი მიწოდება: ხვალ, 10:00-11:00.' :
                'Подтверждение отправили на ваш телефон. Первая доставка: завтра, 10:00 – 11:00.')}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section style={{ paddingTop: 56, paddingBottom: 96 }}>
        <div className="container">
          <Eyebrow>{t('ck.title')}</Eyebrow>

          <h1 className="display" style={{
            fontSize: 'clamp(40px, 5.6vw, 76px)',
            margin: '24px 0 48px', lineHeight: 0.96, fontWeight: 500,
          }}>{t('ck.title')}.</h1>

          {/* Stepper */}
          <div className="r-checkout-stepper" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            {[1, 2, 3].map(n => {
              const label = ['ck.step.contact', 'ck.step.delivery', 'ck.step.payment'][n - 1];
              const active = step === n;
              const done = step > n;
              return (
                <React.Fragment key={n}>
                  <button onClick={() => done && setStep(n)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 20px', borderRadius: 999,
                            background: active ? 'var(--ink)' : (done ? 'var(--olive)' : 'transparent'),
                            color: active || done ? '#F6EFDC' : 'var(--ink-2)',
                            border: active || done ? '1px solid transparent' : '1px solid var(--line)',
                            cursor: done ? 'pointer' : 'default',
                            fontSize: 13.5, fontWeight: 500,
                          }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: active || done ? 'rgba(255,255,255,0.18)' : 'var(--bg-paper)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--ff-mono)', fontSize: 11, fontWeight: 500,
                    }}>{done ? Icons.check(11) : `0${n}`}</span>
                    {t(label)}
                  </button>
                  {n < 3 && <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="r-cfg" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'start' }}>

            {/* Form panel */}
            <div className="card" style={{ padding: 36, minHeight: 480 }}>
              {step === 1 && <StepContact data={data} update={update} t={t} next={() => setStep(2)} />}
              {step === 2 && <StepDelivery data={data} update={update} t={t}
                                            next={() => setStep(3)} back={() => setStep(1)} />}
              {step === 3 && <StepPayment data={data} update={update} t={t}
                                           place={place} back={() => setStep(2)} total={total} />}
            </div>

            {/* Order summary */}
            <aside className="card-ink r-summary-sticky r-summary" style={{
              padding: 28, borderRadius: 20,
              position: 'sticky', top: 100,
              background: 'var(--bg-deep)', color: 'var(--ink-paper)',
              border: '1px solid rgba(241,233,216,0.10)',
            }}>
              <div className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>
                {t('cfg.summary.title')}
              </div>

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between', gap: 16,
                    paddingBottom: 10,
                    borderBottom: '1px dashed var(--line-paper)',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink-paper)' }}>
                        {item.name}
                      </span>
                      <span className="meta" style={{ color: 'var(--ink-paper-2)' }}>× {item.qty}</span>
                    </div>
                    <span className="num tabular" style={{ color: 'var(--ink-paper)', whiteSpace: 'nowrap' }}>
                      {item.price * item.qty} ₾
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <RowKV label={t('cart.delivery')} value={delivery > 0 ? `${delivery} ₾` : t('cart.delivery.free')} />
              </div>

              <div style={{
                marginTop: 20, paddingTop: 16,
                borderTop: '1px solid var(--line-paper)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <span style={{ color: 'var(--ink-paper-2)' }}>{t('cart.total')}</span>
                <span className="num" style={{ fontSize: 36, lineHeight: 1, fontWeight: 500 }}>
                  {total}<span style={{ fontSize: 14, color: 'var(--ink-paper-2)' }}> ₾</span>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function StepContact({ data, update, t, next }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 className="display" style={{ fontSize: 32, margin: 0, fontWeight: 500 }}>{t('ck.step.contact')}</h2>

      <Field label={t('ck.name')} value={data.name} onChange={(v) => update('name', v)} placeholder="Анна" />
      <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label={t('ck.phone')} value={data.phone} onChange={(v) => update('phone', v)} placeholder="+995 ..." />
        <Field label={t('ck.email')} value={data.email} onChange={(v) => update('email', v)} placeholder="anna@..." />
      </div>

      <button onClick={next} className="btn btn-primary btn-lg" style={{ marginTop: 16, alignSelf: 'flex-end' }}>
        {t('ck.step.delivery')} {Icons.arrowRight(14)}
      </button>
    </div>
  );
}

function StepDelivery({ data, update, t, next, back }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 className="display" style={{ fontSize: 32, margin: 0, fontWeight: 500 }}>{t('ck.step.delivery')}</h2>

      <Field label={t('ck.address')} value={data.address} onChange={(v) => update('address', v)} placeholder="Чавчавадзе 37" />
      <Field label={t('ck.entrance')} value={data.entrance} onChange={(v) => update('entrance', v)} placeholder="кв. 14, 4 этаж, код 1234" />

      <div>
        <span className="field-label">{t('ck.window')}</span>
        <div className="r-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[t('ck.window.1'), t('ck.window.2'), t('ck.window.3')].map(w => (
            <button key={w} onClick={() => update('window', w)}
              style={{
                padding: '14px 12px', borderRadius: 12,
                background: data.window === w ? 'var(--ink)' : 'var(--bg-paper-2)',
                color: data.window === w ? 'var(--bg-paper)' : 'var(--ink)',
                border: '1px solid var(--line)',
                cursor: 'pointer',
                fontFamily: 'var(--ff-mono)', fontSize: 13, letterSpacing: '0.04em',
              }}>
              {w}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="field-label">{t('ck.start')}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => update('start', 'tomorrow')}
            className={data.start === 'tomorrow' ? 'btn btn-ink' : 'btn btn-paper'}
            style={{ height: 52 }}>{t('ck.start.tomorrow')}</button>
          <button onClick={() => update('start', 'pick')}
            className={data.start === 'pick' ? 'btn btn-ink' : 'btn btn-paper'}
            style={{ height: 52 }}>{t('ck.start.pick')}</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button onClick={back} className="btn btn-ghost btn-lg">← {t('ck.step.contact')}</button>
        <button onClick={next} className="btn btn-primary btn-lg">{t('ck.step.payment')} {Icons.arrowRight(14)}</button>
      </div>
    </div>
  );
}

function StepPayment({ data, update, t, place, back, total }) {
  const methods = [
    { id: 'card', label: t('ck.pay.card'),  desc: 'Visa · Mastercard · Apple Pay' },
    { id: 'cash', label: t('ck.pay.cash'),  desc: '₾ · USD · EUR' },
    { id: 'bank', label: t('ck.pay.bank'),  desc: 'TBC · BoG · Liberty' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 className="display" style={{ fontSize: 32, margin: 0, fontWeight: 500 }}>{t('ck.step.payment')}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {methods.map(m => (
          <button key={m.id} onClick={() => update('payment', m.id)}
            style={{
              textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '20px 22px',
              background: data.payment === m.id ? 'var(--bg-paper-2)' : 'transparent',
              border: '1px solid',
              borderColor: data.payment === m.id ? 'var(--ink)' : 'var(--line)',
              borderRadius: 14, cursor: 'pointer',
            }}>
            <span style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '1.5px solid',
              borderColor: data.payment === m.id ? 'var(--ink)' : 'var(--line-2)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {data.payment === m.id && (
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--terra)' }} />
              )}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--ff-display)', fontSize: 19, fontWeight: 500, lineHeight: 1.2 }}>
                {m.label}
              </span>
              <span className="meta">{m.desc}</span>
            </span>
            <span style={{ marginLeft: 'auto' }} className="label-mono">{m.id.toUpperCase()}</span>
          </button>
        ))}
      </div>

      <p className="meta" style={{ marginTop: 8 }}>{t('ck.terms')}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <button onClick={back} className="btn btn-ghost btn-lg">← {t('ck.step.delivery')}</button>
        <button onClick={place} className="btn btn-primary btn-lg">
          {t('ck.confirm')} · {total} ₾ {Icons.arrowRight(14)}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="field-label">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
             placeholder={placeholder} className="field field-lg" />
    </label>
  );
}

Object.assign(window, { CheckoutScreen, Field });
