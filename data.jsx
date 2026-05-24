// data.jsx — menu data, configurator options, sample orders

// ─────────── Configurator ───────────
const KCAL_OPTIONS = [
  { id: 1700, key: '1700', meals: 5, color: 'olive',   protein: 110, fat: 55, carb: 180 },
  { id: 2200, key: '2200', meals: 5, color: 'terra',   protein: 140, fat: 75, carb: 235 },
  { id: 3000, key: '3000', meals: 5, color: 'wine',    protein: 180, fat: 105, carb: 320 },
];

// price per day base (₾) for 2200 kcal — others scale proportionally
const PRICE_PER_DAY = { 1700: 45, 2200: 52, 3000: 65 };

const DURATION_OPTIONS = [
  { days: 1,  discount: 0,    delivery: 7, label: '1' },
  { days: 3,  discount: 0,    delivery: 7, label: '3' },
  { days: 5,  discount: 0,    delivery: 7, label: '5' },
  { days: 7,  discount: 0,    delivery: 7, label: '7' },
  { days: 14, discount: 0.05, delivery: 0, label: '14', popular: true },
  { days: 28, discount: 0.10, delivery: 0, label: '28' },
];

// ─────────── Menu (sample dishes — 24 items) ───────────
const DISHES = [
  { id: 'd01', cat: 'bowls',    name_ru: 'Боул с лососем и киноа',           name_en: 'Salmon & quinoa bowl',         name_ge: 'სალამონის ბოული',          kcal: 540, p: 38, f: 22, c: 42, price: 28, tags: ['gf'],          tone: 'terra',   src: 'images/hero-salmon-bowl.jpg' },
  { id: 'd02', cat: 'bowls',    name_ru: 'Боул с курицей и булгуром',         name_en: 'Chicken bulgur bowl',          name_ge: 'ქათამის ბოული',           kcal: 480, p: 42, f: 14, c: 52, price: 22, tags: [],              tone: 'mustard' },
  { id: 'd03', cat: 'bowls',    name_ru: 'Поке с тунцом и манго',             name_en: 'Tuna mango poke',              name_ge: 'ტუნას პოკე',              kcal: 510, p: 36, f: 16, c: 58, price: 32, tags: ['gf', 'lf'],   tone: 'terra'   },
  { id: 'd04', cat: 'bowls',    name_ru: 'Боул будды с тофу',                  name_en: 'Buddha tofu bowl',             name_ge: 'ბუდას ბოული',             kcal: 460, p: 22, f: 18, c: 64, price: 19, tags: ['veg', 'gf'],  tone: 'olive'   },
  { id: 'd05', cat: 'pasta',    name_ru: 'Паста с креветкой и томатом',       name_en: 'Shrimp tomato pasta',          name_ge: 'პასტა კრევეტებით',        kcal: 580, p: 28, f: 18, c: 78, price: 26, tags: [],              tone: 'wine'    },
  { id: 'd06', cat: 'pasta',    name_ru: 'Паппарделле с говядиной',           name_en: 'Beef pappardelle',             name_ge: 'პაპარდელე ხორცით',        kcal: 640, p: 34, f: 22, c: 82, price: 28, tags: [],              tone: 'wine'    },
  { id: 'd07', cat: 'pasta',    name_ru: 'Карбонара классическая',            name_en: 'Carbonara classic',            name_ge: 'კარბონარა',               kcal: 690, p: 32, f: 28, c: 78, price: 24, tags: [],              tone: 'mustard' },
  { id: 'd08', cat: 'pasta',    name_ru: 'Песто с курицей',                    name_en: 'Chicken pesto pasta',          name_ge: 'პესტო ქათამით',           kcal: 590, p: 36, f: 22, c: 68, price: 22, tags: [],              tone: 'olive'   },
  { id: 'd09', cat: 'salads',   name_ru: 'Цезарь с курицей-гриль',             name_en: 'Grilled chicken Caesar',       name_ge: 'ცეზარი ქათამით',          kcal: 420, p: 38, f: 18, c: 28, price: 22, tags: [],              tone: 'mustard' },
  { id: 'd10', cat: 'salads',   name_ru: 'Греческий с фетой',                  name_en: 'Greek with feta',              name_ge: 'ბერძნული ფეტათი',         kcal: 380, p: 14, f: 24, c: 26, price: 19, tags: ['veg', 'gf'],  tone: 'olive'   },
  { id: 'd11', cat: 'salads',   name_ru: 'Салат с креветкой и авокадо',        name_en: 'Shrimp avocado salad',         name_ge: 'სალათა კრევეტებით',       kcal: 360, p: 24, f: 22, c: 18, price: 28, tags: ['gf', 'lf'],   tone: 'terra'   },
  { id: 'd12', cat: 'salads',   name_ru: 'Свекла, козий сыр, орех',            name_en: 'Beet, goat cheese, walnut',    name_ge: 'ჭარხალი თხის ყველით',     kcal: 320, p: 12, f: 22, c: 24, price: 18, tags: ['veg', 'gf'],  tone: 'wine'    },
  { id: 'd13', cat: 'soups',    name_ru: 'Чихиртма куриная',                   name_en: 'Georgian chikhirtma',          name_ge: 'ჩიხირთმა',                kcal: 280, p: 22, f: 14, c: 18, price: 16, tags: ['gf'],          tone: 'mustard' },
  { id: 'd14', cat: 'soups',    name_ru: 'Том-ям с креветкой',                 name_en: 'Tom yum shrimp',               name_ge: 'ტომ-იამი',                kcal: 310, p: 24, f: 12, c: 28, price: 22, tags: ['gf', 'lf'],   tone: 'terra'   },
  { id: 'd15', cat: 'soups',    name_ru: 'Тыквенный с имбирём',                name_en: 'Pumpkin ginger soup',          name_ge: 'გოგრის სუპი',             kcal: 240, p: 8,  f: 14, c: 26, price: 14, tags: ['veg', 'gf', 'lf'], tone: 'mustard' },
  { id: 'd16', cat: 'soups',    name_ru: 'Минестроне овощной',                 name_en: 'Minestrone',                   name_ge: 'მინესტრონე',              kcal: 220, p: 8,  f: 6,  c: 32, price: 14, tags: ['veg', 'lf'],  tone: 'olive'   },
  { id: 'd17', cat: 'mains',    name_ru: 'Лосось с пюре из батата',            name_en: 'Salmon, sweet potato mash',    name_ge: 'სალამონი',                kcal: 540, p: 38, f: 22, c: 38, price: 34, tags: ['gf'],          tone: 'terra'   },
  { id: 'd18', cat: 'mains',    name_ru: 'Куриная грудка с овощами-гриль',     name_en: 'Chicken, grilled veg',         name_ge: 'ქათამი ბოსტნეულით',        kcal: 460, p: 44, f: 14, c: 34, price: 24, tags: ['gf', 'lf'],   tone: 'olive'   },
  { id: 'd19', cat: 'mains',    name_ru: 'Говяжьи стейк-полоски',              name_en: 'Beef stir-fry strips',         name_ge: 'საქონლის ხორცი',          kcal: 520, p: 42, f: 22, c: 38, price: 32, tags: ['gf', 'lf'],   tone: 'wine'    },
  { id: 'd20', cat: 'mains',    name_ru: 'Хачапури-боул',                      name_en: 'Khachapuri bowl',              name_ge: 'ხაჭაპურის ბოული',         kcal: 580, p: 24, f: 28, c: 58, price: 22, tags: ['veg'],         tone: 'mustard' },
  { id: 'd21', cat: 'breakfast',name_ru: 'Овсянка с орехами и ягодой',         name_en: 'Oats, nuts, berries',          name_ge: 'შვრიის ფაფა',             kcal: 360, p: 14, f: 14, c: 48, price: 14, tags: ['veg'],         tone: 'mustard' },
  { id: 'd22', cat: 'breakfast',name_ru: 'Яичница с авокадо и шпинатом',       name_en: 'Eggs, avocado, spinach',       name_ge: 'კვერცხი ავოკადოთი',       kcal: 420, p: 22, f: 28, c: 18, price: 18, tags: ['veg', 'gf'],  tone: 'olive'   },
  { id: 'd23', cat: 'desserts', name_ru: 'Творожный мусс с малиной',           name_en: 'Cottage mousse, raspberry',    name_ge: 'ხაჭოს მუსი',              kcal: 240, p: 14, f: 10, c: 22, price: 12, tags: ['veg', 'gf'],  tone: 'rose'    },
  { id: 'd24', cat: 'desserts', name_ru: 'Шоколадно-авокадовый пудинг',        name_en: 'Choco-avocado pudding',        name_ge: 'შოკოლადის პუდინგი',        kcal: 280, p: 8,  f: 16, c: 28, price: 14, tags: ['veg', 'lf', 'gf'], tone: 'wine' },
];

