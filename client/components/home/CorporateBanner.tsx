"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function CorporateBanner() {
  return (
    <section
      className="py-20 sm:py-28 bg-[#FAF6F0]"
      aria-labelledby="corporate-banner-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large rounded forest card */}
        <div className="bg-narrative-forest text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg">
          {/* Decorative animated blobs */}
          <motion.div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-narrative-clay/15 blur-[80px]"
            animate={{ scale: [1, 1.15, 1], x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full bg-narrative-sage/15 blur-[60px]"
            animate={{ scale: [1, 1.1, 1], x: [0, -8, 0], y: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-narrative-ochre/10 blur-[70px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider mb-6 select-none">
                <Building2 size={14} className="stroke-[2]" />
                Corporate &amp; Team Orders
              </div>
              <h2
                id="corporate-banner-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight mb-5 select-none"
              >
                Need Bulk Custom Items{" "}
                <br className="hidden sm:block" />
                for Your{" "}
                <span className="italic font-normal text-narrative-ochre">
                  Business?
                </span>
              </h2>
              <p className="text-white/70 max-w-xl text-sm sm:text-base leading-relaxed font-light mb-8">
                We manufacture corporate apparel, custom office stationery,
                promotional giveaways, and branded signage at scale. Enjoy
                custom volume-based tier pricing, dedicated manufacturing
                support, and tailored packaging solutions.
              </p>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/corporate" className="w-full sm:w-auto">
                  <button className="w-full rounded-full bg-white text-narrative-forest hover:bg-white/90 h-12 sm:h-14 px-8 text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2.5 group cursor-pointer">
                    Request Bulk Quote
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
                <Link
                  href={`mailto:orders.customworks@gmail.com?subject=${encodeURIComponent("Bulk / corporate order quote request")}`}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full rounded-full border border-white/30 text-white hover:bg-white/10 h-12 sm:h-14 px-8 text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2.5 cursor-pointer">
                    <Mail size={16} />
                    Email Our Team
                  </button>
                </Link>
              </div>
            </div>

            {/* Right column - Styled image */}
            <div className="lg:col-span-5 relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/images/corporate_packaging.png"
                alt="Custom brand packaging boxes"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-narrative-forest/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
