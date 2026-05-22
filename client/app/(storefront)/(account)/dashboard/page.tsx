"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Heart, Bookmark, LogOut, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";

const MOCK_ORDERS = [
  { id: "CW-20260501", date: "1 May 2026", total: 3590, status: "DELIVERED", items: 3 },
  { id: "CW-20260415", date: "15 Apr 2026", total: 1498, status: "DISPATCHED", items: 2 },
  { id: "CW-20260402", date: "2 Apr 2026", total: 5640, status: "PROCESSING", items: 5 },
];

const statusConfig = {
  DESIGNING:    { label: "Designing",      variant: "muted"    as const },
  PROCESSING:   { label: "Processing",     variant: "warning"  as const },
  READY_TO_SHIP:{ label: "Ready to Ship",  variant: "warning"  as const },
  DISPATCHED:   { label: "Dispatched",     variant: "success"  as const },
  DELIVERED:    { label: "Delivered",      variant: "success"  as const },
  CANCELLED:    { label: "Cancelled",      variant: "error"    as const },
};

export default function AccountDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-muted" />
      </div>
    );
  }

  // Not signed in — redirect handled by useEffect, show nothing
  if (!user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-brand-black mb-8">My Account</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-md">
            <div className="p-5 border-b border-brand-border bg-brand-surface text-brand-black">
              <div className="h-12 w-12 rounded-full bg-brand-black flex items-center justify-center text-lg text-white font-black mb-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <p className="font-bold truncate">{displayName}</p>
              <p className="text-brand-muted text-sm truncate">{user.email}</p>
            </div>
            <nav>
              {[
                { href: "/account/dashboard",     icon: User,     label: "Profile" },
                { href: "/account/orders",         icon: Package,  label: "My Orders" },
                { href: "/account/saved-designs",  icon: Bookmark, label: "Saved Designs" },
                { href: "/account/wishlist",        icon: Heart,    label: "Wishlist" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-brand-muted hover:text-brand-black hover:bg-brand-surface transition-colors border-b border-brand-border last:border-0"
                >
                  <span className="flex items-center gap-2.5"><Icon size={15} />{label}</span>
                  <ChevronRight size={13} className="text-[#9A9A9A]" />
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-brand-black">Profile Information</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Full Name",     value: displayName },
                { label: "Email",         value: user.email ?? "—" },
                { label: "Phone",         value: user.phoneNumber ?? "Not provided" },
                { label: "Member Since",  value: memberSince },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[#9A9A9A] text-xs mb-0.5">{label}</p>
                  <p className="text-brand-black font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-brand-black">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-black font-medium underline underline-offset-4 hover:opacity-85">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_ORDERS.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-surface transition-colors border border-brand-border"
                  >
                    <div>
                      <p className="text-sm font-semibold text-brand-black">#{order.id}</p>
                      <p className="text-xs text-[#9A9A9A]">{order.date} · {order.items} items</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <p className="text-sm font-bold">₹{order.total.toLocaleString("en-IN")}</p>
                      <ChevronRight size={14} className="text-[#9A9A9A]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
