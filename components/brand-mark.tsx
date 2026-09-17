import Image from 'next/image';
import logo from '@/animation/logo/hitude_logo copy.png';

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <Image src={logo} alt="HITUDE" width={1408} height={1117} priority className={`h-14 w-auto object-contain sm:h-16 ${inverse ? 'brightness-0 invert' : ''}`} />;
}
