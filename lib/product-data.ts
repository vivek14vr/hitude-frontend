import type { BlogPost, Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-sassy-hi',
    slug: 'sassy-hi',
    name: 'Sassy Hi',
    profile: 'strawberry',
    eyebrow: 'A bright, berry-led profile',
    description: 'A thoughtful ritual with soft strawberry notes and a clean finish.',
    longDescription: 'Sassy Hi is made for the days you want a little more ease in your evening. Each gummy is designed as a discreet, measured ritual with a bright strawberry profile.',
    accent: 'red',
    notes: ['Strawberry', 'Soft', 'Bright'],
    ingredients: ['Vijaya leaf extract', 'Pectin', 'Natural strawberry flavour', 'Cane sugar'],
    price: 499,
    compareAt: 599,
    availablePacks: [
      { quantity: 5, price: 199, label: 'Curious · 5 gummies' },
      { quantity: 10, price: 349, label: 'Daily · 10 gummies' },
      { quantity: 20, price: 499, label: 'Ritual · 20 gummies' },
    ],
    badge: 'Bestseller',
    status: 'in_stock',
    rating: 4.8,
    reviewCount: 0,
    verificationRequired: true,
  },
  {
    id: 'prod-sassy-attitude',
    slug: 'sassy-attitude',
    name: 'Sassy Attitude',
    profile: 'citrus',
    eyebrow: 'A crisp, citrus-forward profile',
    description: 'A zesty ritual with orange peel brightness and a more grounded finish.',
    longDescription: 'Sassy Attitude brings a crisp citrus profile to a considered wellness ritual. Dewaxed for a cleaner experience, with terpene notes that keep the finish fresh.',
    accent: 'orange',
    notes: ['Orange', 'Crisp', 'Grounded'],
    ingredients: ['Vijaya leaf extract', 'Pectin', 'Natural citrus flavour', 'Cane sugar'],
    price: 499,
    compareAt: 599,
    availablePacks: [
      { quantity: 5, price: 199, label: 'Curious · 5 gummies' },
      { quantity: 10, price: 349, label: 'Daily · 10 gummies' },
      { quantity: 20, price: 499, label: 'Ritual · 20 gummies' },
    ],
    badge: 'New profile',
    status: 'low_stock',
    rating: 4.7,
    reviewCount: 0,
    verificationRequired: true,
  },
];

export const posts: BlogPost[] = [
  {
    slug: 'a-beginners-guide-to-vijaya',
    category: 'Foundations',
    title: 'A considered introduction to Vijaya',
    excerpt: 'What to know about the plant, the ritual, and the questions worth asking before you begin.',
    readTime: '5 min read',
    date: 'Editorial draft · verify before publishing',
  },
  {
    slug: 'how-to-read-a-gummy-label',
    category: 'Education',
    title: 'How to read a gummy label with confidence',
    excerpt: 'A practical framework for understanding ingredients, serving size, and the details that matter.',
    readTime: '4 min read',
    date: 'Editorial draft · verify before publishing',
  },
  {
    slug: 'building-a-responsible-evening-ritual',
    category: 'Responsible use',
    title: 'Building a responsible evening ritual',
    excerpt: 'Simple ways to create intention around any new wellness habit.',
    readTime: '6 min read',
    date: 'Editorial draft · verify before publishing',
  },
];

export const faqs = [
  { question: 'What is Vijaya?', answer: 'Vijaya is the plant ingredient used in our formulations. We keep our education clear and encourage you to review the full label and responsible-use information before ordering.' },
  { question: 'Do I need verification to order?', answer: 'Our checkout is designed to support age and eligibility checks. Whether verification is required depends on your location and the final compliance rules for your order.' },
  { question: 'How are the gummies delivered?', answer: 'Delivery availability and timing are location-dependent. Use the pincode checker on a product page or at checkout for the most relevant result.' },
  { question: 'Can I speak with someone before ordering?', answer: 'Yes. Our consultation request flow lets you share a question and preferred time. A qualified team member can follow up with next steps.' },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
