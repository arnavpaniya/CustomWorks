"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      window.location.href = "/account/dashboard";
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/account/dashboard";
    } catch (err: any) {
      console.error("Firebase Google Login Error:", err);
      setError(err.message || "Google sign-in failed. Please try again.");
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
        <div className="w-full md:w-[45%] bg-gradient-to-tr from-[#EBE9E4] via-[#F4F3EF] to-[#FBFBFA] p-8 md:p-12 flex flex-col justify-between relative">
          {/* Logo Badge */}
          <div className="flex items-center">
            <div className="border border-zinc-300 rounded-full px-5 py-2 text-xs font-semibold text-zinc-700 tracking-tight bg-white/20 backdrop-blur-sm shadow-sm select-none">
              Crextio <span className="text-zinc-400 font-normal">/ CustomWorks</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="my-auto py-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              Create an account
            </h1>
            <p className="text-xs text-zinc-500 font-normal mt-1.5 uppercase tracking-wide">
              Sign up and get 30 day free trial
            </p>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Full Name (Mock field for visuals matching reference UI) */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Amélie Laurent"
                  defaultValue="Amélie Laurent"
                  className="w-full bg-[#1F1F1F]/[0.02] border border-zinc-300/80 rounded-full px-5 py-3 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amélielaurent7622@gmail.com"
                  className="w-full bg-[#1F1F1F]/[0.02] border border-zinc-300/80 rounded-full px-5 py-3 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********************"
                    className="w-full bg-[#1F1F1F]/[0.02] border border-zinc-300/80 rounded-full px-5 py-3 pr-12 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FDE047] hover:bg-[#FACC15] active:scale-[0.98] text-zinc-900 font-bold text-sm tracking-wide py-3.5 px-6 rounded-full shadow-lg shadow-yellow-500/10 transition-all flex items-center justify-center"
                >
                  {loading ? "Establishing session..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center border border-zinc-300 rounded-full py-2.5 text-[11px] font-bold text-zinc-800 hover:bg-white/40 transition-colors bg-white/20">
                <AppleIcon />
                <span>Apple</span>
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center border border-zinc-300 rounded-full py-2.5 text-[11px] font-bold text-zinc-800 hover:bg-white/40 transition-colors bg-white/20"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
            <span className="hover:text-zinc-800 transition-colors">
              Already have an account?{" "}
              <Link href="/register" className="text-zinc-800 underline font-bold">
                Sign in
              </Link>
            </span>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Right Column: Creative Collaboration Banner */}
        <div className="hidden md:block w-[55%] relative p-6 bg-zinc-900">
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl">
            {/* Main generated high-quality design studio image background */}
            <img
              src="/images/login_side_banner.png"
              alt="Design Studio Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9]"
            />
            
            {/* Absolute close button */}
            <Link
              href="/"
              className="absolute top-5 right-5 h-9 w-9 bg-white text-zinc-700 hover:text-zinc-950 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-20 cursor-pointer"
            >
              <X size={16} strokeWidth={2.5} />
            </Link>

            {/* Overlay 1: Yellow sticky-style task review note */}
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

            {/* Sticky behind representation */}
            <div className="absolute top-[30px] left-[34px] bg-zinc-900/60 border border-zinc-700 backdrop-blur-md p-4 rounded-2xl w-[220px] h-[72px] shadow-lg select-none pointer-events-none">
              <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
            </div>

            {/* Avatar overlapping bubbles */}
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

            {/* Overlay 2: Calendar widget grid overlay */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute right-6 bottom-36 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl select-none z-10 w-[280px]"
            >
              {/* Day Header Row */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <span key={day} className="text-[8px] uppercase tracking-wider font-bold text-white/50">
                    {day}
                  </span>
                ))}
              </div>
              {/* Day Number Row */}
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
              {/* Elegant CSS diagonal line fill block */}
              <div className="h-7 w-full mt-3 rounded-lg overflow-hidden border border-white/10 relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, transparent 4px, transparent 8px)",
                  }}
                ></div>
              </div>
            </motion.div>

            {/* Overlay 3: White "Daily Meeting" tracker card */}
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
              {/* Small overlapping team bubbles */}
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
