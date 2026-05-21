"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" className="inline mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.003 24.003 0 0 0 0 21.56l7.98-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 256 315" fill="currentColor" className="inline mr-2 text-zinc-900">
    <path d="M213.8 152.9c-.3 36.6 30 54.2 31.3 54.9-17.1 25.1-43.8 28.5-53.1 28.8-22.3 2.3-43.5-13.1-54.8-13.1-11.2 0-28.7 12.8-47.3 12.5-24.5-.4-47-14.3-59.6-36.1-25.4-44-6.5-109.1 18.1-144.5 12-17.3 26-32.7 44.7-32 18 1.3 35.1 13.2 46.1 13.2 10.9 0 31.4-14 52.8-11.9 8.9.4 34 3.6 50.1 27.2-1.3.8-30.1 17.5-29.8 52.2M175.2 50.1c9.7-11.8 16.3-28.2 14.5-44.6-14 1.1-31 9.8-41.1 21.6-8.7 10.1-16.3 26.8-14.3 42.9 15.6 1.2 31.2-8.1 40.9-19.9"/>
  </svg>
);

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (form.password.length < 8) e.password = "Min. 8 characters required.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!agreedToTerms) e.terms = "Please agree to the terms.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password.trim());
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: form.name.trim()
        });
      }

      window.location.href = "/account/dashboard";
    } catch (err: any) {
      console.error("Firebase Registration Error:", err);
      if (err.code === "auth/email-already-in-use") {
        setErrors({ email: "This email address is already in use." });
      } else if (err.code === "auth/invalid-email") {
        setErrors({ email: "Invalid email address format." });
      } else if (err.code === "auth/weak-password") {
        setErrors({ password: "Weak password. Please use a stronger password." });
      } else {
        setErrors({ submit: err.message || "Failed to create account. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrors({});
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/account/dashboard";
    } catch (err: any) {
      console.error("Firebase Google Signup Error:", err);
      setErrors({ submit: err.message || "Google registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-200 flex items-center justify-center p-4 md:p-8 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white border border-zinc-300 rounded-[2.5rem] md:rounded-[3.2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row aspect-[4/3] min-h-[580px] md:min-h-[660px]"
      >
        {/* Left Column: Form Panel */}
        <div className="w-full md:w-[45%] bg-gradient-to-tr from-[#EBE9E4] via-[#F4F3EF] to-[#FBFBFA] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Logo Badge */}
          <div className="flex items-center">
            <div className="border border-zinc-300 rounded-full px-5 py-2 text-xs font-semibold text-zinc-700 tracking-tight bg-white/20 backdrop-blur-sm shadow-sm select-none">
              Crextio <span className="text-zinc-400 font-normal">/ CustomWorks</span>
            </div>
          </div>

          {/* Form Content - Scrollable wrapper for smaller/longer elements */}
          <div className="my-auto py-4 overflow-y-auto max-h-[75vh] pr-1">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              Create an account
            </h1>
            <p className="text-xs text-zinc-500 font-normal mt-1 uppercase tracking-wide">
              Sign up and get 30 day free trial
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Amélie Laurent"
                  className={`w-full bg-[#1F1F1F]/[0.02] border rounded-full px-5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner ${
                    errors.name ? "border-red-400" : "border-zinc-300/80"
                  }`}
                />
                {errors.name && <p className="text-[10px] text-red-600 ml-3">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="amélielaurent7622@gmail.com"
                  className={`w-full bg-[#1F1F1F]/[0.02] border rounded-full px-5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner ${
                    errors.email ? "border-red-400" : "border-zinc-300/80"
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-600 ml-3">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 99999 99999"
                  className={`w-full bg-[#1F1F1F]/[0.02] border rounded-full px-5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner ${
                    errors.phone ? "border-red-400" : "border-zinc-300/80"
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-600 ml-3">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`w-full bg-[#1F1F1F]/[0.02] border rounded-full px-5 py-2.5 pr-12 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner ${
                      errors.password ? "border-red-400" : "border-zinc-300/80"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-600 ml-3">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full bg-[#1F1F1F]/[0.02] border rounded-full px-5 py-2.5 pr-12 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner ${
                      errors.confirmPassword ? "border-red-400" : "border-zinc-300/80"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-red-600 ml-3">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all shadow-inner ${
                    agreedToTerms
                      ? "bg-zinc-800 border-zinc-800 text-white"
                      : errors.terms
                      ? "border-red-400 bg-red-50"
                      : "border-zinc-300 bg-white hover:border-zinc-400"
                  }`}
                  role="checkbox"
                  aria-checked={agreedToTerms}
                >
                  {agreedToTerms && <Check size={12} strokeWidth={3} />}
                </button>
                <p className="text-[11px] text-zinc-500 leading-normal font-medium">
                  I agree to the{" "}
                  <Link href="/terms" className="text-zinc-800 underline font-bold">
                    Terms & Conditions
                  </Link>{" "}
                  and Privacy Policy
                </p>
              </div>
              {errors.terms && <p className="text-[10px] text-red-600 ml-3">{errors.terms}</p>}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FDE047] hover:bg-[#FACC15] active:scale-[0.98] text-zinc-900 font-bold text-sm tracking-wide py-3 px-6 rounded-full shadow-lg shadow-yellow-500/10 transition-all flex items-center justify-center"
                >
                  {loading ? "Creating account..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center border border-zinc-300 rounded-full py-2 text-[11px] font-bold text-zinc-800 hover:bg-white/40 transition-colors bg-white/20">
                <AppleIcon />
                <span>Apple</span>
              </button>
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex items-center justify-center border border-zinc-300 rounded-full py-2 text-[11px] font-bold text-zinc-800 hover:bg-white/40 transition-colors bg-white/20"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium pt-2">
            <span className="hover:text-zinc-800 transition-colors">
              Have any account?{" "}
              <Link href="/login" className="text-zinc-800 underline font-bold">
                Sing in
              </Link>
            </span>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Right Column: Creative Collaboration Banner (Symmetrical to Login) */}
        <div className="hidden md:block w-[55%] relative p-6 bg-zinc-900">
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl">
            {/* Background Studio Photo */}
            <img
              src="/images/login_side_banner.png"
              alt="Design Studio Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9]"
            />
            
            {/* Close button */}
            <Link
              href="/"
              className="absolute top-5 right-5 h-9 w-9 bg-white text-zinc-700 hover:text-zinc-950 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-20 cursor-pointer"
            >
              <X size={16} strokeWidth={2.5} />
            </Link>

            {/* Yellow sticky notes layout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 left-6 bg-[#FEF08A] text-zinc-900 p-4 rounded-2xl shadow-xl w-[220px] border border-yellow-300 select-none z-10"
            >
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-zinc-900"></div>
              <h4 className="text-xs font-bold text-zinc-900 tracking-tight pr-4 leading-tight">
                Task Review With Team
              </h4>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wide mt-1.5 uppercase">
                09:30am - 10:00am
              </p>
            </motion.div>

            <div className="absolute top-[30px] left-[34px] bg-zinc-900/60 border border-zinc-700 backdrop-blur-md p-4 rounded-2xl w-[220px] h-[72px] shadow-lg select-none pointer-events-none">
              <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
            </div>

            {/* Avatar overlaps */}
            <div className="absolute right-6 top-[130px] flex flex-col gap-2 z-10">
              <div className="relative flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar 1"
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md relative z-10"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar 2"
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md -ml-3 relative z-20"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar 3"
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md -ml-3 relative z-30"
                />
              </div>
            </div>

            {/* Calendar grid tracker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute right-6 bottom-36 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl select-none z-10 w-[280px]"
            >
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <span key={day} className="text-[8px] uppercase tracking-wider font-bold text-white/50">
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mt-1.5">
                {[22, 23, 24, 25, 26, 27, 28].map((num) => (
                  <span
                    key={num}
                    className={`text-xs font-black p-1 rounded-md tracking-tight ${
                      num === 25 ? "bg-white text-zinc-950" : "text-white"
                    }`}
                  >
                    {num}
                  </span>
                ))}
              </div>
              <div className="h-7 w-full mt-3 rounded-lg overflow-hidden border border-white/10 relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, transparent 4px, transparent 8px)",
                  }}
                ></div>
              </div>
            </motion.div>

            {/* White bottom-left tracker widget */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 bg-white text-zinc-900 p-4 rounded-2xl shadow-2xl w-[200px] border border-zinc-100 select-none z-10"
            >
              <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-amber-400"></div>
              <h4 className="text-xs font-extrabold tracking-tight text-zinc-900">
                Daily Meeting
              </h4>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wide mt-1 uppercase">
                12:00pm - 01:00pm
              </p>
              <div className="flex items-center mt-3">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="h-5 w-5 rounded-full bg-zinc-800 text-[8px] font-bold text-white flex items-center justify-center border border-white">M</div>
                  <div className="h-5 w-5 rounded-full bg-zinc-600 text-[8px] font-bold text-white flex items-center justify-center border border-white">A</div>
                  <div className="h-5 w-5 rounded-full bg-zinc-400 text-[8px] font-bold text-white flex items-center justify-center border border-white">S</div>
                  <div className="h-5 w-5 rounded-full bg-zinc-200 text-[8px] font-bold text-zinc-700 flex items-center justify-center border border-white">L</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
