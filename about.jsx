// about.jsx — About / story page

function AboutScreen() {
  const { t, lang } = useI18n();

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h1 className="display" style={{
            fontSize: 'clamp(56px, 7.6vw, 132px)',
            margin: '24px 0 40px', lineHeight: 0.92, letterSpacing: '-0.03em', fontWeight: 500,
            maxWidth: 1100,
          }}>
            {t('about.title.a')}{' '}
            <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('about.title.b')}</em>.
          </h1>

          <div className="r-2col-tablet" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'end' }}>
            <p className="body-lg" style={{ maxWidth: 720, color: 'var(--ink-2)', fontSize: 22, lineHeight: 1.4 }}>
              {t('about.lede')}
            </p>
            <div className="r-about-stats" style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 32, borderLeft: '1px solid var(--line)' }}>
              <Stat value="2023" label={lang === 'en' ? 'Founded' : (lang === 'ge' ? 'დაარსდა' : 'Основано')} />
              <Stat value="42" label={lang === 'en' ? 'Dishes in rotation' : (lang === 'ge' ? 'კერძი როტაციაში' : 'Блюда в ротации')} accent />
              <Stat value="7" label={lang === 'en' ? 'People in the kitchen' : (lang === 'ge' ? 'ადამიანი სამზარეულოში' : 'Человек на кухне')} />
            </div>
          </div>
        </div>
      </section>

      {/* Hero photo strip */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container-wide">
          <div className="r-about-photos" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12 }}>
            <Photo tone="terra" tag="KITCHEN · WIDE" ratio="16/10"
                   label="фото открытой кухни с поварами" />
            <Photo tone="paper" tag="HANDS" ratio="4/5"
                   label="фото рук, разделывающих травы" />
            <Photo tone="wine" tag="TABLE" ratio="4/5"
                   label="готовые контейнеры на столе" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{
        paddingTop: 96, paddingBottom: 96,
        background: 'var(--bg-deep)', color: 'var(--ink-paper)',
      }}>
        <div className="container">
          <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, marginBottom: 56 }}>
            <div>
              <Eyebrow>{t('about.values.title')}</Eyebrow>
              <h2 className="display" style={{
                color: 'var(--ink-paper)',
                fontSize: 'clamp(40px, 5vw, 76px)',
                margin: '20px 0 0', lineHeight: 0.96, fontWeight: 500,
              }}>{t('about.values.title')}</h2>
            </div>
          </div>

          <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[1, 2, 3, 4].map(n => (
              <article key={n} style={{
                padding: 32,
                border: '1px solid var(--line-paper)',
                borderRadius: 20,
                background: 'rgba(241,233,216,0.04)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <span style={{
                  fontFamily: 'var(--ff-mono)', fontSize: 12,
                  letterSpacing: '0.16em', color: 'var(--terra)',
                }}>0{n}</span>
                <h3 className="display" style={{
                  margin: 0, fontSize: 30, fontWeight: 500, lineHeight: 1.1,
                  color: 'var(--ink-paper)',
                }}>{t(`about.values.${n}.title`)}</h3>
                <p style={{ margin: 0, color: 'var(--ink-paper-2)', fontSize: 15.5, lineHeight: 1.55 }}>
                  {t(`about.values.${n}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen */}
      <section style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="container">
          <div className="r-2col-tablet" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>{t('about.kitchen.title')}</Eyebrow>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px 0 28px', lineHeight: 0.96, fontWeight: 500 }}>
                {t('about.kitchen.title')}
              </h2>
              <p className="body-lg" style={{ color: 'var(--ink-2)', maxWidth: 520 }}>
                {t('about.kitchen.body')}
              </p>

              <div style={{
                marginTop: 40, padding: 24, borderRadius: 16,
                border: '1px solid var(--line)',
                background: 'var(--bg-paper)',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {Icons.pin(14)}
                  <span>Кобулети 36, Ваке, Тбилиси</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {Icons.clock(14)}
                  <span>Открытая кухня · можно зайти посмотреть</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {Icons.leaf(14)}
                  <span>HACCP-сертификат, проверки раз в квартал</span>
                </div>
              </div>
            </div>
            <Photo tone="paper" ratio="4/3" tag="KITCHEN · DETAIL"
                   label="фото большого открытого кухонного пространства" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ paddingTop: 96, paddingBottom: 96, background: 'var(--bg-paper)',
                        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <Eyebrow>{t('about.team.title')}</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px 0 24px', lineHeight: 0.96, fontWeight: 500 }}>
              {t('about.team.title')}
            </h2>
            <p className="body-lg" style={{ color: 'var(--ink-2)' }}>{t('about.team.body')}</p>
          </div>

          <div className="r-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { name: 'Гиорги М.', role: 'Шеф-повар',         photo: 'фото шефа в кухне' },
              { name: 'Тамара К.', role: 'Технолог',           photo: 'фото технолога с записями' },
              { name: 'Анна С.',   role: 'Sous-chef',          photo: 'фото су-шефа' },
              { name: 'Леван Б.',  role: 'Курьер · логистика', photo: 'фото курьера с коробкой' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Photo tone={['terra','olive','mustard','wine'][i % 4]} ratio="4/5"
                       label={p.photo} />
                <div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 500 }}>{p.name}</div>
                  <div className="label-mono">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 1080, margin: '0 auto' }}>
          <span style={{ fontFamily: 'var(--ff-display)', fontSize: 96, color: 'var(--terra)', lineHeight: 1, fontWeight: 500 }}>“</span>
          <p className="display" style={{
            fontSize: 'clamp(28px, 3.4vw, 52px)',
            lineHeight: 1.18, fontWeight: 400, margin: '0',
            letterSpacing: '-0.005em',
          }}>
            {lang === 'en'
              ? <>Tbilisi already had restaurants. We were missing a kitchen that <em className="display-italic" style={{ color: 'var(--terra)' }}>just feeds you</em> — every day, like home.</>
              : (lang === 'ge'
                  ? <>თბილისს უკვე ჰქონდა რესტორნები. გვაკლდა სამზარეულო, რომელიც <em className="display-italic" style={{ color: 'var(--terra)' }}>უბრალოდ გაჭმევს</em> — ყოველდღე, სახლივით.</>
                  : <>В Тбилиси уже были рестораны. Не хватало кухни, которая <em className="display-italic" style={{ color: 'var(--terra)' }}>просто кормит</em> — каждый день, как дома.</>)}
          </p>
          <div className="meta" style={{ marginTop: 32 }}>— Команда OCHAG</div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AboutScreen });
