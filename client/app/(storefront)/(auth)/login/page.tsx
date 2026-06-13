"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.003 24.003 0 0 0 0 21.56l7.98-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const features = [
  { icon: Sparkles,   text: "Live design customizer" },
  { icon: ShieldCheck, text: "100% premium quality" },
  { icon: Truck,      text: "Bengaluru-wide shipping" },
];

export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed]             = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    if (!agreed) { setError("Please agree to the Terms & Conditions to continue."); return; }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      window.location.href = "/dashboard";
    } catch (err: any) {
      if (["auth/user-not-found","auth/wrong-password","auth/invalid-credential"].includes(err.code)) {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Sign in failed. Please try again.");
      }
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError(""); setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = "/dashboard";
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Google sign-in failed.");
      }
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF6F0] overflow-hidden">
      {/* ── LEFT: Visual/Narrative Side (Hidden on mobile) ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-[50%] xl:w-[55%] bg-narrative-forest relative overflow-hidden flex-col items-center justify-center p-12 xl:p-20"
      >
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/premium_packaging.jpg"
            alt="CustomWorks premium printing details"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-narrative-forest via-narrative-forest/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-narrative-forest to-transparent opacity-85" />
        </div>

        {/* Dynamic Blobs */}
        <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-narrative-clay/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 rounded-full bg-narrative-sage/10 blur-[100px] pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-xl text-left space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl xl:text-6xl font-black font-serif text-white leading-[1.15] tracking-tight"
          >
            Design anything. <br />
            <span className="text-narrative-ochre italic font-normal">Print everything.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base xl:text-lg text-white/70 leading-relaxed max-w-md font-light"
          >
            Create bespoke custom designed products, made to order and shipped across Bengaluru.
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-3.5 mt-8 max-w-sm"
          >
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-sm">
                <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-narrative-ochre shrink-0">
                  <Icon size={14} />
                </div>
                <span className="text-sm text-white/90 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── RIGHT: Form Side ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-[50%] xl:w-[45%] flex items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen relative z-10"
      >
        {/* Form Card */}
        <div className="w-full max-w-md bg-white border border-zinc-200/40 shadow-md rounded-[2rem] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-narrative-clay/5 blur-2xl pointer-events-none" />
          
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-narrative-forest tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-narrative-forest/60 mt-1 font-light">
              Sign in to your CustomWorks account to continue.
            </p>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-zinc-200/60 bg-white hover:bg-zinc-50 text-sm font-semibold text-narrative-forest transition-all shadow-xs mb-4 disabled:opacity-60 cursor-pointer"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-[10px] font-bold text-zinc-400 tracking-wide">OR EMAIL</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 font-medium">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-narrative-forest">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                className="w-full h-11 px-4 rounded-xl border border-zinc-200/60 bg-white text-sm text-narrative-forest placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-narrative-forest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full h-11 px-4 pr-11 rounded-xl border border-zinc-200/60 bg-white text-sm text-narrative-forest placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-narrative-forest transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`h-[18px] w-[18px] rounded-[5px] border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                  agreed
                    ? "bg-narrative-forest border-narrative-forest"
                    : "border-zinc-300 bg-white hover:border-narrative-forest"
                }`}
                role="checkbox"
                aria-checked={agreed}
              >
                {agreed && <Check size={10} strokeWidth={3.5} className="text-white" />}
              </button>
              <p className="text-[11px] sm:text-xs text-narrative-forest/70 leading-relaxed font-light">
                I agree to the{" "}
                <Link href="/terms" className="text-narrative-forest font-semibold underline underline-offset-2 hover:text-narrative-clay transition-colors">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-narrative-forest font-semibold underline underline-offset-2 hover:text-narrative-clay transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-narrative-forest hover:bg-narrative-clay active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-zinc-950/10 mt-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in…
                </>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-narrative-forest/70 mt-6 font-light">
            New to CustomWorks?{" "}
            <Link href="/register" className="text-narrative-clay font-bold hover:underline underline-offset-2 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
