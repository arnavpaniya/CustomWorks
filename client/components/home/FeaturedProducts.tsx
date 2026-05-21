import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { Product } from "@/components/product/ProductCard";

import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

const DEMO_PRODUCTS = PRODUCTS_CATALOG.slice(0, 8);

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
