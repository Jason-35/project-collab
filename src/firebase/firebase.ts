import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_V1,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_V1,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_V1,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_V1,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_V1,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_V1,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_V1
};

const app: FirebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app;
