
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiqWTpJ9xQkHEpvCJbM01h6zA3PvuadoU",
  authDomain: "fitnessapp-2e3ec.firebaseapp.com",
  projectId: "fitnessapp-2e3ec",
  storageBucket: "fitnessapp-2e3ec.firebasestorage.app",
  messagingSenderId: "632276791374",
  appId: "1:632276791374:web:70d9723b20dd2281c9531f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const timestamp = serverTimestamp;