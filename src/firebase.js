import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAnZbbqbdp4PKBzftmnLp_Wrgn_g0n1olY",
  authDomain: "login-otp-e5763.firebaseapp.com",
  projectId: "login-otp-e5763",
  storageBucket: "login-otp-e5763.appspot.com",
  messagingSenderId: "715920259477",
  appId: "1:715920259477:web:9e31114f83b1c2e4699e9c",
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
