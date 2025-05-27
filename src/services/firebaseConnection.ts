import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD38XqJfdzjuKIFhYMPUZELsuK7XpvL61Q",
  authDomain: "webcarros-932ff.firebaseapp.com",
  projectId: "webcarros-932ff",
  storageBucket: "webcarros-932ff.firebasestorage.app",
  messagingSenderId: "1049952176252",
  appId: "1:1049952176252:web:490a27114f4fba96b361f9",
  measurementId: "G-D8XTRSCS8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };
