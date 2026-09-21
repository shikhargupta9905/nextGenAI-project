import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "nextgenai-7faba.firebaseapp.com",
  projectId: "nextgenai-7faba",
  storageBucket: "nextgenai-7faba.firebasestorage.app",
  messagingSenderId: "784866895321",
  appId: "1:784866895321:web:b88477a4edf9955bcca5c8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };