import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

// Simple Firestore demo helpers for CRUD on a `demo_tasks` collection.
// Uses the same `db` exported from `src/services/firebase/config.js`.

export const addDemoTask = async (text) => {
  try {
    const ref = await addDoc(collection(db, "demo_tasks"), {
      text,
      done: false,
      createdAt: new Date().toISOString(),
    });
    return { ok: true, id: ref.id };
  } catch (error) {
    console.error("addDemoTask error:", error);
    return { ok: false, error };
  }
};

export const getDemoTasks = async () => {
  try {
    const snap = await getDocs(collection(db, "demo_tasks"));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { ok: true, data: items };
  } catch (error) {
    console.error("getDemoTasks error:", error);
    return { ok: false, error };
  }
};

export const updateDemoTask = async (id, updates) => {
  try {
    const ref = doc(db, "demo_tasks", id);
    await updateDoc(ref, updates);
    return { ok: true };
  } catch (error) {
    console.error("updateDemoTask error:", error);
    return { ok: false, error };
  }
};

export const deleteDemoTask = async (id) => {
  try {
    await deleteDoc(doc(db, "demo_tasks", id));
    return { ok: true };
  } catch (error) {
    console.error("deleteDemoTask error:", error);
    return { ok: false, error };
  }
};
