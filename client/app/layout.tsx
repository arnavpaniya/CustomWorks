import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CustomWorks – Design Your Own Products",
    template: "%s | CustomWorks",
  },
  description:
    "Premium customization-first e-commerce. Design custom t-shirts, mugs, caps, and more. Made-to-order, delivered to your door.",
  keywords: ["custom products", "personalized gifts", "custom t-shirts", "bulk orders", "corporate gifts"],
  authors: [{ name: "CustomWorks" }],
  creator: "CustomWorks",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://customworks.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://customworks.in",
    siteName: "CustomWorks",
    title: "CustomWorks – Design Your Own Products",
    description: "Premium customization-first e-commerce. Made-to-order.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CustomWorks",
    description: "Design your own products. Made-to-order.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/Customworks favicon.png",
    apple: "/images/Customworks favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-brand-surface text-brand-black">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
