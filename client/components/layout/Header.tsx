"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/lib/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Corporate Orders", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const searchRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  if (pathname?.startsWith("/admin")) return null;



  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
      setSearchOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-4 z-50 clay-nav mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-full transition-all duration-300",
          scrolled && "shadow-md border-black/5 dark:border-white/5",
        )}
      >
        {/* Desktop Header */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4 sm:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center h-10 w-32 md:w-36" aria-label="CustomWorks Home">
              <Logo className="h-full w-full" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold transition-colors duration-200 relative",
                    pathname === link.href
                      ? "text-brand-black font-bold"
                      : "text-brand-muted hover:text-brand-black",
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-black rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>


            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-10 w-10 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>
 
              {/* Account */}
              <Link
                href={user ? "/dashboard" : "/login"}
                className="h-10 w-10 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                aria-label="My account"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </Link>
 
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="h-10 w-10 hidden sm:flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </Link>
 
              {/* Cart */}
              <Link
                href="/cart"
                className="relative h-10 w-10 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center bg-brand-black text-white text-[10px] font-bold rounded-full shadow-sm">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
 
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors ml-1"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-brand-border"
              >
                <div className="py-3 flex gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                    />
                    <input
                      ref={searchRef}
                      type="search"
                      placeholder="Search products…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
                        }
                      }}
                      className="w-full h-10 pl-9 pr-4 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent bg-white text-brand-black"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
                      }
                    }}
                  >
                    Search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-[100dvh] w-[85vw] max-w-sm bg-white border-r border-brand-border z-50 md:hidden flex flex-col shadow-2xl"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-brand-border">
              <div className="h-12 w-32 flex items-center">
                <Logo className="h-full w-full" />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-brand-surface text-brand-black"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-brand-black bg-brand-surface"
                      : "text-brand-muted hover:text-brand-black hover:bg-brand-surface",
                  )}
                >
                  {link.label}
                  <ChevronRight size={14} className="text-[#9A9A9A]" />
                </Link>
              ))}

              <div className="border-t border-brand-border mt-2 pt-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                    >
                      <LayoutDashboard size={16} /> My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                    >
                      <Heart size={16} /> Wishlist
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                    >
                      <User size={16} /> Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors"
                    >
                      <ChevronRight size={16} /> Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-brand-border">
              <Link href="/products">
                <Button variant="accent" className="w-full">
                  Customize Now
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
