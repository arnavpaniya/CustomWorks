import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CustomWorks. We're here to help.",
};

export default function ContactPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919632022529";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Get in Touch
          </span>
        </div>
        <h1 className="text-4xl font-black text-brand-black">Contact Us</h1>
        <p className="text-brand-muted mt-3">We typically respond within 2–4 hours during business hours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-brand-border">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-brand-black text-white">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-brand-black mb-1">WhatsApp</h3>
              <p className="text-sm text-brand-muted mb-2">Fastest way to reach us</p>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-black underline underline-offset-4 hover:opacity-80 transition-opacity">
                Chat on WhatsApp →
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-brand-border">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-brand-black text-white">
              <Mail size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-brand-black mb-1">Email</h3>
              <p className="text-sm text-brand-muted mb-2">For detailed inquiries</p>
              <a href="mailto:customworks.blr@gmail.com" className="text-sm font-medium text-black underline underline-offset-4 hover:opacity-80 transition-opacity">
                customworks.blr@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-brand-border">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-brand-black text-white">
              <Phone size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-brand-black mb-1">Phone</h3>
              <p className="text-sm text-brand-muted mb-2">Mon–Sat, 10AM–6PM IST</p>
              <a href="tel:+919632022529" className="text-sm font-medium text-black underline underline-offset-4 hover:opacity-80 transition-opacity">
                +91 96320 22529
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-brand-border">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-brand-black text-white">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-brand-black mb-1">Address</h3>
              <p className="text-sm text-brand-muted">
                CustomWorks HQ<br />
                Mumbai, Maharashtra<br />
                India 400001
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm whatsappNumber={whatsapp} />
      </div>
    </div>
  );
}
