import { Product, FAQItem, TestimonialItem, PressRelease } from './types';


export const PRODUCTS: Product[] = [
 
  {
    id: 'superpuffs-spanish-tomato',
    name: 'Superpuffs - Spanish Tomato',
    category: 'Superpuffs',
    price: 48.00,
    mrp: 50.00,
    weight: '50g',
    rating: 5,
    image: 'ragi-bag',
    badge: 'Best Seller',
    isNew: true,
    description: 'Juicy Mediterranean organic tomatoes seasoned on rich baked crisps for a tangy high-protein kick.',
    colorTheme: {
      bg: 'bg-red-500/10',
      text: 'text-red-700',
      accent: '#FF4D4D',
      chipColorBg: 'bg-red-600',
    }
  },
  {
    id: 'ragi-chips-original',
    name: 'Ragi Chips',
    category: 'Ragi Chips',
    price: 29.00,
    mrp: 30.00,
    weight: '30g',
    rating: 5,
    image: 'ragi-bag',
    badge: 'Crispy',
    description: 'Crisp whole finger-millet grains dry-convection baked to produce clean macro-balanced energy chips.',
    colorTheme: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-800',
      accent: '#D97706',
      chipColorBg: 'bg-amber-700',
    }
  },
  {
    id: '210690-superpuffs-hot-sweet-chilli-jar',
    name: 'Superpuffs- Hot & Sweet Chilli Jar Pack',
    category: 'Superpuffs',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'https://twirtles.com/wp-content/uploads/2026/04/45154623562-1-scaled.png',
    badge: 'Family Size',
    description: 'Large shareable airtight canister packed with hot & sweet chilli vitamin-fortified puffs.',
    colorTheme: {
      bg: 'bg-red-500/10',
      text: 'text-red-750',
      accent: '#EF4444',
      chipColorBg: 'bg-red-600',
    }
  },
  {
    id: '210690-superpuffs-creme-onion-jar',
    name: 'Superpuffs- Crème & Onion Jar Pack',
    category: 'Superpuffs',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'https://twirtles.com/wp-content/uploads/2026/04/45154623562-1-scaled.png',
    badge: 'Cozy Pack',
    description: 'Crispy high-protein creme & onion puff crisps in our large reusable jar.',
    colorTheme: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-800',
      accent: '#10B981',
      chipColorBg: 'bg-emerald-600',
    }
  },
  {
    id: '210690-superpuffs-indie-masala-jar',
    name: 'Superpuffs- Indie Masala Jar Pack',
    category: 'Superpuffs',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'https://twirtles.com/wp-content/uploads/2026/04/45154623562-1-scaled.png',
    badge: 'Spicy Masala',
    description: 'A traditional aromatic blend of Indian masalas coated onto our premium protein-dense puffs.',
    colorTheme: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-800',
      accent: '#EA580C',
      chipColorBg: 'bg-amber-600',
    }
  },
  {
    id: 'ragi-chips-peri-peri',
    name: 'Ragi Chips - Peri Peri',
    category: 'Ragi Chips',
    price: 189.00,
    mrp: 250.00,
    weight: '180g',
    rating: 5,
    image: 'ragi-peri-jar',
    badge: 'Popular',
    colorTheme: {
      bg: 'bg-orange-500/10',
      text: 'text-orange-800',
      accent: '#EA580C',
      chipColorBg: 'bg-orange-600',
    }
  },
  {
    id: 'superpuffs-creme-onion',
    name: 'Superpuffs - Crème N\' Onion',
    category: 'Superpuffs',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'green-onion',
    badge: 'New Flavor',
    colorTheme: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-800',
      accent: '#10B981',
      chipColorBg: 'bg-emerald-600',
    }
  },
  {
    id: 'quinoa-chips-sour-cream',
    name: 'Quinoa Chips - Sour Cream',
    category: 'Quinoa Chips',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'quinoa-jar',
    colorTheme: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-800',
      accent: '#0D9488',
      chipColorBg: 'bg-teal-600',
    }
  },
  {
    id: 'oats-chips-original',
    name: 'Oats Chips - Peri Peri',
    category: 'Oats Chips',
    price: 189.00,
    mrp: 250.00,
    weight: '180g',
    rating: 5,
    image: 'oats-bag',
    colorTheme: {
      bg: 'bg-amber-600/15',
      text: 'text-amber-900',
      accent: '#92400E',
      chipColorBg: 'bg-amber-800',
    }
  },
  {
    id: 'flavoured-makhana-cream-onion',
    name: 'Cream & Onion Makhana',
    category: 'Flavoured Makhana',
    price: 195.00,
    mrp: 239.00,
    weight: '75g',
    rating: 5,
    image: 'makhana-can-cream',
    badge: 'Classic',
    colorTheme: {
      bg: 'bg-amber-950/10',
      text: 'text-amber-800',
      accent: '#722F37',
      chipColorBg: 'bg-amber-800',
    }
  },
  {
    id: 'flavoured-makhana-salt',
    name: 'Himalayan Salt Makhana',
    category: 'Flavoured Makhana',
    price: 195.00,
    mrp: 239.00,
    weight: '75g',
    rating: 5,
    image: 'makhana-can-salt',
    badge: 'Popular',
    colorTheme: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-800',
      accent: '#0F4C5C',
      chipColorBg: 'bg-indigo-600',
    }
  },
  {
    id: 'flavoured-makhana-mint',
    name: 'Mint Makhana',
    category: 'Flavoured Makhana',
    price: 195.00,
    mrp: 239.00,
    weight: '75g',
    rating: 5,
    image: 'makhana-can-mint',
    badge: 'Fresh',
    colorTheme: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-800',
      accent: '#1E5E3A',
      chipColorBg: 'bg-emerald-600',
    }
  },
  {
    id: 'flavoured-makhana-peri-peri',
    name: 'Peri Peri Makhana',
    category: 'Flavoured Makhana',
    price: 195.00,
    mrp: 239.00,
    weight: '75g',
    rating: 5,
    image: 'makhana-can-peri',
    badge: 'Hot 🔥',
    colorTheme: {
      bg: 'bg-orange-500/10',
      text: 'text-orange-800',
      accent: '#A84222',
      chipColorBg: 'bg-orange-600',
    }
  },
  {
    id: 'flavoured-makhana-tandoori',
    name: 'Tandoori Makhana',
    category: 'Flavoured Makhana',
    price: 195.00,
    mrp: 239.00,
    weight: '75g',
    rating: 5,
    image: 'makhana-can-tandoori',
    badge: 'Get 9.5% Off',
    isNew: true,
    colorTheme: {
      bg: 'bg-amber-600/10',
      text: 'text-amber-900',
      accent: '#B45309',
      chipColorBg: 'bg-amber-700',
    }
  },
  {
    id: 'flavoured-makhana-combo',
    name: 'Makhana Combo Pack',
    category: 'Flavoured Makhana',
    price: 199.00,
    mrp: 250.00,
    weight: '150g',
    rating: 5,
    image: 'makhana-can-combo',
    badge: 'Best Value',
    colorTheme: {
      bg: 'bg-stone-500/10',
      text: 'text-stone-800',
      accent: '#5C3E35',
      chipColorBg: 'bg-stone-700',
    }
  },
  {
    id: 'beetroot-chips-himalayan-salt',
    name: 'Beetroot Chips - Pink Salt',
    category: 'Beetroot Chips',
    price: 189.00,
    mrp: 250.00,
    weight: '180g',
    rating: 5,
    image: 'beetroot-bag',
    badge: 'Superfood',
   
    colorTheme: {
  bg: 'bg-[#F5EBE0]',
  text: 'text-[#7F5539]',
  accent: '#9C6644',
  chipColorBg: 'bg-[#7F5539]',
}
  }
];

