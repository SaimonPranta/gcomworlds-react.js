import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Apps Create on This Gmail
// gtravel637@gmail.com

const firebaseConfig = {
  apiKey: "AIzaSyDwH06NaRjChqN7z4Wa9u46Sb0VBGISahY",
  authDomain: "gcomworld-75c23.firebaseapp.com",
  projectId: "gcomworld-75c23",
  storageBucket: "gcomworld-75c23.appspot.com",
  messagingSenderId: "73377699264",
  appId: "1:73377699264:web:3668ee6679f12fbd2c2425",
  measurementId: "G-WZV45GBRN7",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
