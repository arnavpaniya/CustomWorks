"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

const PRODUCTS = PRODUCTS_CATALOG;

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "popular", label: "Most Popular" },
];

interface ProductsClientPageProps {
  searchQuery?: string;
  urlCategory?: string;
}

export default function ProductsClientPage({
  searchQuery = "",
  urlCategory = "All",
}: ProductsClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sort, setSort] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(3000);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (selectedCategory !== "All") list = list.filter((p) => p.category === selectedCategory);
    list = list.filter((p) => p.basePrice <= priceMax);
    if (sort === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    else if (sort === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    else if (sort === "popular") list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return list;
  }, [searchQuery, selectedCategory, sort, priceMax]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero / Page Header */}
      <section className="bg-[#FAF6F0] py-12 sm:py-16 border-b border-zinc-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-narrative-clay/10 text-narrative-clay text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles size={10} /> Catalog
              </div>
              {searchQuery ? (
                <div>
                  <p className="text-xs text-narrative-forest/50 font-mono uppercase tracking-wider">Search Results For</p>
                  <h1 className="text-3xl sm:text-4xl font-bold font-serif text-narrative-forest mt-1">
                    &ldquo;{searchQuery}&rdquo;
                  </h1>
                </div>
              ) : (
                <h1 className="text-3xl sm:text-5xl font-bold font-serif text-narrative-forest leading-none">
                  All Products
                </h1>
              )}
              <p className="text-xs sm:text-sm text-narrative-forest/60 mt-2 font-light max-w-xl">
                Browse our collection of fully customizable items. Personalize them in real-time and order directly.
              </p>
            </div>
            
            <div className="text-xs text-narrative-forest/50 font-mono">
              SHOWING {filtered.length} OF {PRODUCTS.length} ITEMS
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-100">
          {/* Categories Pills */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer",
                  selectedCategory === cat
                    ? "bg-narrative-forest text-white border-narrative-forest shadow-sm"
                    : "bg-white text-narrative-forest/70 border-zinc-200/60 hover:border-zinc-400 hover:text-narrative-forest",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 px-3 rounded-xl border border-zinc-200/60 text-xs text-narrative-forest bg-white focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 cursor-pointer"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterOpen(!filterOpen)}
              className="h-9 gap-1.5 rounded-xl border-zinc-200/60 text-xs text-narrative-forest hover:bg-zinc-50"
            >
              <SlidersHorizontal size={13} />
              Filters
            </Button>
          </div>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#FAF6F0] border border-zinc-200/40 rounded-2xl p-6 mt-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xs font-mono text-narrative-forest uppercase tracking-wider">Refine Products</h3>
                  <button 
                    onClick={() => setFilterOpen(false)} 
                    aria-label="Close filters"
                    className="h-6 w-6 rounded-full flex items-center justify-center border border-zinc-200/40 hover:bg-white text-narrative-forest/70 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-w-xs">
                  <label className="text-xs font-semibold text-narrative-forest">
                    Max Price: ₹{priceMax.toLocaleString("en-IN")}
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={3000}
                    step={50}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-narrative-clay h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Maximum price filter"
                  />
                  <div className="flex justify-between text-[10px] text-narrative-forest/50 font-mono">
                    <span>₹200</span>
                    <span>₹3,000</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="mt-8 sm:mt-10">
          {filtered.length === 0 ? (
            <div className="py-20 text-center bg-[#FAF6F0] rounded-[2rem] border border-zinc-200/40 p-8">
              <p className="text-narrative-forest/60 text-lg mb-6 font-light">No products match your active filters.</p>
              <Button 
                variant="outline" 
                onClick={() => { setSelectedCategory("All"); setPriceMax(3000); }}
                className="rounded-full border-zinc-300 hover:bg-white text-xs font-bold px-6"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              layout
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
