import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKUr81JEqTS72zOcO30mRSFeojhLyvgCE",
  authDomain: "react-native-tinder-app.firebaseapp.com",
  projectId: "react-native-tinder-app",
  storageBucket: "react-native-tinder-app.appspot.com",
  messagingSenderId: "133116441410",
  appId: "1:133116441410:web:182ea115ec9f27a8f74edb",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
