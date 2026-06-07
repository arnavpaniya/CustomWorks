import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CorporateBanner() {
  return (
    <section className="py-16 bg-white" aria-labelledby="corporate-banner-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-brand-border rounded-3xl px-8 sm:px-12 py-14 flex flex-col sm:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-md hover:shadow-lg transition-shadow duration-250">
          {/* Decorative */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-brand-black/5 blur-3xl" />
 
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-black/5 text-brand-black/70 text-xs font-medium border border-brand-black/10 mb-4">
              <Building2 size={12} />
              For Businesses & Teams
            </div>
            <h2 id="corporate-banner-heading" className="text-3xl sm:text-4xl font-serif font-light text-brand-black mb-3 leading-tight tracking-tight">
              Need Bulk Orders<br />for Your <span className="italic font-normal">Business?</span>
            </h2>
            <p className="text-brand-muted max-w-md text-sm leading-relaxed">
              Corporate gifting, team products, event swag — we handle everything.
              Dedicated account manager, custom packaging, bulk pricing.
            </p>
          </div>
 
          <div className="relative flex flex-col gap-3 shrink-0">
            <Link href="/corporate">
              <Button variant="accent" size="lg" className="group min-w-44">
                Get a Quote
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919632022529"}?text=Hi, I'm interested in bulk/corporate orders`} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-brand-border text-brand-black hover:bg-brand-surface min-w-44"
              >
                Chat on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
