import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import * as authService from "./auth";
import { testFirestore } from "./testFirestore";

// onAuthChange helper — returns the unsubscribe function from Firebase
export const onAuthChange = (cb) => {
  return onAuthStateChanged(auth, cb);
};

// Re-export existing auth helpers for convenience
export * from "./auth";
export { testFirestore };

// Also export auth and db if other modules import from the directory root
export { auth } from "./config";
