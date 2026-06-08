import type { Metadata } from "next";
import { Target, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CustomWorks — our story, mission, and values.",
};

const values = [
  { icon: Target, title: "Precision", desc: "Every product is crafted with attention to detail. We don't cut corners." },
  { icon: Heart, title: "Passion", desc: "We love what we do. That passion shows in every custom piece we create." },
  { icon: Zap, title: "Speed", desc: "Fast turnaround without compromising quality. Your time matters." },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Our Story
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-6">
          We Bring Your Custom Designs to Life
        </h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
          CustomWorks started with a simple belief: everyone deserves custom-designed items that truly
          represent them. We built a platform where creativity meets craftsmanship — where your
          design becomes a premium, real-world product.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white border border-brand-border rounded-3xl p-10 text-center mb-16 shadow-md">
        <div className="inline-block mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Our Mission
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-brand-black leading-snug">
          &ldquo;To democratize premium custom consumer products — making high-quality,
          personalized products accessible to everyone.&rdquo;
        </h2>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-brand-black text-center mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl border border-brand-border p-7 text-center shadow-md hover:shadow-lg transition-shadow duration-250">
              <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-xl bg-brand-black text-white mb-4">
                <v.icon size={22} />
              </div>
              <h3 className="font-bold text-brand-black mb-2">{v.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="text-center">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            The Team
          </span>
        </div>
        <h2 className="text-2xl font-black text-brand-black mb-4">Built by Creators, for Creators</h2>
        <p className="text-brand-muted leading-relaxed max-w-xl mx-auto">
          We&apos;re a small, passionate team of designers, engineers, and print specialists based in India.
          We obsess over product quality so you don&apos;t have to. Every order gets our full attention.
        </p>
      </div>
      {/* Legal Info */}
      <div className="text-center mt-16 pt-8 border-t border-brand-border/50">
        <p className="text-sm text-brand-muted">
          <span className="font-bold text-brand-black">Legal Name:</span> MOHITH K ARALIKATTE
        </p>
        <p className="text-sm text-brand-muted mt-1">
          <span className="font-bold text-brand-black">Trade Name:</span> CustomWorks
        </p>
      </div>
    </div>
  );
}
