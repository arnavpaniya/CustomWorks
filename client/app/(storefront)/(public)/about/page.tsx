import type { Metadata } from "next";
import Image from "next/image";
import { Target, Heart, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – CustomWorks",
  description: "Learn about CustomWorks — our story, mission, and values.",
};

const values = [
  { 
    icon: Target, 
    title: "Precision Craftsmanship", 
    desc: "Every product is crafted with meticulous attention to detail. We combine premium materials with top-tier printing technology to ensure your design is represented perfectly.",
    color: "clay",
    bgClass: "bg-narrative-clay/10 border-narrative-clay/15 text-narrative-clay"
  },
  { 
    icon: Heart, 
    title: "Genuine Passion", 
    desc: "We love the art of creation. That passion drives us to make every custom piece — whether a single mug or a thousand corporate hoodies — feel incredibly special.",
    color: "ochre",
    bgClass: "bg-narrative-ochre/10 border-narrative-ochre/15 text-narrative-ochre"
  },
  { 
    icon: Zap, 
    title: "Express Turnaround", 
    desc: "Fast production and shipping shouldn't mean compromised quality. We've optimized our entire pipeline to deliver your products exactly when you need them.",
    color: "sage",
    bgClass: "bg-narrative-sage/10 border-narrative-sage/15 text-narrative-sage"
  },
];


export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero section */}
      <section className="bg-[#FAF6F0] py-16 sm:py-24 border-b border-zinc-200/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-narrative-clay/10 text-narrative-clay text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} /> Our Story
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-serif text-narrative-forest mb-6 leading-[1.15]">
              We bring your <span className="text-narrative-clay italic font-normal">custom designs</span> to life
            </h1>
            <p className="text-narrative-forest/75 text-lg sm:text-xl leading-relaxed font-light">
              CustomWorks started with a simple belief: everyone deserves high-quality custom items that truly represent them. We built a platform where creativity meets premium craftsmanship.
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-lg border border-zinc-200/20">
            <Image
              src="/images/design_workspace.jpg"
              alt="CustomWorks design and manufacturing workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-narrative-forest/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-narrative-clay tracking-wider uppercase">01 / HOW WE STARTED</span>
              <h2 className="text-3xl sm:text-4.5xl font-bold font-serif text-narrative-forest leading-tight">
                Designed by creators, <br className="hidden sm:block" />
                <span className="text-narrative-sage italic font-normal">made for creators</span>
              </h2>
              <p className="text-narrative-forest/75 leading-relaxed font-light">
                We started in Bengaluru as a small team of print enthusiasts frustrated by the trade-offs of custom ordering. You either had to order in massive quantities, or settle for poor materials and blurry printing. 
              </p>
              <p className="text-narrative-forest/75 leading-relaxed font-light">
                We set out to change that. By combining state-of-the-art print-on-demand technology with meticulously selected cottons, papers, and ceramics, we made premium personalized items accessible to everyone, with no minimum orders.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md border border-zinc-200/30">
              <Image
                src="/images/premium_packaging.jpg"
                alt="Our premium custom packaging details"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>

          {/* Mission Box */}
          <div className="bg-narrative-forest text-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 relative overflow-hidden shadow-xl text-center">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-narrative-clay/10 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-narrative-sage/10 blur-[80px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-mono font-bold text-narrative-ochre tracking-widest uppercase">OUR MISSION</span>
              <blockquote className="text-2xl sm:text-4xl font-serif leading-snug text-white/95">
                &ldquo;To democratize custom products by making premium, personalized items easy to design, beautiful to hold, and accessible to everyone.&rdquo;
              </blockquote>
              <div className="h-px w-20 bg-narrative-ochre/40 mx-auto my-6" />
              <p className="text-white/60 text-sm tracking-wide">CUSTOMWORKS EST. 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#FAF6F0] py-20 sm:py-28 border-y border-zinc-200/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-narrative-clay tracking-wider uppercase">HOW WE WORK</span>
            <h2 className="text-3xl sm:text-4.5xl font-bold font-serif text-narrative-forest mt-2">
              Our Core Values
            </h2>
            <p className="text-narrative-forest/75 mt-4 font-light">
              We live and breathe quality. Here is the foundation of every single order we ship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-zinc-200/40 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:translate-y-[-2px]">
                <div>
                  <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${v.bgClass} border mb-6`}>
                    <v.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-narrative-forest mb-3">{v.title}</h3>
                  <p className="text-sm text-narrative-forest/70 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Legal & Footer Details */}
      <section className="bg-zinc-50 border-t border-zinc-200/40 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-narrative-forest">Registered Operations</h3>
          <p className="text-narrative-forest/70 text-sm leading-relaxed font-light">
            We are fully registered and operate under clear local trading standards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-narrative-forest/80 pt-4 font-mono">
            <div>
              <span className="font-bold text-narrative-forest">Legal Name:</span> MOHITH K ARALIKATTE
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <div>
              <span className="font-bold text-narrative-forest">Trade Name:</span> CustomWorks
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
