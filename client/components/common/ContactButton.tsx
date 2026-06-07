"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function ContactButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.a
      href={`mailto:${CONTACT_EMAIL}`}
      aria-label="Email CustomWorks"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-black text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Mail size={22} />
      <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Email us
      </span>
    </motion.a>
  );
}
