import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Package, Star, Zap, Sparkles, ArrowRight } from "lucide-react";
import CorporateForm from "@/components/corporate/CorporateForm";

export const metadata: Metadata = {
  title: "Corporate & Bulk Orders – CustomWorks",
  description: "Premium custom products for your team, event, or brand. Order in bulk with CustomWorks.",
};

const benefits = [
  {
    icon: Star,
    title: "Unmatched Print Quality",
    desc: "We use high-fidelity, industry-leading printing methods and top-grade materials to guarantee your brand looks incredibly premium.",
    bgClass: "bg-narrative-clay/10 border-narrative-clay/15 text-narrative-clay"
  },
  {
    icon: Package,
    title: "Tiered Volume Discounts",
    desc: "Scale your order and save. We offer highly competitive pricing tiers for corporate batches starting from just 10 units.",
    bgClass: "bg-narrative-ochre/10 border-narrative-ochre/15 text-narrative-ochre"
  },
  {
    icon: Zap,
    title: "Dedicated Account Managers",
    desc: "Get direct support from design setup and physical sampling to final production and doorstep shipping logistics.",
    bgClass: "bg-narrative-sage/10 border-narrative-sage/15 text-narrative-sage"
  },
  {
    icon: Building2,
    title: "End-to-End Fulfilment",
    desc: "We handle the entire supply chain, including individual gift packaging and distribution across multiple locations.",
    bgClass: "bg-narrative-forest/10 border-narrative-forest/15 text-narrative-forest"
  }
];

const processSteps = [
  { title: "Define Requirements", desc: "Share your product needs, artwork, and approximate volume." },
  { title: "Get Digital Mockups", desc: "Our team shares a customized commercial quote and print blueprints." },
  { title: "Sample Validation", desc: "Approve a digital prototype or physical sample before bulk run." },
  { title: "Production & QC", desc: "We manufacture your order and inspect every item for flawless quality." },
  { title: " Bengaluru Delivery", desc: "Safely shipped directly to your corporate headquarters or office hubs." }
];

export default function CorporatePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header Section */}
      <section className="bg-[#FAF6F0] py-16 sm:py-24 border-b border-zinc-200/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-narrative-clay/10 text-narrative-clay text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={12} /> B2B & Bulk Solutions
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-serif text-narrative-forest leading-[1.1] tracking-tight">
                Custom products that <br />
                <span className="text-narrative-clay italic font-normal">mean business</span>
              </h1>
              <p className="text-narrative-forest/75 text-lg leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                Enhance your brand identity with custom uniforms, stationery, and curated client gifts. Crafted with premium finishes and delivered on time.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="#quote-form" className="inline-block">
                  <button className="h-12 px-8 rounded-full bg-narrative-forest hover:bg-narrative-clay text-white font-bold text-sm tracking-wide shadow-md transition-all duration-300">
                    Get Custom Quote
                  </button>
                </a>
                <a href="#how-it-works" className="inline-block">
                  <button className="h-12 px-6 rounded-full border border-zinc-300 hover:bg-zinc-50 text-narrative-forest font-semibold text-sm transition-colors">
                    Learn Our Process
                  </button>
                </a>
              </div>
            </div>

            {/* Right Col - Image banner */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border border-zinc-200/20">
                <Image
                  src="/images/corporate_team.jpg"
                  alt="CustomWorks corporate branding solutions team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-narrative-clay tracking-wider uppercase">WHY CHOOSE US</span>
          <h2 className="text-3xl sm:text-4.5xl font-bold font-serif text-narrative-forest mt-2">
            The CustomWorks Advantage
          </h2>
          <p className="text-narrative-forest/75 mt-4 font-light">
            We partner with businesses to make premium custom merch friction-free and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="bg-white border border-zinc-200/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 border ${benefit.bgClass}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-narrative-forest mb-3">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-narrative-forest/70 leading-relaxed font-light">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (Rich Forest Green Section) */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-narrative-forest text-white border-y border-zinc-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side process */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold text-narrative-ochre tracking-widest uppercase">WORKFLOW</span>
                <h2 className="text-3xl sm:text-4.5xl font-bold font-serif leading-tight mt-2 text-white">
                  Seamless order process, <br />
                  <span className="text-narrative-sage italic font-normal">from design to delivery</span>
                </h2>
              </div>

              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20 font-bold text-sm text-narrative-ochre">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-white">{step.title}</h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side category icons grid */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-narrative-ochre/15 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300">
                  <span className="text-4xl mb-3">👕</span>
                  <span className="font-bold text-xs text-white/95">Apparel</span>
                  <span className="text-[10px] text-white/50 mt-1 font-light">Tees & Hoodies</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300">
                  <span className="text-4xl mb-3">☕</span>
                  <span className="font-bold text-xs text-white/95">Drinkware</span>
                  <span className="text-[10px] text-white/50 mt-1 font-light">Mugs & Bottles</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300">
                  <span className="text-4xl mb-3">📓</span>
                  <span className="font-bold text-xs text-white/95">Stationery</span>
                  <span className="text-[10px] text-white/50 mt-1 font-light">Notebooks & Cards</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300">
                  <span className="text-4xl mb-3">🏷️</span>
                  <span className="font-bold text-xs text-white/95">Accessories</span>
                  <span className="text-[10px] text-white/50 mt-1 font-light">Caps & Bags</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-narrative-clay tracking-wider uppercase">INQUIRY</span>
          <h2 className="text-3xl font-bold font-serif text-narrative-forest mt-2">Get Started on Your Order</h2>
          <p className="text-sm text-narrative-forest/60 mt-2 font-light">Fill out the quick questionnaire below and our bulk solutions team will review and reply within 12 hours.</p>
        </div>
        <CorporateForm />
      </section>
    </div>
  );
}
