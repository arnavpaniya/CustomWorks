"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  gradient: string;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    name: "Custom Business Cards (Visiting Cards)",
    slug: "custom-business-cards",
    category: "Business Cards",
    startingPrice: 1,
    rating: 4.9,
    reviewCount: 342,
    badge: "Best Seller",
    gradient: "from-zinc-100 to-zinc-200",
  },
  {
    id: "w2",
    name: "Custom Vinyl Banners & Signs",
    slug: "custom-banners",
    category: "Signage & Display",
    startingPrice: 22,
    rating: 4.8,
    reviewCount: 112,
    badge: "Fast Shipping",
    gradient: "from-amber-50 to-orange-100",
  },
  {
    id: "w3",
    name: "Corporate ID Cards & Lanyards",
    slug: "id-lanyards",
    category: "ID & Lanyards",
    startingPrice: 15,
    rating: 4.9,
    reviewCount: 201,
    gradient: "from-emerald-50 to-teal-100",
  },
  {
    id: "w4",
    name: "Custom Table Calendars",
    slug: "custom-calendars",
    category: "Calendars & Planners",
    startingPrice: 135,
    rating: 4.8,
    reviewCount: 46,
    badge: "Corporate Favorite",
    gradient: "from-violet-50 to-purple-100",
  },
  {
    id: "w5",
    name: "Corporate Brand Notebook Diaries",
    slug: "corporate-diaries",
    category: "Calendars & Planners",
    startingPrice: 275,
    rating: 4.8,
    reviewCount: 77,
    gradient: "from-sky-50 to-blue-100",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-black">My Wishlist</h1>
          <p className="text-sm text-brand-muted mt-1">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" size="sm" className="gap-1.5">
            Browse Products <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {wishlist.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {wishlist.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden group hover:shadow-xl hover:border-brand-black/10 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div
                  className={`h-48 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}
                >
                  <ShoppingBag
                    size={36}
                    className="text-brand-muted/30"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-brand-border flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-brand-border shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                    {item.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-bold text-brand-black text-sm mt-1.5 mb-2 line-clamp-2 leading-snug">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <p className="text-sm text-brand-muted mb-3">
                    Starting from{" "}
                    <span className="font-black text-brand-black">
                      {formatPrice(item.startingPrice)}
                    </span>
                    <span className="text-xs">/unit</span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={
                            idx < Math.floor(item.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-zinc-200 fill-zinc-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-brand-muted">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>

                  {/* Actions */}
                  <Link href={`/products/${item.slug}`}>
                    <Button
                      variant="accent"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      {addedToCart === item.id ? (
                        "View Product →"
                      ) : (
                        <>
                          <ShoppingBag size={13} /> Customize & Order
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-brand-border p-16 text-center shadow-sm"
          >
            <div className="h-16 w-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <Heart size={28} className="text-red-300" />
            </div>
            <h3 className="font-bold text-brand-black text-lg mb-1">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-brand-muted mb-6 max-w-sm mx-auto">
              Save products you love here. Browse our catalog and tap the heart
              icon to add items to your wishlist.
            </p>
            <Link href="/products">
              <Button variant="accent" size="md" className="gap-1.5">
                Browse Products <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
