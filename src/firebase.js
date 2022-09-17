// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: "AIzaSyDbqxuY9GeOsw1LqWtnjn477u0EySWCiHc",  // ToDo Pasar a secret
  authDomain: "tdp-ii-grupo-5-2022-2c.firebaseapp.com",
  projectId: "tdp-ii-grupo-5-2022-2c",
  storageBucket: "tdp-ii-grupo-5-2022-2c.appspot.com",
  messagingSenderId: "553567485809",
  appId: "1:553567485809:web:fff7a56bc34001859a80d0",
  measurementId: "G-QV18T1VK8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
