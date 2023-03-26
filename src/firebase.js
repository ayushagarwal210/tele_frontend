import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAhU5Pr1oUyfrRUu3D2hX3saGLVsbr50Mo",
  authDomain: "otp-login-9bb36.firebaseapp.com",
  projectId: "otp-login-9bb36",
  storageBucket: "otp-login-9bb36.appspot.com",
  messagingSenderId: "523427360041",
  appId: "1:523427360041:web:34096ab79e7bb1d9c85b38",
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
