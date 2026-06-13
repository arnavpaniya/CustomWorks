"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Sparkles, ArrowUpRight } from "lucide-react";
import Logo from "@/components/common/Logo";

const InstagramIcon = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const footerLinks = {
  Products: [
    { label: "Business Cards", href: "/products?category=Business Cards" },
    { label: "Envelopes", href: "/products?category=Envelopes" },
    { label: "Corporate Stationery", href: "/products?category=Corporate Stationery" },
    { label: "Signage & Display", href: "/products?category=Signage & Display" },
    { label: "ID & Lanyards", href: "/products?category=ID & Lanyards" },
    { label: "Calendars & Planners", href: "/products?category=Calendars & Planners" },
    { label: "Apparel & Embroidery", href: "/products?category=Apparel & Embroidery" },
    { label: "Marketing Materials", href: "/products?category=Marketing Materials" },
    { label: "Promotional Products", href: "/products?category=Promotional Products" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Corporate Orders", href: "/corporate" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs & Help", href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Return & Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Payment Policy", href: "/payment-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { 
    icon: InstagramIcon, 
    label: "Instagram", 
    href: "https://www.instagram.com/customworks.in?igsh=YXFoNDR2cXNnNDlz", 
    hoverClass: "hover:bg-narrative-clay hover:border-narrative-clay hover:text-white" 
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer 
      className="relative mt-24 mb-8 mx-4 sm:mx-6 md:mx-8 rounded-[2rem] sm:rounded-[2.5rem] bg-narrative-forest text-zinc-300 border border-white/10 shadow-2xl overflow-hidden" 
      aria-label="Footer"
    >
      {/* Narrative gradient glows inside the card */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-narrative-clay/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[26rem] h-[26rem] bg-narrative-ochre/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-narrative-sage/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        {/* Top Newsletter / CTA row */}
        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
              Ready to bring your <span className="italic font-normal text-narrative-clay">ideas</span> to life?
            </h3>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-11 px-6 rounded-full bg-white hover:bg-zinc-100 text-narrative-forest font-bold text-sm tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-1">
                Browse Products <ArrowUpRight size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-12 md:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Brand/About Col */}
          <div className="lg:w-2/5 space-y-6">
            <Link 
              href="/" 
              className="inline-block h-12 w-32 md:w-36 transition-transform hover:scale-[1.02]" 
              aria-label="CustomWorks Home"
            >
              <Logo className="h-full w-full text-white" light />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-light">
              CustomWorks is a premium fabrication house for customized products. From stationery and identity mockups to bespoke clothing, we craft and deliver excellence to your doorstep.
            </p>

            {/* Support Email button */}
            <div className="pt-2">
              <a
                href="mailto:orders.customworks@gmail.com"
                className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-sm group"
              >
                <Mail size={15} className="text-narrative-clay group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono">orders.customworks@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Dynamic Link columns */}
          <div className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="space-y-4">
                <h4 className="text-[11px] font-bold tracking-widest text-zinc-400 font-mono uppercase">
                  {heading}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-400 hover:text-white hover:underline underline-offset-4 decoration-narrative-clay/40 transition-all duration-200 font-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} CustomWorks. All rights reserved.</p>
            <span className="hidden md:inline text-white/10">|</span>
            <p className="flex items-center gap-1">Made with premium care in Bengaluru, India 🇮🇳</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 shadow-sm ${hoverClass}`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
