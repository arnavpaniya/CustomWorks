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

  // 1. Try Firestore
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data() as UserProfile;
      // Sync/cache to LocalStorage
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.warn("Failed to fetch user profile from Firestore, falling back to LocalStorage:", error);
  }

  // 2. Fallback to LocalStorage
  try {
    const localData = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`);
    if (localData) {
      return JSON.parse(localData) as UserProfile;
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
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to write user profile to LocalStorage:", error);
  }

  // 2. Sync to Firestore
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, profile, { merge: true });
  } catch (error) {
    console.warn("Failed to sync user profile to Firestore:", error);
  }
}
