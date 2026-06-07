"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
        },
        (error) => {
          console.error("Firebase Auth Error (check API key):", error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase init error:", error);
      setLoading(false);
    }
  }, []);

  return { user, loading };
}
