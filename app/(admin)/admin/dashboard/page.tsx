import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Users, TrendingUp, Clock, Package, CheckCircle, Truck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

const stats = [
  { label: "Orders Today", value: "24", icon: ShoppingBag, change: "+12%", positive: true },
  { label: "Pending Designs", value: "7", icon: Clock, change: "Needs action", positive: false },
  { label: "Revenue Today", value: "₹18,432", icon: TrendingUp, change: "+8.5%", positive: true },
  { label: "New Customers", value: "9", icon: Users, change: "+5%", positive: true },
];

const recentOrders = [
  { id: "CW-001234", customer: "Priya S.", total: 1498, status: "DESIGNING", date: "Today, 10:32 AM" },
  { id: "CW-001233", customer: "Rahul M.", total: 599, status: "PROCESSING", date: "Today, 9:15 AM" },
  { id: "CW-001232", customer: "Anjali D.", total: 2796, status: "READY_TO_SHIP", date: "Today, 8:00 AM" },
  { id: "CW-001231", customer: "Vikram S.", total: 899, status: "DISPATCHED", date: "Yesterday" },
  { id: "CW-001230", customer: "Meera K.", total: 1197, status: "DELIVERED", date: "Yesterday" },
];

const pendingDesigns = [
  { id: "DES-001", customer: "Priya S.", product: "Custom T-Shirt", submitted: "10 min ago" },
  { id: "DES-002", customer: "Arjun P.", product: "Custom Mug", submitted: "45 min ago" },
  { id: "DES-003", customer: "Kiran R.", product: "Custom Cap", submitted: "1 hr ago" },
];

const statusConfig: Record<string, { label: string; variant: "muted" | "warning" | "success" | "error" | "default" }> = {
  DESIGNING: { label: "Designing", variant: "muted" },
  PROCESSING: { label: "Processing", variant: "warning" },
  READY_TO_SHIP: { label: "Ready to Ship", variant: "warning" },
  DISPATCHED: { label: "Dispatched", variant: "success" },
  DELIVERED: { label: "Delivered", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "error" },
};

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Admin Dashboard</h1>
          <p className="text-sm text-brand-muted">Sunday, 18 May 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/orders">
            <span className="text-sm text-brand-black font-medium hover:underline">View Orders</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-brand-border p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-black text-white">
                <stat.icon size={18} />
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.positive ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-brand-black">{stat.value}</p>
            <p className="text-xs text-brand-muted mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-brand-black">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-brand-black font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentOrders.map((order) => {
              const s = statusConfig[order.status];
              return (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-white transition-colors border border-brand-border"
                >
                  <div>
                    <p className="text-sm font-semibold text-brand-black">#{order.id}</p>
                    <p className="text-xs text-[#9A9A9A]">{order.customer} · {order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={s.variant}>{s.label}</Badge>
                    <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Design Queue */}
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-brand-black">Design Queue</h2>
            <Link href="/admin/designs" className="text-sm text-brand-black font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingDesigns.map((d) => (
              <Link
                key={d.id}
                href={`/admin/designs/${d.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-white transition-colors border border-brand-border"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-surface shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-black truncate">{d.product}</p>
                  <p className="text-xs text-[#9A9A9A]">{d.customer} · {d.submitted}</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
          { href: "/admin/designs", label: "Design Queue", icon: Clock },
          { href: "/admin/products", label: "Products", icon: Package },
          { href: "/admin/customers", label: "Customers", icon: Users },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="bg-white rounded-2xl border border-brand-border p-5 flex flex-col items-center gap-2 hover:border-brand-black hover:shadow-sm transition-all text-center">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-surface">
              <Icon size={18} className="text-brand-black" />
            </div>
            <span className="text-sm font-semibold text-brand-black">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
