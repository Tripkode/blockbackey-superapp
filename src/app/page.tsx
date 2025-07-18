import FooterSection from "@/components/principal/footer/FooterSection";
import HeroSection from "@/components/principal/hero/HeroSection";
import BakeryCategories from "@/components/principal/promotion/menuCarrusel";
import PromotionsCarousel from "@/components/principal/promotion/Promotions";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromotionsCarousel />
      <BakeryCategories />
      <PromotionsCarousel />
      <PromotionsCarousel />
      <PromotionsCarousel />
      <FooterSection />
    </>
  );
}