// ─────────── Week menu sample (per-day plate) ───────────
const WEEK_MENU = [
  { day: 'mon', dishes: ['d02', 'd13', 'd09', 'd17', 'd21'] },
  { day: 'tue', dishes: ['d04', 'd14', 'd11', 'd06', 'd22'] },
  { day: 'wed', dishes: ['d01', 'd15', 'd10', 'd18', 'd21'] },
  { day: 'thu', dishes: ['d03', 'd13', 'd08', 'd19', 'd22'] },
  { day: 'fri', dishes: ['d05', 'd16', 'd12', 'd17', 'd23'] },
  { day: 'sat', dishes: ['d07', 'd14', 'd09', 'd20', 'd24'] },
  { day: 'sun', dishes: ['d02', 'd15', 'd11', 'd19', 'd23'] },
];

// ─────────── Sample customer (for Account screen) ───────────
const SAMPLE_USER = {
  name: 'Анна',
  email: 'anna@ochag.ge',
  phone: '+995 591 12 34 56',
  joined: '2024-09-12',
  active: {
    package: '2200',
    duration: 14,
    startedOn: '2026-05-19',
    endsOn: '2026-06-01',
    deliveredDays: 5,
    nextDelivery: '2026-05-25',
    window: '10:00–11:00',
    address: 'Чавчавадзе 37, кв. 14',
  },
  history: [
    { id: 'OCH-2104', date: '2026-05-04', package: '2200', days: 14, total: 728,  status: 'completed' },
    { id: 'OCH-2087', date: '2026-04-19', package: '1700', days: 7,  total: 322,  status: 'completed' },
    { id: 'OCH-2032', date: '2026-03-22', package: '2200', days: 28, total: 1310, status: 'completed' },
    { id: 'OCH-1998', date: '2026-02-28', package: '3000', days: 7,  total: 455,  status: 'completed' },
  ],
  addresses: [
    { id: 'a1', label: 'Дом',   line: 'Чавчавадзе 37, кв. 14, 4 этаж, код 1234', primary: true },
    { id: 'a2', label: 'Офис',  line: 'Меликишвили 14, офис 302, лифт справа',    primary: false },
  ],
};

