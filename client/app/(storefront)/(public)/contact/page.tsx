"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, MapPin, Clock, Send, ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "orders.customworks@gmail.com";

const contactCards = [
  {
    icon: MessageCircle,
    title: "Order Support & Quotes",
    desc: "Reach out via email for orders, quotes, or custom inquiries.",
    actionText: "orders.customworks@gmail.com",
    href: `mailto:${CONTACT_EMAIL}`,
    colorClass: "bg-narrative-clay/10 border-narrative-clay/15 text-narrative-clay",
    hoverColor: "hover:bg-narrative-clay/15"
  },
  {
    icon: Phone,
    title: "Give Us a Call",
    desc: "Available during support hours for quick assistance.",
    actionText: "+91 96320 22529",
    href: "tel:+919632022529",
    colorClass: "bg-narrative-sage/10 border-narrative-sage/15 text-narrative-sage",
    hoverColor: "hover:bg-narrative-sage/15"
  },
  {
    icon: Clock,
    title: "Support Hours",
    desc: "Monday – Saturday",
    actionText: "10:00 AM – 7:00 PM IST",
    href: null,
    colorClass: "bg-narrative-forest/10 border-narrative-forest/15 text-narrative-forest",
    hoverColor: null
  },
  {
    icon: MapPin,
    title: "Bengaluru HQ",
    desc: "CustomWorks Studio",
    actionText: "Bengaluru, Karnataka, India",
    href: null,
    colorClass: "bg-narrative-ochre/10 border-narrative-ochre/15 text-narrative-ochre",
    hoverColor: null
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const subject = form.subject.trim() || "CustomWorks inquiry";
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#FAF6F0] py-16 sm:py-24 border-b border-zinc-200/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-narrative-clay/10 text-narrative-clay text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} /> Get in Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-serif text-narrative-forest mb-6 leading-[1.15]">
            We&apos;re here to <span className="text-narrative-clay italic font-normal">help you create</span>
          </h1>
          <p className="text-narrative-forest/75 text-lg sm:text-xl leading-relaxed font-light max-w-2xl mx-auto">
            Have a question about an order, need assistance with your custom design, or want to discuss a bulk purchase? Drop us a line!
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 sm:gap-16 items-start">
          {/* Info cards (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-serif text-narrative-forest mb-2">Connect Directly</h2>
              <p className="text-sm text-narrative-forest/60 font-light">Choose the most convenient way to reach our Bengaluru team.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const CardWrapper = card.href ? "a" : "div";
                const wrapperProps = card.href ? { href: card.href, className: "block group" } : {};
                
                return (
                  <CardWrapper key={i} {...wrapperProps}>
                    <div className={`p-6 rounded-2xl border bg-white border-zinc-200/40 shadow-sm transition-all duration-300 ${card.href ? `hover:border-zinc-300 hover:shadow-md ${card.hoverColor}` : ""}`}>
                      <div className="flex gap-4 items-start">
                        <div className={`h-10 w-10 flex items-center justify-center rounded-xl shrink-0 border ${card.colorClass}`}>
                          <Icon size={18} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-narrative-forest">{card.title}</h3>
                          <p className="text-xs text-narrative-forest/60 font-light">{card.desc}</p>
                          {card.actionText && (
                            <p className={`text-sm font-semibold pt-1 font-mono break-all ${card.href ? "text-narrative-clay group-hover:underline" : "text-narrative-forest/80"}`}>
                              {card.actionText}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>

          {/* Form area (Right) */}
          <div className="lg:col-span-3">
            <div className="bg-[#FAF6F0] rounded-[2rem] border border-zinc-200/40 shadow-md p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-narrative-clay/5 blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-bold font-serif text-narrative-forest mb-6 relative z-10">Send a Message</h2>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-zinc-200/40 rounded-2xl p-8 text-center shadow-sm relative z-10"
                  >
                    <div className="h-16 w-16 mx-auto bg-narrative-sage/10 text-narrative-sage border border-narrative-sage/20 rounded-full flex items-center justify-center mb-4">
                      <Send size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-narrative-forest mb-2">Email Draft Opened</h3>
                    <p className="text-narrative-forest/70 text-sm mb-6 max-w-sm mx-auto font-light">
                      We have opened your email client to send the draft inquiry. Make sure to hit send to reach us at <span className="font-mono font-semibold">{CONTACT_EMAIL}</span>.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border-zinc-300 hover:bg-zinc-50"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-narrative-forest">Your Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full h-11 px-4 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-narrative-forest">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full h-11 px-4 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-narrative-forest">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Bulk Ordering / Custom Design Inquiry"
                        className="w-full h-11 px-4 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-narrative-forest">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about the customized items you want to create, quantities, and timelines..."
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all resize-y"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-full bg-narrative-forest hover:bg-narrative-clay text-white font-bold text-sm tracking-wide shadow-md transition-all duration-300" 
                      loading={loading}
                    >
                      Draft Email Request <ArrowRight size={16} className="ml-2 inline shrink-0" />
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
