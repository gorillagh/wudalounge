import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-I_D20I1RsDV5W4DlGvC2MAmeSTtD7Vs",
  authDomain: "wudalounge.firebaseapp.com",
  projectId: "wudalounge",
  storageBucket: "wudalounge.appspot.com",
  messagingSenderId: "603896029712",
  appId: "1:603896029712:web:c996fdd91fac9797d56095",
  measurementId: "G-7V3V74Q6EZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