export const CATEGORIES = [
  {
    name: 'Superpuffs',
    count: '3 products',
    image: 'superpuffs-cat',
    accentColor: '#EF4444',
    bgStyle: 'bg-gradient-to-br from-red-600 to-amber-600 text-white',
  },
  {
    name: 'Ragi Chips',
    count: '4 products',
    image: 'ragi-cat',
    accentColor: '#D97706',
    bgStyle: 'bg-gradient-to-br from-yellow-100 to-amber-200 text-amber-950 border border-amber-300',
  },
  {
    name: 'Quinoa Chips',
    count: '2 products',
    image: 'quinoa-cat',
    accentColor: '#0F766E',
    bgStyle: 'bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-900 border border-teal-200',
  },
  {
    name: 'Oats Chips',
    count: '4 products',
    image: 'oats-cat',
    accentColor: '#854D0E',
    bgStyle: 'bg-gradient-to-br from-amber-50 to-orange-100 text-amber-900 border border-amber-200',
  },
  {
    name: 'Flavoured Makhana',
    count: '9 products',
    image: 'makhana-cat',
    accentColor: '#4338CA',
    bgStyle: 'bg-gradient-to-br from-violet-900 via-indigo-950 to-slate-900 text-white',
  },
  {
    name: 'Beetroot Chips',
    count: '4 products',
    image: 'beetroot-cat',
   accentColor: '#9C6644',
   bgStyle: 'bg-gradient-to-br from-[#FAF8F5] to-[#EDE0D4] text-[#7F5539] border border-[#D4A373]',
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'WHAT MAKES TWIRTLES DIFFERENT FROM OTHER HEALTHY SNACK BRANDS?',
    answer: 'Most healthy snacks make you choose — taste or nutrition. Twirtles doesn’t. Our Superpuffs deliver 12.5g of protein per serving, are baked not fried, and are fortified with micronutrients targeting real Indian deficiencies (B12, Iron, Calcium, Vitamin D2, Zinc). Our Makhana is roasted in composite cans — no seed oils, no compromise on shelf quality. The brand was born from a founder who was tired of making that trade-off himself.'
  },
  {
    question: 'WHERE CAN I FIND TWIRTLES PRODUCTS?',
    answer: 'We’re available at 1,000+ retail outlets across Delhi and growing cities, on Blinkit and Swiggy Instamart for 10-minute delivery, and on our website for direct orders. For retailers or institutions interested in stocking us, reach out via Contact us page . we work with distributors, vending operators, and corporate pantry programmes.'
  },
  {
    question: 'WHAT IF I DON\'T LIKE THE PRODUCT? IS THERE A RETURN OR REFUND POLICY?',
    answer: 'If you order directly from our website and aren’t happy, reach out to us at support@twirtles.com with product batch details. We’d rather fix it than lose you.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Riya Sharma',
    date: 'Jan 25, 2026',
    rating: 5,
    text: 'I\'ve tried many healthy snacks before, but Twirtles truly stands out! The flavors are amazing and the fact that it\'s high in protein makes it my go-to snack after workouts. Absolutely love it!'
  },
  {
    name: 'Aman Verma',
    date: 'Jan 2, 2026',
    rating: 5,
    text: 'Twirtles has completely changed my snacking habits. It\'s tasty, light, and guilt-free. The Cream N\' Onion flavor is my personal favorite. Highly recommended for anyone looking for healthy alternatives!'
  },
  {
    name: 'Karan Mehra',
    date: 'May 10, 2026',
    rating: 5,
    text: 'Baked, no palm oil, and high protein! Finally a brand that stands true to its label. The peri peri ragi chips are insanely addictive yet totally guilt-free!'
  }
];

export const PRESS_RELEASES: PressRelease[] = [
  {
    logo: 'msn',
    title: 'Twirtles launches Superpuffs, India\'s first protein chips fortified with vitamins and minerals',
    source: 'MSN News',
    snippet: 'Healthy snacking just saw a massive leap. Twirtles launches super-packed multigrain snacks with high protein & vitamin loads.',
    screenshotUrl: 'msn-screenshot'
  },
  {
    logo: 'cnbc',
    title: 'Twirtles Enters Protein Chips Market With Superpuffs',
    source: 'CNBC TV18',
    snippet: 'Fireside discussion on how startup Twirtles is innovating in the healthy Indian snack industry with baked multi-grain chips.',
    screenshotUrl: 'cnbc-screenshot'
  },
  {
    logo: 'tribune',
    title: 'Twirtles launches Superpuffs, India\'s first protein chips fortified with vitamins and minerals',
    source: 'The Tribune India',
    snippet: 'Snack Revolution: Twirtles is disrupting the junk food market by introducing premium nutritionally fortified finger foods.',
    screenshotUrl: 'tribune-screenshot'
  }
];
