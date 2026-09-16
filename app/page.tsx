import { HomeExperience } from '@/components/home-experience';
import './home-experience.css';

export const revalidate = 3600;

export default function HomePage() {
  return <HomeExperience />;
}
