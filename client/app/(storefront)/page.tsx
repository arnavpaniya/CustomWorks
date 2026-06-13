import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import MarqueeDivider from "@/components/home/MarqueeDivider";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CorporateBanner from "@/components/home/CorporateBanner";

export const metadata: Metadata = {
  title: "CustomWorks – Design Your Own Products",
  description:
    "Premium customization-first e-commerce. Design custom t-shirts, mugs, caps, and more. Made-to-order, delivered to your door.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <MarqueeDivider />
      <FeaturedProducts />
      <MarqueeDivider
        bgClass="bg-narrative-clay"
        textClass="text-[#FAF6F0]"
        starClass="text-narrative-forest"
        reverse={true}
        words={[
          "Custom Branded Apparel",
          "Fine Letterpress Cards",
          "Premium Cotton Totes",
          "Ceramic Workspace Mugs",
          "High-Impact Decals",
        ]}
      />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <CorporateBanner />
    </>
  );
}
