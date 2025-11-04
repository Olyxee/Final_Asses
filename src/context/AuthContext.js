import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthChange,
  signIn as firebaseSignIn,
  signUp as firebaseSignUp,
  resetPassword as firebaseResetPassword,
  signOut as firebaseSignOut,
} from "../services/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read persisted onboarding/login state first
    let mounted = true;

    const init = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser && mounted) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Auth init error:", e);
      }
    };

    init();

    const unsubscribe = onAuthChange(async (fbUser) => {
      if (!mounted) return;
      if (fbUser) {
        const userData = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || null,
        };
        setUser(userData);
        try {
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        } catch (e) {
          console.warn("Failed to persist user:", e);
        }
      } else {
        setUser(null);
        try {
          await AsyncStorage.removeItem("user");
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe && unsubscribe();
    };
  }, []);

  // Wrapper helpers that delegate to firebase services. Errors bubble up.
  const signIn = async (email, password) => {
    return firebaseSignIn(email, password);
  };

  const signUp = async (email, password, name) => {
    return firebaseSignUp(email, password, name);
  };

  const resetPassword = async (email) => {
    return firebaseResetPassword(email);
  };

  const signOut = async () => {
    return firebaseSignOut();
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    resetPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