// ─────────── Testimonials ───────────
const TESTIMONIALS = [
  { id: 't1', name: 'Нино Г.',   role: 'Тбилиси',   quote_ru: 'Заказывала на 14 дней «попробовать» — уже четвёртый месяц подряд. Завтрак никогда не пропускаю, и это впервые в жизни.',                quote_en: 'Tried 14 days. Four months later, still here. First time in my life I don\'t skip breakfast.', quote_ge: '14 დღე გავცადე — უკვე მეოთხე თვეა.', rating: 5 },
  { id: 't2', name: 'Davit M.',  role: 'Vake',      quote_ru: 'Работаю из дома, на готовку не хватало воли. Очаг закрыл эту дыру: открыл ящик — и обед готов. Простой и вкусный.',                  quote_en: 'I work from home and never had willpower for cooking. Ochag closed that gap: open the box, lunch is done.', quote_ge: 'ვმუშაობ სახლიდან, საჭმელი არ მქონდა დრო.', rating: 5 },
  { id: 't3', name: 'Sarah K.',  role: 'Saburtalo', quote_ru: 'Calorie info is actually accurate — I checked against my Garmin. Food tastes like a friend cooked it for me, not a factory.',          quote_en: 'Calorie info is actually accurate — I cross-checked it. Food tastes like a friend cooked it, not a factory.', quote_ge: 'კალორიების ინფორმაცია ნამდვილად ზუსტია.', rating: 5 },
  { id: 't4', name: 'Илья В.',   role: 'Сабуртало', quote_ru: 'Курьер впервые позвонил за 5 минут — я даже не успел удивиться. И всегда тёплая еда. Это базовая гигиена сервиса, но её мало кто держит.', quote_en: 'Courier called 5 min before arrival, always warm food. Basic, but rare.', quote_ge: 'კურიერი ყოველთვის ზუსტად ჩამოდის.', rating: 5 },
];

Object.assign(window, {
  KCAL_OPTIONS, PRICE_PER_DAY, DURATION_OPTIONS,
  DISHES, WEEK_MENU, SAMPLE_USER, TESTIMONIALS,
});