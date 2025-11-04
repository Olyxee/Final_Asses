import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";

export const testFirestore = async () => {
  try {
    const testDocRef = doc(collection(db, "app_test"), "ping");
    await setDoc(testDocRef, { timestamp: new Date().toISOString() });
    const snap = await getDoc(testDocRef);
    if (snap.exists()) {
      console.log("Firestore test success:", snap.data());
      return { ok: true, data: snap.data() };
    } else {
      console.warn("Firestore test: doc does not exist");
      return { ok: false, error: "no-doc" };
    }
  } catch (error) {
    console.error("Firestore test failed:", error);
    return { ok: false, error };
  }
};
