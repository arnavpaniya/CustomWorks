import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Tag, Package, Headphones, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CorporateForm from "@/components/corporate/CorporateForm";

export const metadata: Metadata = {
  title: "Corporate & Bulk Orders",
  description: "Custom bulk orders for businesses, events, and teams. Dedicated account manager, competitive pricing, custom packaging.",
};

const benefits = [
  { icon: Tag, title: "Bulk Pricing", desc: "Save up to 30% on orders of 10+ pieces. Volume discounts auto-applied." },
  { icon: Package, title: "Custom Packaging", desc: "Branded boxes, custom inserts, and personalized packaging for your brand." },
  { icon: Users, title: "Team Merchandise", desc: "Uniforms, branded tees, caps — your whole team, one order." },
  { icon: Headphones, title: "Dedicated Manager", desc: "A dedicated account manager for your business from first order to delivery." },
];

const categories = [
  "Custom T-Shirts", "Polo Shirts", "Hoodies & Jackets", "Caps & Hats",
  "Mugs & Drinkware", "Bags & Totes", "Phone Cases", "Stationery",
];

export default function CorporatePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919632022529";

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-brand-border py-20 px-4 text-center shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-black/5 text-brand-black/70 text-xs font-medium border border-brand-black/10 mb-6">
            <Building2 size={12} />
            For Businesses &amp; Teams
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-5 leading-tight">
            Bulk &amp; Corporate Orders<br />Made for Your Business
          </h1>
          <p className="text-brand-muted text-lg mb-8 leading-relaxed">
            Premium custom merchandise at scale. Whether it&apos;s 10 pieces or 10,000 —
            we deliver quality that represents your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in bulk/corporate orders for my business`} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg">
                Chat on WhatsApp for a Quote
              </Button>
            </Link>
            <a href="#inquiry-form">
              <Button variant="outline" size="lg" className="border-brand-border text-brand-black hover:bg-brand-surface">
                Fill Inquiry Form
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-brand-black text-center mb-10">What We Offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl border border-brand-border p-6 shadow-md hover:shadow-lg transition-shadow duration-250">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-black text-white mb-4">
                <b.icon size={22} />
              </div>
              <h3 className="font-bold text-brand-black mb-2">{b.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 bg-brand-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-brand-black text-center mb-8">Product Categories</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <span key={cat} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-brand-border text-sm font-medium text-brand-black hover:border-black transition-colors cursor-default">
                <CheckCircle2 size={13} className="text-black" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-brand-black text-center mb-2">Get a Quote</h2>
        <p className="text-brand-muted text-center text-sm mb-8">
          Fill out the form and we&apos;ll reach out within 24 hours.
        </p>

        <CorporateForm whatsappNumber={whatsappNumber} />
      </section>
    </div>
  );
}
