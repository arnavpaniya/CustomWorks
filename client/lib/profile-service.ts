import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  name?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  companyName?: string;
  gstin?: string;
}

const LOCAL_STORAGE_KEY_PREFIX = "customworks_profile_";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) return null;

  // 1. Try Firestore with a timeout (prevents hanging if Firestore is not initialized/created)
  if (db) {
    try {
      const userDocRef = doc(db, "users", uid);

      // Race Firestore getDoc with a 1.5 second timeout
      const getDocPromise = getDoc(userDocRef);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore fetch timeout")), 1500)
      );

      const userSnapshot = await Promise.race([getDocPromise, timeoutPromise]);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data() as UserProfile;
        // Sync/cache to LocalStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`, JSON.stringify(data));
        }
        return data;
      }
    } catch (error) {
      console.warn("Failed to fetch user profile from Firestore, falling back to LocalStorage:", error);
    }
  }

  // 2. Fallback to LocalStorage
  try {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`);
      if (localData) {
        return JSON.parse(localData) as UserProfile;
      }
    }
  } catch (error) {
    console.error("Failed to read user profile from LocalStorage:", error);
  }

  return null;
}

export async function saveUserProfile(uid: string, profile: UserProfile): Promise<void> {
  if (!uid) return;

  // 1. Save to LocalStorage first (for instant, guaranteed local updates)
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`, JSON.stringify(profile));
    }
  } catch (error) {
    console.error("Failed to write user profile to LocalStorage:", error);
  }

  // 2. Sync to Firestore with a timeout so it doesn't hang
  if (db) {
    try {
      const userDocRef = doc(db, "users", uid);
      const setDocPromise = setDoc(userDocRef, profile, { merge: true });
      const timeoutPromise = new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore save timeout")), 1500)
      );

      await Promise.race([setDocPromise, timeoutPromise]);
    } catch (error) {
      console.warn("Failed to sync user profile to Firestore:", error);
    }
  }
}
