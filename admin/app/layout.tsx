import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CustomWorks Operations — Console",
  description: "Secure operational control center for CustomWorks.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/images/Customworks favicon.png",
    apple: "/images/Customworks favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0A0A0C] text-zinc-100 font-sans antialiased relative overflow-x-hidden selection:bg-[#FF5E36]/30 selection:text-white flex flex-col">
        {/* Ambient glows */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-radial-gradient from-[#FF5E36]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-radial-gradient from-[#FF5E36]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
