import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6SUEMXZpm_VEGz-y8BKUcYhWDiWFiOis",
  authDomain: "finalass-2bf85.firebaseapp.com",
  projectId: "finalass-2bf85",
  storageBucket: "finalass-2bf85.firebasestorage.app",
  messagingSenderId: "846941959371",
  appId: "1:846941959371:web:c091544ff12102783ed74e",
  measurementId: "G-0CZ7E4BSFP"
};

try {
  console.log("✅ Firebase initialized:", app?.name || "(unnamed)");
} catch (e) {
  // ignore logging errors
}

const auth = getAuth(app);
const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { auth, db };
