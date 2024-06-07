import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "ezrental-86136.appspot.com",
  messagingSenderId: "70232069740",
  appId: "1:70232069740:web:6ac25089dd5757ff14ea49",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(app);
export const storageRef = (token:string) => ref(storage, token);
