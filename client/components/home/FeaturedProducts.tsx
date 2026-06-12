import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

const DEMO_PRODUCTS = PRODUCTS_CATALOG.slice(0, 8);

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-white border-b border-zinc-200/60" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 select-none">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full">
              Trending
            </span>
            <h2 id="featured-heading" className="text-4xl sm:text-5xl font-serif font-light text-brand-black tracking-tight mt-4">
              Trending Custom <span className="italic font-normal">Products</span>
            </h2>
            <p className="text-sm text-brand-muted mt-2 max-w-md">
              Bespoke manufactured products customized around your brand specifications.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors"
          >
            Explore Catalogue
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Editorial Border-Joined Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-zinc-200/60 shadow-sm">
          {DEMO_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
