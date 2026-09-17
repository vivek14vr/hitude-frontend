export type ProductProfile = 'strawberry' | 'citrus';
export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type ProductPack = {
  quantity: number;
  price: number;
  label: string;
};

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
  availablePacks: ProductPack[];
  badge?: string;
  status: ProductStatus;
  rating?: number;
  reviewCount?: number;
  verificationRequired: boolean;
  publishReady: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  pack: number;
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
