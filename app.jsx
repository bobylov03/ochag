// app.jsx — Main router, cart state, mounting

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "hearth",
  "heroVariant": "editorial",
  "cfgVariant": "cards",
  "paused": false,
  "density": "regular",
  "displayFont": "newsreader"
}/*EDITMODE-END*/;

function useRoute() {
  const parse = () => {
    const h = window.location.hash.replace(/^#\/?/, '');
    return h.split('?')[0] || 'home';
  };
  const [route, setRoute] = React.useState(parse());
  React.useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return [route, (r) => { window.location.hash = `#/${r}`; }];
}

function useCart() {
  const [cart, setCart] = React.useState(() => {
    try {
      const saved = sessionStorage.getItem('ochag_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  React.useEffect(() => {
    try { sessionStorage.setItem('ochag_cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  const addToCart = (item) => {
    setCart(c => {
      // If existing with same id, increment qty (for dishes); rations get replaced.
      const ex = c.find(x => x.id === item.id);
      if (ex && item.type !== 'ration') {
        return c.map(x => x.id === item.id ? { ...x, qty: x.qty + item.qty } : x);
      }
      if (item.type === 'ration') {
        // only one ration at a time
        return [...c.filter(x => x.type !== 'ration'), item];
      }
      return [...c, item];
    });
  };
  const updateCart = (id, qty) => setCart(c => c.map(x => x.id === id ? { ...x, qty } : x));
  const removeFromCart = (id) => setCart(c => c.filter(x => x.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, it) => acc + it.qty, 0);

  return { cart, cartCount, addToCart, updateCart, removeFromCart, clearCart };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route] = useRoute();
  const cartApi = useCart();

  // Apply tweaks to root data attrs
  React.useEffect(() => {
    document.documentElement.setAttribute('data-palette', t.palette);
    document.documentElement.setAttribute('data-density', t.density);
    if (t.displayFont === 'spectral') {
      document.documentElement.style.setProperty('--ff-display', '"Spectral", "Noto Serif Georgian", Georgia, serif');
    } else if (t.displayFont === 'vollkorn') {
      document.documentElement.style.setProperty('--ff-display', '"Vollkorn", "Noto Serif Georgian", Georgia, serif');
    } else if (t.displayFont === 'cormorant') {
      document.documentElement.style.setProperty('--ff-display', '"Cormorant Garamond", "Noto Serif Georgian", Georgia, serif');
    } else {
      document.documentElement.style.setProperty('--ff-display', '"Newsreader", "Noto Serif Georgian", Georgia, serif');
    }
  }, [t.palette, t.density, t.displayFont]);

  // Capture the current page for a11y / debug
  React.useEffect(() => {
    document.documentElement.setAttribute('data-screen', route);
  }, [route]);

  let Screen;
  switch (route) {
    case 'menu':     Screen = <MenuScreen addToCart={cartApi.addToCart} />; break;
    case 'about':    Screen = <AboutScreen />; break;
    case 'cart':     Screen = <CartScreen cart={cartApi.cart}
                                          updateCart={cartApi.updateCart}
                                          removeFromCart={cartApi.removeFromCart} />; break;
    case 'checkout': Screen = <CheckoutScreen cart={cartApi.cart}
                                              clearCart={cartApi.clearCart} />; break;
    case 'account':  Screen = <AccountScreen />; break;
    case 'home':
    default:         Screen = <HomeScreen tweaks={t} addToCart={cartApi.addToCart} />; break;
  }

  return (
    <I18nProvider>
      <div data-screen-label={`OCHAG · ${route}`}>
        <Nav route={route} cartCount={cartApi.cartCount} paused={t.paused} />
        {Screen}
        <Footer />
        <Tweaks t={t} setTweak={setTweak} />
      </div>
    </I18nProvider>
  );
}

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="OCHAG · tweaks">
      <TweakSection label="Palette">
        <TweakRadio label="Palette" value={t.palette}
                    options={[
                      { value: 'hearth', label: 'Hearth' },
                      { value: 'ember',  label: 'Ember' },
                      { value: 'olive',  label: 'Olive' },
                    ]}
                    onChange={(v) => setTweak('palette', v)} />
        <TweakSelect label="Display font" value={t.displayFont}
                     options={[
                       { value: 'newsreader', label: 'Newsreader (default)' },
                       { value: 'spectral',   label: 'Spectral' },
                       { value: 'vollkorn',   label: 'Vollkorn' },
                       { value: 'cormorant',  label: 'Cormorant Garamond' },
                     ]}
                     onChange={(v) => setTweak('displayFont', v)} />
      </TweakSection>

      <TweakSection label="Layout">
        <TweakSelect label="Hero variant" value={t.heroVariant}
                     options={[
                       { value: 'editorial',    label: 'Editorial (default)' },
                       { value: 'split',        label: 'Split / dark' },
                       { value: 'typographic',  label: 'Typographic' },
                     ]}
                     onChange={(v) => setTweak('heroVariant', v)} />
        <TweakSelect label="Configurator" value={t.cfgVariant}
                     options={[
                       { value: 'cards', label: 'Steps as cards (default)' },
                       { value: 'dial',  label: 'Hearth dial' },
                       { value: 'form',  label: 'Compact form' },
                     ]}
                     onChange={(v) => setTweak('cfgVariant', v)} />
        <TweakRadio label="Density" value={t.density}
                    options={['compact', 'regular', 'spacious']}
                    onChange={(v) => setTweak('density', v)} />
      </TweakSection>

      <TweakSection label="State">
        <TweakToggle label="Orders paused (banner)" value={t.paused}
                     onChange={(v) => setTweak('paused', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
