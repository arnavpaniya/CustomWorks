"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  slug: string;
  name: string;
  basePrice: number;
  images: string[];
  category: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-lg transition-shadow duration-300",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-brand-surface overflow-hidden">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 block">
          <Image
            src={product.images[0] ?? "/images/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="default">New</Badge>}
          {product.badge && <Badge variant="warning">{product.badge}</Badge>}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-brand-muted hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={15} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#9A9A9A] uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-brand-black leading-tight mb-2 line-clamp-2">
          <Link href={`/products/${product.slug}`} className="hover:text-brand-orange hover:underline transition-all">
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  className={
                    star <= Math.round(product.rating!)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-brand-border text-brand-border"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-brand-muted">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-bold text-brand-black">
            {product.basePrice > 0 ? `From ${formatPrice(product.basePrice)}` : 'Price on Request'}
          </p>
          <Link href={`/products/${product.slug}`}>
            <Button variant="accent" size="sm">
              Customize
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
