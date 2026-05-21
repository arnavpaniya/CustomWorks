"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    try {
      const response = await fetch("http://localhost:4000/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Store credentials
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", data.username);

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
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">
            Pro Operations Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121217]/65 backdrop-blur-md border border-[#23232F]/70 rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#FF5E36]/20">
          {/* Orange top accent border */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF5E36] to-transparent"></div>

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
                className="w-full bg-[#181822] border border-[#23232F] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF5E36]/50 transition-colors"
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
                className="w-full bg-[#181822] border border-[#23232F] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF5E36]/50 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5E36] hover:bg-[#ff704d] disabled:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg shadow-[#FF5E36]/10 hover:shadow-[#FF5E36]/20 transition-all duration-300 flex items-center justify-center gap-2"
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
