"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Clock, Send, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "orders.customworks@gmail.com";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Contact Us
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-6">
          We&apos;re Here to Help
        </h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
          Have a question about an order, need help with a custom design, or want to discuss a bulk purchase? Our team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-black text-brand-black mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-orange-light flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black">Order Support</h3>
                  <p className="text-sm text-brand-muted mt-1 mb-2">Use email for order help, quote requests, and detailed inquiries.</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-orange font-semibold hover:underline text-sm flex items-center gap-1">
                    {CONTACT_EMAIL} <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-muted" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black">Email Us</h3>
                  <p className="text-sm text-brand-muted mt-1 mb-2">For detailed inquiries and support.</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-black font-semibold hover:underline text-sm">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-brand-muted" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black">Call Us</h3>
                  <p className="text-sm text-brand-muted mt-1 mb-2">Available during business hours.</p>
                  <a href="tel:+919876543210" className="text-brand-black font-semibold hover:underline text-sm">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-brand-muted" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black">Business Hours</h3>
                  <p className="text-sm text-brand-muted mt-1">
                    Monday – Saturday<br />
                    10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-brand-muted" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black">Headquarters</h3>
                  <p className="text-sm text-brand-muted mt-1">
                    CustomWorks Studio<br />
                    Bengaluru, Karnataka<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-brand-border shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-black text-brand-black mb-6">Send a Message</h2>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
              >
                <div className="h-16 w-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Email Draft Opened</h3>
                <p className="text-brand-muted mb-6">
                  Send the draft to reach our team at {CONTACT_EMAIL}.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-brand-black">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full h-11 px-4 rounded-xl border border-brand-border bg-brand-surface focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-brand-black">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-brand-border bg-brand-surface focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-brand-black">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Order Inquiry / Custom Design / General"
                    className="w-full h-11 px-4 rounded-xl border border-brand-border bg-brand-surface focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-brand-black">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-surface focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black transition-all resize-y"
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full" loading={loading}>
                  Send Email
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
