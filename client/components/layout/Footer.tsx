"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
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

const FacebookIcon = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const YouTubeIcon = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <path d="M10 9l5 3-5 3z" />
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
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/customworks.in?igsh=YXFoNDR2cXNnNDlz", hoverClass: "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 hover:text-white" },
  { icon: FacebookIcon, label: "Facebook", href: "#", hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
  { icon: XIcon, label: "Twitter / X", href: "#", hoverClass: "hover:bg-black hover:text-white hover:border-black" },
  { icon: YouTubeIcon, label: "YouTube", href: "#", hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-24 mb-8 mx-4 sm:mx-6 md:mx-8 rounded-[2.5rem] bg-zinc-950 text-zinc-300 border border-zinc-900 shadow-2xl overflow-hidden" aria-label="Footer">
      {/* Dynamic glow design background overlay */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 relative z-10">
        {/* Main footer grid */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block h-12 w-32 md:w-36 transition-transform hover:scale-[1.02]" aria-label="CustomWorks Home">
              <Logo className="h-full w-full" light />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Design customized premium apparel and accessories. Crafted with rich premium elements, manufactured with high organic care, and delivered to your doorstep.
            </p>

            {/* Email contact link */}
            <div className="pt-2">
              <a
                href="mailto:orders.customworks@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-sm group"
              >
                <Mail size={15} className="text-brand-orange group-hover:scale-110 transition-transform" />
                <span>Email orders.customworks@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Dynamic Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-serif">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} CustomWorks. All rights reserved.</p>
            <span className="hidden md:inline text-zinc-800">|</span>
            <p className="flex items-center gap-1">Made with premium care in India 🇮🇳</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href, hoverClass }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`h-9 w-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-400 transition-all duration-300 shadow-sm ${hoverClass}`}
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
