// menu.jsx — Full menu page

function MenuScreen({ addToCart }) {
  const { t, lang } = useI18n();
  const [cat, setCat] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [diets, setDiets] = React.useState([]);

  const nameKey = lang === 'ge' ? 'name_ge' : (lang === 'en' ? 'name_en' : 'name_ru');

  const cats = ['all', 'bowls', 'pasta', 'salads', 'soups', 'mains', 'breakfast', 'desserts'];
  const dietOpts = ['veg', 'gf', 'lf', 'lowcarb'];

  const filtered = DISHES.filter(d => {
    if (cat !== 'all' && d.cat !== cat) return false;
    if (search && !d[nameKey].toLowerCase().includes(search.toLowerCase())) return false;
    if (diets.length && !diets.every(dd => d.tags.includes(dd))) return false;
    return true;
  });

  const toggleDiet = (id) => {
    setDiets(diets.includes(id) ? diets.filter(d => d !== id) : [...diets, id]);
  };

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div className="container">
          <Eyebrow>{t('menu.eyebrow')}</Eyebrow>
          <h1 className="display" style={{
            fontSize: 'clamp(56px, 8vw, 144px)',
            margin: '24px 0 24px', lineHeight: 0.92, letterSpacing: '-0.03em', fontWeight: 500,
          }}>
            {t('menu.title.a')}{' '}
            <em className="display-italic" style={{ color: 'var(--terra)' }}>{t('menu.title.b')}</em>.
          </h1>
          <p className="body-lg" style={{ maxWidth: 560, color: 'var(--ink-2)', margin: 0 }}>
            {t('menu.lede')}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ position: 'sticky', top: 76, zIndex: 20,
                        background: 'rgba(238,228,204,0.92)',
                        backdropFilter: 'blur(12px) saturate(140%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                        borderTop: '1px solid var(--line)',
                        borderBottom: '1px solid var(--line)',
                        paddingTop: 16, paddingBottom: 16 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Categories */}
          <div className="r-menu-cats" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding: '10px 18px', borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: c === cat ? 'var(--ink)' : 'var(--bg-paper)',
                  color: c === cat ? 'var(--bg-paper)' : 'var(--ink)',
                  fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                }}>
                {t(`menu.cat.${c}`)}
                <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 12 }} className="tabular">
                  {c === 'all' ? DISHES.length : DISHES.filter(d => d.cat === c).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 16px', height: 40,
              background: 'var(--bg-paper)', borderRadius: 999,
              border: '1px solid var(--line)',
              flex: '1 1 320px', maxWidth: 380,
            }}>
              <span style={{ color: 'var(--ink-2)' }}>{Icons.search(15)}</span>
              <input placeholder={t('menu.search')}
                     value={search} onChange={(e) => setSearch(e.target.value)}
                     style={{ border: 0, background: 'transparent', outline: 'none',
                              flex: 1, fontSize: 14 }} />
            </div>
            <span className="meta" style={{ marginLeft: 'auto', color: 'var(--ink-2)' }}>
              {filtered.length} {lang === 'en' ? 'dishes' : (lang === 'ge' ? 'კერძი' : 'блюд')}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ paddingTop: 40, paddingBottom: 96 }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ padding: 80, textAlign: 'center', color: 'var(--ink-2)' }}>
              {lang === 'en' ? 'Nothing matches your filters.' : 'Под фильтр ничего не подошло.'}
            </div>
          ) : (
            <div className="r-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {filtered.map(dish => <DishCard key={dish.id} dish={dish} addToCart={addToCart} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DishCard({ dish, addToCart }) {
  const { t, lang } = useI18n();
  const nameKey = lang === 'ge' ? 'name_ge' : (lang === 'en' ? 'name_en' : 'name_ru');
  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    addToCart({
      type: 'dish', id: dish.id,
      name: dish[nameKey], price: dish.price, qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article style={{
      background: 'var(--bg-paper)',
      border: '1px solid var(--line)',
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform .2s, box-shadow .2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
      <Photo tone={dish.tone} ratio="4/3" src={dish.src} label={dish[nameKey]}
             tag={`${dish.kcal} ккал`}
             style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }} />
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{
            margin: 0, fontFamily: 'var(--ff-display)', fontSize: 19,
            fontWeight: 500, lineHeight: 1.18, letterSpacing: '-0.005em',
            flex: 1, textWrap: 'pretty',
          }}>{dish[nameKey]}</h3>
          <span className="num" style={{ fontSize: 17, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {dish.price} ₾
          </span>
        </div>

        <button onClick={handleAdd} className={added ? 'btn btn-ink btn-sm' : 'btn btn-paper btn-sm'}
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', height: 40 }}>
          {added ? (<>{Icons.check(12)} {t('menu.added')}</>) : (<>{Icons.plus(12)} {t('menu.add')}</>)}
        </button>
      </div>
    </article>
  );
}

Object.assign(window, { MenuScreen, DishCard });
