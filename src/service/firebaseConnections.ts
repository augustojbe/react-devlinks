import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3-1KOxeG02YafR5aR7MSavK57lBsi2cg",
  authDomain: "reactlinks-b865d.firebaseapp.com",
  projectId: "reactlinks-b865d",
  storageBucket: "reactlinks-b865d.firebasestorage.app",
  messagingSenderId: "835659089938",
  appId: "1:835659089938:web:67292bb697ac92180730cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
