import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmz-ce3_kFhAxJx-pixKHAXCTv_KYdsH0",
    authDomain: "auction-web-app-d640c.firebaseapp.com",
    databaseURL: "https://auction-web-app-d640c-default-rtdb.firebaseio.com",
    projectId: "auction-web-app-d640c",
    storageBucket: "auction-web-app-d640c.firebasestorage.app",
    messagingSenderId: "374003263941",
    appId: "1:374003263941:web:9489579ad130095ae383ac",
    measurementId: "G-QESTLYS3S5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
