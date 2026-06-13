import { initializeApp } from "firebase/app";
import { getAI, VertexAIBackend } from "firebase/ai";
import { getAuth } from "firebase/auth";
import {
  collection,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import type { FirebaseConfig } from "../types";
import { EXPRESSIONS_COLLECTION } from "./firestore";

function readFirebaseConfig(): FirebaseConfig {
  const config = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const missing = Object.entries(config)
    .filter(([key, value]) => key !== "measurementId" && !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing Firebase environment variables: ${missing.join(", ")}`);
  }

  return config as FirebaseConfig;
}

export const firebaseConfig = readFirebaseConfig();
export const firebaseApp = initializeApp(firebaseConfig);
export const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
export const auth = getAuth(firebaseApp);
export const ai = getAI(firebaseApp, { backend: new VertexAIBackend("global") });
export const expressionsRef = collection(db, EXPRESSIONS_COLLECTION);
