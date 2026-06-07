"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.003 24.003 0 0 0 0 21.56l7.98-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const features = [
  { icon: Sparkles,    text: "Live design customizer" },
  { icon: ShieldCheck, text: "100% premium quality" },
  { icon: Truck,       text: "Pan-India delivery" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms]             = useState(false);
  const [loading, setLoading]                         = useState(false);
  const [errors, setErrors]                           = useState<Record<string, string>>({});

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (form.password.length < 8) e.password = "Minimum 8 characters required.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!agreedToTerms) e.terms = "Please agree to the Terms & Conditions.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password.trim());
      if (cred.user) await updateProfile(cred.user, { displayName: form.name.trim() });
      window.location.href = "/dashboard";
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") setErrors({ email: "This email is already in use." });
      else if (err.code === "auth/invalid-email")   setErrors({ email: "Invalid email address format." });
      else if (err.code === "auth/weak-password")   setErrors({ password: "Please use a stronger password." });
      else setErrors({ submit: err.message || "Failed to create account. Please try again." });
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setErrors({}); setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = "/dashboard";
    } catch (err: any) {
      setErrors({ submit: err.message || "Google sign-up failed." });
    } finally { setLoading(false); }
  };

  const Field = ({
    label, id, type = "text", value, onChange, placeholder, error, autoComplete,
    right,
  }: {
    label: string; id: string; type?: string; value: string;
    onChange: (v: string) => void; placeholder: string; error?: string;
    autoComplete?: string; right?: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-brand-black">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full h-11 px-4 ${right ? "pr-11" : ""} rounded-xl border bg-[#FAFAF9] text-sm text-brand-black placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-black/20 focus:border-brand-black transition-all ${
            error ? "border-red-400 bg-red-50/30" : "border-brand-border"
          }`}
        />
        {right && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{right}</div>
        )}
      </div>
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* ── LEFT: Form Area ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-[45%] xl:w-[40%] flex flex-col min-h-screen relative z-10 shadow-[10px_0_40px_rgba(0,0,0,0.05)]"
      >
        <div className="flex-1 flex flex-col p-8 sm:p-12 lg:p-16 xl:p-20 overflow-y-auto">


          <div className="mb-6">
            <h1 className="text-[1.75rem] font-black text-brand-black tracking-tight leading-tight">
              Create your account
            </h1>
            <p className="text-sm text-brand-muted mt-1.5">
              Join CustomWorks and start designing today
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-brand-border bg-white hover:bg-brand-surface text-sm font-semibold text-brand-black transition-all shadow-sm hover:shadow-md mb-5 disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-[11px] font-medium text-brand-muted tracking-wide">OR</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          {/* Global error */}
          <AnimatePresence>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 font-medium">
                  {errors.submit}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Full name" id="name" value={form.name}
                onChange={(v) => update("name", v)} placeholder="Your name"
                autoComplete="name" error={errors.name}
              />
              <Field
                label="Phone" id="phone" type="tel" value={form.phone}
                onChange={(v) => update("phone", v)} placeholder="+91 98765 43210"
                autoComplete="tel" error={errors.phone}
              />
            </div>

            {/* Email */}
            <Field
              label="Email address" id="email" type="email" value={form.email}
              onChange={(v) => update("email", v)} placeholder="you@example.com"
              autoComplete="email" error={errors.email}
            />

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Password" id="password"
                type={showPassword ? "text" : "password"}
                value={form.password} onChange={(v) => update("password", v)}
                placeholder="Min. 8 chars" autoComplete="new-password"
                error={errors.password}
                right={
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-brand-muted hover:text-brand-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
              <Field
                label="Confirm password" id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword} onChange={(v) => update("confirmPassword", v)}
                placeholder="Re-enter" autoComplete="new-password"
                error={errors.confirmPassword}
                right={
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-brand-muted hover:text-brand-black transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
            </div>

            {/* T&C */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`h-[18px] w-[18px] rounded-[5px] border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    agreedToTerms
                      ? "bg-brand-black border-brand-black"
                      : errors.terms
                      ? "border-red-400 bg-red-50"
                      : "border-brand-border bg-white hover:border-brand-black"
                  }`}
                  role="checkbox"
                  aria-checked={agreedToTerms}
                >
                  {agreedToTerms && <Check size={10} strokeWidth={3.5} className="text-white" />}
                </button>
                <p className="text-[11.5px] text-brand-muted leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-black font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-brand-black font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                    Privacy Policy
                  </Link>
                </p>
              </div>
              {errors.terms && <p className="text-[11px] text-red-500 font-medium ml-6">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-brand-black hover:bg-brand-black/90 active:scale-[0.98] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/15 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating account…
                </>
              ) : (
                <>Create Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-brand-muted mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-black font-bold hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      {/* ── RIGHT: Visual Area ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 bg-brand-black relative overflow-hidden flex-col items-center justify-center p-12 xl:p-20"
      >
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/placeholder-product.jpg" // Using placeholder or cinematic mockup
            alt="CustomWorks printing"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black to-transparent opacity-80" />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-xl text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight"
          >
            Your brand.<br />
            <span className="text-white/40">Your way.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base xl:text-lg text-white/50 mt-6 leading-relaxed max-w-md font-medium"
          >
            Premium custom designed & printed products, crafted to order and delivered across India.
          </motion.p>

          {/* Feature Glass Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md rounded-full px-5 py-3 shadow-xl">
                <Icon size={16} className="text-white/70 shrink-0" />
                <span className="text-sm text-white font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
