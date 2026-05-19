import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { Product } from "@/components/product/ProductCard";

const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "custom-printed-tshirt",
    name: "Custom Printed T-Shirt",
    basePrice: 499,
    images: ["/images/placeholder-product.jpg"],
    category: "T-Shirts",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
  },
  {
    id: "2",
    slug: "custom-ceramic-mug",
    name: "Custom Ceramic Mug",
    basePrice: 299,
    images: ["/images/placeholder-product.jpg"],
    category: "Mugs",
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "3",
    slug: "custom-snapback-cap",
    name: "Custom Snapback Cap",
    basePrice: 599,
    images: ["/images/placeholder-product.jpg"],
    category: "Caps",
    rating: 4.7,
    reviewCount: 56,
    badge: "Popular",
  },
  {
    id: "4",
    slug: "custom-hoodie",
    name: "Custom Embroidered Hoodie",
    basePrice: 999,
    images: ["/images/placeholder-product.jpg"],
    category: "Hoodies",
    rating: 4.9,
    reviewCount: 201,
    isNew: true,
  },
  {
    id: "5",
    slug: "custom-tote-bag",
    name: "Custom Canvas Tote Bag",
    basePrice: 349,
    images: ["/images/placeholder-product.jpg"],
    category: "Bags",
    rating: 4.5,
    reviewCount: 43,
  },
  {
    id: "6",
    slug: "custom-phone-case",
    name: "Custom Phone Case",
    basePrice: 399,
    images: ["/images/placeholder-product.jpg"],
    category: "Accessories",
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: "7",
    slug: "custom-polo-shirt",
    name: "Custom Polo Shirt",
    basePrice: 649,
    images: ["/images/placeholder-product.jpg"],
    category: "T-Shirts",
    rating: 4.7,
    reviewCount: 88,
    badge: "Best Seller",
  },
  {
    id: "8",
    slug: "custom-water-bottle",
    name: "Custom Steel Water Bottle",
    basePrice: 549,
    images: ["/images/placeholder-product.jpg"],
    category: "Drinkware",
    rating: 4.6,
    reviewCount: 35,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-2">
              Popular Products
            </p>
            <h2 id="featured-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-brand-black tracking-tight mt-1">
              Trending Custom <span className="italic font-normal">Products</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-black transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {DEMO_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link href="/products">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-black">
              View all products <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
