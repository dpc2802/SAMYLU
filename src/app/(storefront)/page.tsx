import HeroVideo from '@/components/ui/HeroVideo';
import ShopByCategory from '@/components/sections/ShopByCategory';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import ManifestoSection from '@/components/sections/ManifestoSection';
import LookbookSection from '@/components/sections/LookbookSection';

export default function Home() {
  return (
    <>
      <HeroVideo />
      <ShopByCategory />
      <FeaturedCollection />
      <ManifestoSection />
      <LookbookSection />
    </>
  );
}
