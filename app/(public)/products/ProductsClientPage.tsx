"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

const PRODUCTS = PRODUCTS_CATALOG;

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        {searchQuery ? (
          <>
            <p className="text-sm text-brand-muted mb-1">Search results for</p>
            <h1 className="text-3xl font-black text-brand-black">
              &ldquo;{searchQuery}&rdquo;
              <span className="ml-3 text-lg font-medium text-[#9A9A9A]">
                ({filtered.length} products)
              </span>
            </h1>
          </>
        ) : (
          <h1 className="text-3xl font-black text-brand-black">All Products</h1>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                selectedCategory === cat
                  ? "bg-brand-black text-white border-brand-black"
                  : "bg-white text-brand-muted border-brand-border hover:border-brand-black hover:text-brand-black",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Filter */}
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 px-3 rounded-lg border border-brand-border text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-black"
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
            className="gap-1.5"
          >
            <SlidersHorizontal size={14} />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white border border-brand-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Filters</h3>
                <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                  <X size={16} className="text-brand-muted" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-black">
                  Max Price: ₹{priceMax.toLocaleString("en-IN")}
                </label>
                <input
                  type="range"
                  min={0}
                  max={3000}
                  step={50}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full max-w-xs accent-black"
                  aria-label="Maximum price filter"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-brand-muted text-lg mb-4">No products found</p>
          <Button variant="outline" onClick={() => { setSelectedCategory("All"); setPriceMax(3000); }}>
            Clear filters
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
  );
}
