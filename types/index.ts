export type ProductProfile = 'strawberry' | 'citrus';

export type Product = {
  id: string;
  slug: string;
  name: string;
  profile: ProductProfile;
  eyebrow: string;
  description: string;
  longDescription: string;
  accent: 'red' | 'orange';
  notes: string[];
  ingredients: string[];
  price: number;
  compareAt?: number;
  availablePacks: Array<{ quantity: 5 | 10 | 20; price: number; label: string }>;
  badge?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  rating?: number;
  reviewCount?: number;
  verificationRequired: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  pack: 5 | 10 | 20;
  packPrice: number;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
};

