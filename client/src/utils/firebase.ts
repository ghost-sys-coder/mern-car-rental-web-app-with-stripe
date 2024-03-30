import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

export const configFile = {
    key: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_API_PROJECT_ID,
    storage: import.meta.env.VITE_FIREBASE_API_STORAGE_BUCKET,
    messagingId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
    appID: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const firebaseConfig = {
  apiKey: configFile.key,
  authDomain: configFile.authDomain,
  projectId: configFile.projectId,
  storageBucket: "car-rental-webapp.appspot.com",
  messagingSenderId: configFile.measurementID,
  appId: configFile.appID,
  measurementId: configFile.measurementID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
