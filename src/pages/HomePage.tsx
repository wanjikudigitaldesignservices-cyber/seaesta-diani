import { Hero } from '@/components/home/Hero';
import { LocationCards } from '@/components/home/LocationCards';
import { TrustBar } from '@/components/home/TrustBar';

export function HomePage() {
  return (
    <>
      <Hero />
      <LocationCards />
      <TrustBar />
    </>
  );
}
