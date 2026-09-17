import { HomeExperience } from '@/components/home-experience';
import './home-experience.css';
import { getProducts } from '@/lib/product-catalog';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts();
  return <HomeExperience products={products} />;
}
