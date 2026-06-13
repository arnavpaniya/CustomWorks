"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group bg-white flex flex-col justify-between rounded-2xl border border-zinc-200/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 relative",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-[#FAF6F0]/40 overflow-hidden rounded-t-2xl">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 block">
          <Image
            src={product.images[0] ?? "/images/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-contain p-5 sm:p-6 group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && <Badge variant="default" className="rounded-sm uppercase text-[8px] tracking-wider px-1.5 py-0.5 bg-narrative-clay text-white">New</Badge>}
          {product.badge && <Badge variant="warning" className="rounded-sm uppercase text-[8px] tracking-wider px-1.5 py-0.5 bg-narrative-ochre text-white">{product.badge}</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white border border-zinc-200/80 text-brand-muted hover:text-narrative-clay hover:bg-zinc-50 transition-all opacity-0 group-hover:opacity-100 shadow-xs z-10 cursor-pointer"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-black text-narrative-clay/70 uppercase tracking-widest block mb-1.5">
            {product.category}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-brand-black leading-snug mb-3 line-clamp-2">
            <Link href={`/products/${product.slug}`} className="hover:text-narrative-clay transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-2 pt-2 mt-auto border-t border-zinc-100">
          <p className="text-xs sm:text-sm font-black text-brand-black">
            {product.basePrice > 0 ? (
              <>
                {formatPrice(product.basePrice)} <span className="text-[9px] font-normal text-brand-muted uppercase">/ pc</span>
              </>
            ) : (
              <span className="text-[9px] font-black uppercase tracking-wider text-narrative-clay">Quote Only</span>
            )}
          </p>
          <Link href={`/products/${product.slug}`}>
            <button className="h-7 px-3.5 rounded-full bg-narrative-forest hover:bg-narrative-clay text-white text-[9px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer">
              Customize
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
