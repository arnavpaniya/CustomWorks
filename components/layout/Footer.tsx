import Link from "next/link";
import { Globe, MessageCircle } from "lucide-react";
import Logo from "@/components/common/Logo";

const InstagramIcon = ({ size = 16, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Corporate Orders", href: "/corporate" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Products: [
    { label: "All Products", href: "/products" },
    { label: "Custom T-Shirts", href: "/products?category=tshirts" },
    { label: "Custom Mugs", href: "/products?category=mugs" },
    { label: "Custom Caps", href: "/products?category=caps" },
  ],
};

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/customworks.in?igsh=YXFoNDR2cXNnNDlz" },
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Globe, label: "Twitter / X", href: "#" },
  { icon: Globe, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="clay-footer bg-white text-brand-black my-8 mx-4 sm:mx-6 md:mx-8 rounded-3xl border border-brand-border shadow-lg" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
        {/* Main footer grid */}
        <div className="py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 h-16 w-36 md:w-44" aria-label="CustomWorks Home">
               <Logo className="h-full w-full" light={false} />
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
               Premium customization-first e-commerce. Design your product,
               we bring it to life. Made-to-order. Built for you.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-brand-surface hover:bg-brand-border border border-brand-border text-brand-black transition-colors shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919632022529"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-brand-muted hover:text-brand-black transition-colors"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-muted hover:text-brand-black transition-colors"
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
        <div className="border-t border-brand-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-brand-muted">
          <p>&copy; {new Date().getFullYear()} CustomWorks. All rights reserved.</p>
          <p>Made with care in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
