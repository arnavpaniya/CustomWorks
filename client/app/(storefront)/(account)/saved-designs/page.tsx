"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Layers, Trash2, Pencil, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/useAuth";

interface SavedDesign {
  id: string;
  productName: string;
  variant: string;
  customSummary: string;
  savedAt: string;
  gradientFrom: string;
  gradientTo: string;
}

const INITIAL_DESIGNS: SavedDesign[] = [];

export default function SavedDesignsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [designs, setDesigns] = useState(INITIAL_DESIGNS);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setDesigns((prev) => prev.filter((d) => d.id !== id));
      setDeletingId(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-muted" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-black">
            Saved Designs
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {designs.length} {designs.length === 1 ? "draft" : "drafts"} saved
          </p>
        </div>
        <Link href="/products">
          <Button variant="accent" size="sm" className="gap-1.5">
            <Plus size={14} /> New Design
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {designs.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {designs.map((design, i) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className={`bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden group hover:shadow-xl hover:border-brand-black/10 transition-all duration-300 ${
                  deletingId === design.id ? "opacity-50 scale-95" : ""
                }`}
              >
                {/* Preview area */}
                <div
                  className={`h-44 bg-gradient-to-br ${design.gradientFrom} ${design.gradientTo} relative flex items-center justify-center`}
                >
                  <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Layers size={24} className="text-white/70" />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href="/products">
                        <Button
                          variant="primary"
                          size="sm"
                          className="gap-1.5 bg-white text-brand-black hover:bg-white/90 shadow-lg"
                        >
                          <Pencil size={12} /> Edit Design
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {/* Time badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {design.savedAt}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-brand-black text-sm mb-1 truncate">
                    {design.productName}
                  </h3>
                  <p className="text-xs text-brand-muted mb-2 truncate">
                    {design.variant}
                  </p>
                  <p className="text-xs text-[#9A9A9A] line-clamp-1 mb-4">
                    {design.customSummary}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link href="/products" className="flex-1">
                      <Button
                        variant="accent"
                        size="sm"
                        className="w-full gap-1.5 text-xs"
                      >
                        <Pencil size={12} /> Continue Editing
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#9A9A9A] hover:text-red-500 hover:bg-red-50 shrink-0"
                      onClick={() => handleDelete(design.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-brand-border p-16 text-center shadow-sm"
          >
            <div className="h-16 w-16 mx-auto rounded-2xl bg-brand-surface flex items-center justify-center mb-4">
              <Bookmark size={28} className="text-brand-muted" />
            </div>
            <h3 className="font-bold text-brand-black text-lg mb-1">
              No saved designs yet
            </h3>
            <p className="text-sm text-brand-muted mb-6 max-w-sm mx-auto">
              Start creating your first custom design. Your drafts will be saved
              here so you can pick up right where you left off.
            </p>
            <Link href="/products">
              <Button variant="accent" size="md" className="gap-1.5">
                <Plus size={14} /> Start Designing
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
