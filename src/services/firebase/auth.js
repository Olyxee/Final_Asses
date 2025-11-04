import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

export const signIn = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    // Update auth profile
    await firebaseUpdateProfile(user, data);

    // Update Firestore user document
    const userDoc = doc(db, "users", user.uid);
    await setDoc(
      userDoc,
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
    return true;
  } catch (error) {
    throw error;
  }
};
