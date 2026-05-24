// account.jsx — User account / dashboard

function AccountScreen() {
  const { t, lang } = useI18n();
  const [tab, setTab] = React.useState('orders');
  const u = SAMPLE_USER;
  const active = u.active;

  const tabs = ['orders', 'subscription', 'addresses', 'profile', 'referrals'];

  return (
    <main>
      <section style={{ paddingTop: 56, paddingBottom: 32 }}>
        <div className="container">
          <Eyebrow>{t('nav.account')}</Eyebrow>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24, marginBottom: 48 }}>
            <h1 className="display" style={{
              fontSize: 'clamp(48px, 6vw, 96px)',
              margin: 0, lineHeight: 0.96, fontWeight: 500,
            }}>
              {t('acc.welcome')},{' '}
              <em className="display-italic" style={{ color: 'var(--terra)' }}>{u.name}</em>.
            </h1>
            <button className="btn btn-ghost">{t('acc.signout')}</button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, padding: 4,
                        background: 'var(--bg-paper)',
                        border: '1px solid var(--line)',
                        borderRadius: 999, width: 'fit-content',
                        overflowX: 'auto', maxWidth: '100%' }}>
            {tabs.map(tk => (
              <button key={tk} onClick={() => setTab(tk)}
                style={{
                  padding: '10px 20px', borderRadius: 999,
                  background: tab === tk ? 'var(--ink)' : 'transparent',
                  color: tab === tk ? 'var(--bg-paper)' : 'var(--ink-2)',
                  border: 0, cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap',
                }}>
                {t(`acc.tab.${tk}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 16, paddingBottom: 120 }}>
        <div className="container">
          {tab === 'orders' && <OrdersTab u={u} active={active} />}
          {tab === 'subscription' && <SubscriptionTab u={u} active={active} />}
          {tab === 'addresses' && <AddressesTab u={u} />}
          {tab === 'profile' && <ProfileTab u={u} />}
          {tab === 'referrals' && <ReferralsTab u={u} />}
        </div>
      </section>
    </main>
  );
}

function OrdersTab({ u, active }) {
  const { t, lang } = useI18n();
  const progress = active.deliveredDays / active.duration;

  return (
    <div className="r-account-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>

      {/* Active ration card */}
      <article className="card-ink" style={{
        padding: 36, borderRadius: 24,
        background: 'var(--bg-deep)', color: 'var(--ink-paper)',
        border: '1px solid rgba(241,233,216,0.10)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>{t('acc.orders.active')}</span>
            <h2 className="display" style={{
              fontSize: 48, margin: '12px 0 0', lineHeight: 1, fontWeight: 500,
              color: 'var(--ink-paper)',
            }}>
              {active.package} {t('common.kcal')}{' '}
              <em className="display-italic" style={{ color: 'var(--terra)' }}>× {active.duration}</em>
            </h2>
          </div>
          <Chip tone="olive">● ACTIVE</Chip>
        </div>

        {/* Progress */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--ink-paper-2)' }}>
              {lang === 'en' ? 'Delivered' : (lang === 'ge' ? 'მიწოდებული' : 'Доставлено')}
            </span>
            <span style={{ color: 'var(--ink-paper)' }} className="num tabular">
              {active.deliveredDays} / {active.duration} {lang === 'en' ? 'days' : 'дн.'}
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(241,233,216,0.10)' }}>
            <div style={{
              height: '100%', width: `${progress * 100}%`,
              borderRadius: 999,
              background: 'linear-gradient(90deg, var(--terra), var(--ember))',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11,
                        fontFamily: 'var(--ff-mono)', color: 'var(--ink-paper-2)', letterSpacing: '0.06em' }}>
            <span>{active.startedOn}</span>
            <span>→ {active.endsOn}</span>
          </div>
        </div>

        {/* Next delivery */}
        <div style={{
          marginTop: 32, padding: 20,
          background: 'rgba(241,233,216,0.06)',
          border: '1px solid var(--line-paper)',
          borderRadius: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <span className="label-mono" style={{ color: 'var(--terra)' }}>NEXT DELIVERY</span>
              <div style={{
                marginTop: 8,
                fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 500,
                color: 'var(--ink-paper)',
              }}>
                {active.nextDelivery}
              </div>
              <div className="meta" style={{ color: 'var(--ink-paper-2)' }}>
                {active.window} · {active.address}
              </div>
            </div>
            <button className="btn btn-sm" style={{
              background: 'transparent', color: 'var(--ink-paper)',
              border: '1px solid var(--line-paper)',
            }}>
              {lang === 'en' ? 'Edit' : (lang === 'ge' ? 'რედაქტირება' : 'Изменить')}
            </button>
          </div>
        </div>

        {/* Today's meals */}
        <div style={{ marginTop: 32 }}>
          <span className="label-mono" style={{ color: 'var(--ink-paper-2)' }}>
            {lang === 'en' ? "Today's meals" : (lang === 'ge' ? 'დღევანდელი კერძები' : 'Сегодня в коробке')}
          </span>
          <div className="r-meals" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 12 }}>
            {WEEK_MENU[0].dishes.map(id => {
              const dish = DISHES.find(d => d.id === id);
              if (!dish) return null;
              return (
                <Photo key={id} tone={dish.tone} ratio="1/1"
                       src={dish.src}
                       label={dish.name_ru} style={{ borderRadius: 10 }} />
              );
            })}
          </div>
        </div>
      </article>

      {/* History */}
      <article style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ padding: 24 }}>
          <span className="label-mono">{t('acc.orders.history')}</span>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {u.history.map(order => (
              <div key={order.id} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                gap: 16, alignItems: 'center',
                paddingBottom: 12,
                borderBottom: '1px dashed var(--line)',
              }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--bg-paper-2)', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--terra)',
                }}>{Icons.check(14)}</span>
                <div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 500 }}>
                    {order.package} ккал × {order.days} дн.
                  </div>
                  <div className="meta" style={{ fontSize: 12 }}>
                    {order.id} · {order.date}
                  </div>
                </div>
                <span className="num tabular" style={{ fontSize: 16 }}>{order.total} ₾</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referral mini-card */}
        <div className="card-terra" style={{
          padding: 24, borderRadius: 20,
          background: 'var(--terra)', color: '#F6EFDC',
        }}>
          <span className="label-mono" style={{ color: 'rgba(246,239,230,0.7)' }}>REFERRAL</span>
          <h3 className="display" style={{ fontSize: 24, margin: '12px 0 8px', lineHeight: 1.15, fontWeight: 500 }}>
            {lang === 'en' ? 'Bring a friend, both save 10 ₾.' :
             (lang === 'ge' ? 'მოიყვანე მეგობარი — 10 ₾ ფასდაკლება ორივეს.' :
              'Приведи друга — 10 ₾ скидки обоим.')}
          </h3>
          <div style={{
            marginTop: 16, padding: '12px 16px',
            background: 'rgba(255,255,255,0.14)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span className="num" style={{ fontFamily: 'var(--ff-mono)', fontSize: 14, letterSpacing: '0.12em' }}>
              OCHAG · ANNA · 7H2N
            </span>
            <button style={{ border: 0, background: 'rgba(255,255,255,0.18)', color: '#F6EFDC',
                             padding: '6px 12px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>
              {lang === 'en' ? 'Copy' : (lang === 'ge' ? 'კოპირება' : 'Копировать')}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function SubscriptionTab({ u, active }) {
  const { t, lang } = useI18n();

  return (
    <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <article className="card" style={{ padding: 32 }}>
        <span className="label-mono">{t('acc.sub.title')}</span>
        <div style={{
          marginTop: 16,
          fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 500,
        }}>
          {active.package} {t('common.kcal')} <span style={{ color: 'var(--ink-3)' }}>×</span> {active.duration} дн.
        </div>
        <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
          {lang === 'en'
            ? 'Renews automatically. You can pause anytime — we hold your slot for 30 days.'
            : (lang === 'ge'
                ? 'ავტომატურად ახლდება. ნებისმიერ დროს შეგიძლიათ შეაჩეროთ — სლოტი 30 დღე გვაქვს.'
                : 'Продлевается автоматически. Можно поставить на паузу — слот держим 30 дней.')}
        </p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Pair k={t('acc.sub.next')} v={active.endsOn} />
          <Pair k={lang === 'en' ? 'Amount' : 'Сумма'} v="728 ₾" />
          <Pair k={lang === 'en' ? 'Method' : 'Метод'} v="Visa · •• 4521" />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          <button className="btn btn-paper">{t('acc.sub.pause')}</button>
          <button className="btn btn-ghost">{t('acc.sub.cancel')}</button>
        </div>
      </article>

      <article style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ padding: 24 }}>
          <span className="label-mono">
            {lang === 'en' ? 'Macros plan' : (lang === 'ge' ? 'KBJU გეგმა' : 'План КБЖУ')}
          </span>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Pair k="Б" v="140 г" />
            <Pair k="Ж" v="75 г" />
            <Pair k="У" v="235 г" />
          </div>
          <div style={{ marginTop: 14 }}>
            <KbjuBar p={140} f={75} c={235} height={8} />
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <span className="label-mono">
            {lang === 'en' ? 'Exclusions' : (lang === 'ge' ? 'გამონაკლისები' : 'Исключения')}
          </span>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip tone="paper">грибы</Chip>
            <Chip tone="paper">кориандр</Chip>
            <Chip tone="paper">морепродукты</Chip>
            <button style={{
              padding: '6px 12px', borderRadius: 999,
              border: '1px dashed var(--line-2)',
              background: 'transparent', color: 'var(--ink-2)',
              fontSize: 12, cursor: 'pointer',
            }}>+ {lang === 'en' ? 'Add' : 'Добавить'}</button>
          </div>
        </div>
      </article>
    </div>
  );
}

function AddressesTab({ u }) {
  const { t, lang } = useI18n();
  return (
    <div className="r-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {u.addresses.map(a => (
        <article key={a.id} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 500,
            }}>{Icons.pin(14)} {a.label}</span>
            {a.primary && <Chip tone="terra">primary</Chip>}
          </div>
          <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.5 }}>{a.line}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <button className="btn btn-ghost btn-sm">{lang === 'en' ? 'Edit' : 'Изменить'}</button>
            {!a.primary && <button className="btn btn-paper btn-sm">{lang === 'en' ? 'Make primary' : 'Сделать основным'}</button>}
          </div>
        </article>
      ))}
      <button style={{
        padding: 24, borderRadius: 20,
        border: '1px dashed var(--line-2)',
        background: 'transparent', color: 'var(--ink-2)',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12,
        minHeight: 180,
      }}>
        {Icons.plus(20)}
        <span>{lang === 'en' ? 'Add new address' : 'Добавить адрес'}</span>
      </button>
    </div>
  );
}

function ProfileTab({ u }) {
  const { t, lang } = useI18n();
  return (
    <div className="card" style={{ padding: 36, maxWidth: 640 }}>
      <span className="label-mono">{t('acc.tab.profile')}</span>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <Field label={t('ck.name')} value={u.name} onChange={() => {}} />
        <Field label={t('ck.phone')} value={u.phone} onChange={() => {}} />
        <Field label={t('ck.email')} value={u.email} onChange={() => {}} />
        <Field label={lang === 'en' ? 'Joined' : 'С нами с'} value={u.joined} onChange={() => {}} />
      </div>
      <button className="btn btn-primary" style={{ marginTop: 28 }}>
        {lang === 'en' ? 'Save changes' : (lang === 'ge' ? 'შენახვა' : 'Сохранить')}
      </button>
    </div>
  );
}

function ReferralsTab({ u }) {
  const { t, lang } = useI18n();
  return (
    <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <article className="card-terra" style={{
        padding: 40, borderRadius: 24,
        background: 'var(--terra)', color: '#F6EFDC',
      }}>
        <h2 className="display" style={{ fontSize: 40, margin: 0, lineHeight: 1, fontWeight: 500 }}>
          {lang === 'en' ? 'Bring a friend.' : (lang === 'ge' ? 'მოიყვანე მეგობარი.' : 'Приведи друга.')}
        </h2>
        <p style={{ marginTop: 16, marginBottom: 32, fontSize: 17, lineHeight: 1.5, color: '#F6EFDC' }}>
          {lang === 'en'
            ? 'They get 10 ₾ off the first order. You get 10 ₾ off your next.'
            : (lang === 'ge'
                ? 'მათ — 10 ₾ ფასდაკლება პირველ შეკვეთაზე. შენ — შემდეგზე.'
                : 'Им — 10 ₾ скидки на первый заказ. Вам — 10 ₾ на следующий.')}
        </p>
        <div style={{
          padding: 20, borderRadius: 14,
          background: 'rgba(255,255,255,0.16)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 18, letterSpacing: '0.18em' }}>
            OCHAG-ANNA-7H2N
          </span>
          <button style={{
            border: 0, background: '#F6EFDC', color: 'var(--terra-deep)',
            padding: '10px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
            cursor: 'pointer',
          }}>{lang === 'en' ? 'Copy code' : 'Копировать'}</button>
        </div>
      </article>

      <article className="card" style={{ padding: 32 }}>
        <span className="label-mono">{lang === 'en' ? 'Your invites' : 'Приглашения'}</span>
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Stat value="4" label={lang === 'en' ? 'Friends joined' : 'Друзей пришло'} accent />
          <Stat value="40 ₾" label={lang === 'en' ? 'Earned in credit' : 'Заработано'} />
        </div>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Лана М.', joined: '2026-04-12', status: 'active' },
              { name: 'Davit J.', joined: '2026-03-28', status: 'active' },
              { name: 'Tamta L.', joined: '2026-03-15', status: 'completed' },
              { name: 'Илья В.',   joined: '2026-02-21', status: 'completed' },
            ].map((f, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingBottom: 8, borderBottom: i < 3 ? '1px dashed var(--line)' : 0,
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-paper-2)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 13,
                }}>{f.name[0]}</span>
                <span style={{ flex: 1, fontSize: 14 }}>{f.name}</span>
                <span className="meta">{f.joined}</span>
                <Chip tone={f.status === 'active' ? 'olive' : 'paper'}>{f.status}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

function Pair({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ color: 'var(--ink-2)', fontSize: 13 }}>{k}</span>
      <span style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 500 }} className="tabular">{v}</span>
    </div>
  );
}

Object.assign(window, { AccountScreen });
