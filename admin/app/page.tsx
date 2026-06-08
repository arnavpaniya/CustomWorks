"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(process.env.NEXT_PUBLIC_ADMIN_USERNAME || "");
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const localUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "mohit";
    const localPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "mohit123";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://customworks.onrender.com/api";
      let token = "";
      let user = "";
      let loginSuccess = false;

      try {
        const response = await fetch(`${apiUrl}/auth/admin-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          token = data.token;
          user = data.username;
          loginSuccess = true;
        } else {
          console.warn("Backend rejected credentials, trying local validation...");
        }
      } catch (fetchErr) {
        console.error("Backend login fetch error:", fetchErr);
      }

      // If backend login failed or was unreachable, fallback to checking credentials locally
      if (!loginSuccess) {
        if (username === localUsername && password === localPassword) {
          token = "local-bypass-token";
          user = username;
          loginSuccess = true;
        } else {
          throw new Error("Invalid credentials");
        }
      }

      // Store credentials
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", user);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Admin Auth Error:", err);
      setError(err.message || "Invalid credentials or network failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-[#030712]">
      {/* Premium background gradient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_60%)] rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_60%)] rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="w-full max-w-[440px] z-10 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-8 select-none flex flex-col items-center">
          <div className="relative w-56 h-14 mb-2">
            <Image
              src="/images/logo-v2.png"
              alt="CustomWorks Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <p className="text-[10px] text-indigo-400 uppercase tracking-[0.25em] font-extrabold font-mono">
            Pro Operations Console
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group">
          {/* Top accent glow line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Sign In
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Enter admin credentials to access the command ledger.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl p-4 mb-5 flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. mohit"
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full glow-button disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{loading ? "Establishing Session..." : "Establish Session"}</span>
                {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[9px] text-gray-650 mt-8 font-semibold tracking-[0.15em] uppercase font-mono">
          SECURE OPERATIONS GATEWAY &copy; 2026 CUSTOMWORKS CO.
        </p>
      </div>
    </div>
  );
}
