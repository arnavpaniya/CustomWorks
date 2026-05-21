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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
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
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 select-none flex flex-col items-center">
          <div className="relative w-56 h-14 mb-3">
            <Image
              src="/images/logo.png"
              alt="CustomWorks Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <p className="text-[10px] text-blue-450 uppercase tracking-widest font-black">
            Pro Operations Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0d111d]/65 backdrop-blur-md border border-[#1e293b]/70 rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#3b82f6]/20">
          {/* Blue top accent border */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent"></div>

          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Admin Authentication
          </h2>
          <p className="text-xs text-zinc-400 mb-6">
            Enter credentials to establish secure administrator session.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl p-4 mb-5 flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-2"
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
                className="w-full bg-[#070a13] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-2"
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
                className="w-full bg-[#070a13] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3b82f6] hover:bg-[#60a5fa] disabled:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg shadow-[#3b82f6]/10 hover:shadow-[#3b82f6]/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Authenticating..." : "Initiate Session"}</span>
                {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-zinc-600 mt-6 font-semibold tracking-wider uppercase">
          SECURE ACCESS ONLY &copy; 2026 CUSTOMWORKS CO.
        </p>
      </div>
    </div>
  );
}
