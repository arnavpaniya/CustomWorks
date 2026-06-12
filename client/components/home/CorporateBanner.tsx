import Link from "next/link";
import { ArrowRight, Building2, Mail } from "lucide-react";

export default function CorporateBanner() {
  return (
    <section className="py-24 bg-[#FAFAFA] border-b border-zinc-200/60" aria-labelledby="corporate-banner-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gapless Grid Layout with Borders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-zinc-200/60 shadow-sm">
          
          {/* Main Content Block (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 p-8 sm:p-12 border-r border-b border-zinc-200/60 bg-white flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-zinc-200 text-brand-black text-[10px] font-black uppercase tracking-widest bg-zinc-50 mb-6">
                <Building2 size={12} className="stroke-[2.5]" />
                Corporate & Team Orders
              </div>
              <h2 id="corporate-banner-heading" className="text-4xl sm:text-5xl font-serif font-light text-brand-black leading-tight tracking-tight mb-4 select-none">
                Need Bulk Custom Items <br />for Your <span className="italic font-normal">Business?</span>
              </h2>
            </div>
            <p className="text-brand-muted max-w-xl text-sm leading-relaxed font-medium mt-4 lg:mt-0">
              We manufacture corporate apparel, custom office stationery, promotional giveaways, and branded signage at scale. Enjoy custom volume-based tier pricing, dedicated manufacturing support, and tailored packaging solutions.
            </p>
          </div>

          {/* Action CTAs Block (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 p-8 sm:p-12 border-r border-b border-zinc-200/60 bg-white flex flex-col justify-center gap-4">
            <Link href="/corporate" className="w-full">
              <button className="w-full h-12 px-6 rounded-md bg-brand-black hover:bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 group cursor-pointer">
                Request Bulk Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href={`mailto:orders.customworks@gmail.com?subject=${encodeURIComponent("Bulk / corporate order quote request")}`} className="w-full">
              <button className="w-full h-12 px-6 rounded-md bg-transparent hover:bg-zinc-50 text-brand-black text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 border border-zinc-200/80 flex items-center justify-center gap-2 cursor-pointer">
                <Mail size={14} />
                Email Our Team
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

