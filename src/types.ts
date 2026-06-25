export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  weight?: string;
  rating: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  description?: string;
  colorTheme: {
    bg: string;
    text: string;
    accent: string;
    chipColorBg: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  date: string;
  rating: number;
  text: string;
}

export interface PressRelease {
  logo: string;
  title: string;
  source: string;
  snippet: string;
  screenshotUrl: string;
}