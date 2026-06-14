"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Heart, Bookmark, LogOut, ChevronRight, Loader2, Edit2, Check, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { getUserProfile, saveUserProfile, UserProfile } from "@/lib/profile-service";
import { toast } from "sonner";

interface MockOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

const MOCK_ORDERS: MockOrder[] = [];

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

  // Profile States
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", companyName: "", gstin: ""
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Load profile details
  useEffect(() => {
    if (user) {
      setFetchingProfile(true);
      getUserProfile(user.uid)
        .then((data) => {
          if (data) {
            setProfile(data);
            setEditForm(data);
          } else {
            // Setup defaults from auth if no profile exists
            const defaults = {
              name: user.displayName || "",
              phone: user.phoneNumber || "",
              line1: "", line2: "", city: "", state: "", pincode: "", companyName: "", gstin: ""
            };
            setProfile(defaults);
            setEditForm(defaults);
          }
        })
        .catch((err) => {
          console.error("Failed to load user profile:", err);
        })
        .finally(() => {
          setFetchingProfile(false);
        });
    }
  }, [user]);

  // Trigger Onboarding modal if profile is incomplete
  useEffect(() => {
    if (!fetchingProfile && profile && user) {
      const isIncomplete = !profile.phone || !profile.line1 || !profile.city || !profile.pincode;
      const isSkipped = sessionStorage.getItem("customworks_onboarding_skipped") === "true";
      if (isIncomplete && !isSkipped) {
        setShowOnboarding(true);
      }
    }
  }, [profile, fetchingProfile, user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  const handleSaveProfile = async (formData: UserProfile) => {
    if (!user) return;
    setSaving(true);
    try {
      // If name changed, update Firebase Auth profile too
      if (formData.name && formData.name !== user.displayName) {
        await updateProfile(user, { displayName: formData.name });
      }

      await saveUserProfile(user.uid, formData);
      setProfile(formData);
      setIsEditing(false);
      setShowOnboarding(false);
      toast.success("Account details saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save account details.");
    } finally {
      setSaving(false);
    }
  };

  const handleSkipOnboarding = () => {
    sessionStorage.setItem("customworks_onboarding_skipped", "true");
    setShowOnboarding(false);
    toast.info("You can fill in your details later from the Profile section.");
  };

  // Loading state
  if (loading || (user && fetchingProfile)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-muted" />
      </div>
    );
  }

  // Not signed in — redirect handled by useEffect, show nothing
  if (!user) return null;

  const displayName = profile?.name || user.displayName || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "—";

  const isProfileIncomplete = !profile?.phone || !profile?.line1 || !profile?.city || !profile?.pincode;

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
                { href: "/dashboard",     icon: User,     label: "Profile" },
                { href: "/orders",         icon: Package,  label: "My Orders" },
                { href: "/saved-designs",  icon: Bookmark, label: "Saved Designs" },
                { href: "/wishlist",        icon: Heart,    label: "Wishlist" },
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
                className="flex items-center gap-2.5 w-full px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={15} /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Notification Alert for incomplete profile */}
          {isProfileIncomplete && !isEditing && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 shadow-xs">
              <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-sm">Account details incomplete</h4>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  Provide your default shipping details now so you don't have to fill them in at checkout every time.
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-amber-900 underline mt-2 hover:text-amber-950 transition-colors"
                >
                  Complete Setup Now
                </button>
              </div>
            </div>
          )}

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-brand-black text-lg">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => {
                    setEditForm(profile || { name: displayName });
                    setIsEditing(true);
                  }}
                  className="text-xs font-bold text-brand-black border border-brand-border rounded-lg px-3 py-1.5 flex items-center gap-1.5 bg-white hover:bg-brand-surface transition-all shadow-xs"
                >
                  <Edit2 size={12} /> Edit Details
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(editForm); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={editForm.phone || ""}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Address Line 1</label>
                    <input
                      type="text"
                      required
                      value={editForm.line1 || ""}
                      onChange={(e) => setEditForm({ ...editForm, line1: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={editForm.line2 || ""}
                      onChange={(e) => setEditForm({ ...editForm, line2: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">City</label>
                    <input
                      type="text"
                      required
                      value={editForm.city || ""}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">State</label>
                    <input
                      type="text"
                      required
                      value={editForm.state || ""}
                      onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Pincode</label>
                    <input
                      type="text"
                      required
                      value={editForm.pincode || ""}
                      onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">Company Name (Optional)</label>
                    <input
                      type="text"
                      value={editForm.companyName || ""}
                      onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-brand-black">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={editForm.gstin || ""}
                      onChange={(e) => setEditForm({ ...editForm, gstin: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" variant="accent" size="sm" disabled={saving}>
                    {saving ? "Saving..." : "Save Details"}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={saving}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <p className="text-[#9A9A9A] text-xs mb-0.5">Full Name</p>
                  <p className="text-brand-black font-semibold">{displayName}</p>
                </div>
                <div>
                  <p className="text-[#9A9A9A] text-xs mb-0.5">Email</p>
                  <p className="text-brand-black font-semibold truncate">{user.email ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[#9A9A9A] text-xs mb-0.5">Phone</p>
                  <p className="text-brand-black font-semibold">{profile?.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[#9A9A9A] text-xs mb-0.5">Member Since</p>
                  <p className="text-brand-black font-semibold">{memberSince}</p>
                </div>
                <div className="sm:col-span-2 border-t border-brand-border pt-4">
                  <p className="text-[#9A9A9A] text-xs mb-1">Shipping Address</p>
                  {profile?.line1 ? (
                    <div className="text-brand-black font-medium space-y-0.5 bg-brand-surface/40 rounded-xl p-3.5 border border-brand-border">
                      <p>{profile.line1}</p>
                      {profile.line2 && <p>{profile.line2}</p>}
                      <p>{profile.city}, {profile.state} - {profile.pincode}</p>
                    </div>
                  ) : (
                    <p className="text-brand-muted italic text-xs">No default address provided.</p>
                  )}
                </div>
                {profile?.companyName && (
                  <div>
                    <p className="text-[#9A9A9A] text-xs mb-0.5">Company Name</p>
                    <p className="text-brand-black font-semibold">{profile.companyName}</p>
                  </div>
                )}
                {profile?.gstin && (
                  <div>
                    <p className="text-[#9A9A9A] text-xs mb-0.5">GSTIN</p>
                    <p className="text-brand-black font-semibold">{profile.gstin}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-brand-black">Recent Orders</h2>
              <Link href="/orders" className="text-sm text-black font-medium underline underline-offset-4 hover:opacity-85">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_ORDERS.length > 0 ? (
                MOCK_ORDERS.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig];
                  return (
                    <Link
                      key={order.id}
                      href={`/orders/${order.id}`}
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
                })
              ) : (
                <div className="text-center py-8 border border-dashed border-brand-border rounded-2xl bg-brand-surface/20">
                  <p className="text-sm text-brand-muted mb-4">You haven't placed any orders yet.</p>
                  <Link href="/products">
                    <Button variant="accent" size="sm">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-100 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-brand-border bg-brand-surface/40 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xl text-brand-black">Setup Your Account Details</h3>
                <p className="text-xs text-brand-muted mt-0.5">Fill in your address for a faster checkout</p>
              </div>
              <button
                onClick={handleSkipOnboarding}
                className="h-8 w-8 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-black bg-white transition-all shadow-xs"
              >
                <X size={15} />
              </button>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile(editForm);
              }}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Address Line 1</label>
                  <input
                    type="text"
                    required
                    value={editForm.line1 || ""}
                    onChange={(e) => setEditForm({ ...editForm, line1: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={editForm.line2 || ""}
                    onChange={(e) => setEditForm({ ...editForm, line2: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">City</label>
                  <input
                    type="text"
                    required
                    value={editForm.city || ""}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">State</label>
                  <input
                    type="text"
                    required
                    value={editForm.state || ""}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Pincode</label>
                  <input
                    type="text"
                    required
                    value={editForm.pincode || ""}
                    onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={editForm.companyName || ""}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-brand-black">GSTIN (Optional)</label>
                  <input
                    type="text"
                    value={editForm.gstin || ""}
                    onChange={(e) => setEditForm({ ...editForm, gstin: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/20"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                <Button type="submit" variant="accent" className="flex-1" disabled={saving}>
                  {saving ? "Saving..." : "Save Details & Continue"}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={handleSkipOnboarding} disabled={saving}>
                  Skip for Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
