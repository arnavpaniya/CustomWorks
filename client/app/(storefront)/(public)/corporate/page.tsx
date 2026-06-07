import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Package, Star, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Corporate & Bulk Orders",
  description: "Premium custom products for your team, event, or brand.",
};

const benefits = [
  {
    icon: Star,
    title: "Premium Quality",
    desc: "We use top-tier materials and state-of-the-art printing techniques to ensure your brand looks its absolute best."
  },
  {
    icon: Package,
    title: "Volume Discounts",
    desc: "The more you order, the more you save. We offer structured pricing tiers for bulk quantities starting from 50 units."
  },
  {
    icon: Zap,
    title: "Dedicated Support",
    desc: "Get a dedicated account manager to assist with design setup, sampling, production tracking, and delivery logistics."
  },
  {
    icon: Building2,
    title: "End-to-End Fulfilment",
    desc: "From designing to individual packaging and multi-location shipping, we handle the entire supply chain."
  }
];

const processSteps = [
  "Share your requirements and artwork.",
  "We provide a custom quote and digital mockups.",
  "Approve a physical or digital sample.",
  "Production begins followed by quality check.",
  "Delivered safely to your office or multiple addresses."
];

export default function CorporatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Corporate & Bulk
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-brand-black mb-6 tracking-tight">
          Custom Products That Mean <br className="hidden sm:block" /> Business
        </h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Anything for your brand that can be custom-made, crafted by us with premium quality and delivered straight to you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:orders.customworks@gmail.com">
            <Button variant="accent" size="lg" className="w-full sm:w-auto px-8">
              Request a Quote
            </Button>
          </a>
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 gap-2">
              Browse Catalog <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon;
          return (
            <div key={i} className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-brand-surface flex items-center justify-center mb-6">
                <Icon size={24} className="text-brand-black" />
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3">{benefit.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{benefit.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-brand-black rounded-[3rem] p-8 sm:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">How It Works</h2>
          <div className="space-y-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20 font-bold text-brand-orange">
                  {idx + 1}
                </div>
                <p className="text-zinc-300 pt-1">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-white/10">
            <h3 className="font-bold text-xl mb-4">Ready to start?</h3>
            <p className="text-zinc-400 mb-6">Contact our corporate team directly on WhatsApp for immediate assistance.</p>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919632022529"}`} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] border-none shadow-lg">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                 <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-2">👕</span>
                    <span className="font-bold text-sm text-zinc-300">Apparel</span>
                 </div>
                 <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-2">☕</span>
                    <span className="font-bold text-sm text-zinc-300">Drinkware</span>
                 </div>
              </div>
              <div className="space-y-4 mt-8">
                 <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-2">📓</span>
                    <span className="font-bold text-sm text-zinc-300">Stationery</span>
                 </div>
                 <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-2">🏷️</span>
                    <span className="font-bold text-sm text-zinc-300">Accessories</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
