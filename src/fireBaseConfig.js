import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDos-mw9ZKHM7o0EipnS5hH-SgjdpjQ2VA",
  authDomain: "react-task-management-b9670.firebaseapp.com",
  projectId: "react-task-management-b9670",
  storageBucket: "react-task-management-b9670.firebasestorage.app",
  messagingSenderId: "245586385127",
  appId: "1:245586385127:web:692c9ae5b5a411718eea42",
  measurementId: "G-CPLKBV3J9F",
};

const app = initializeApp(firebaseConfig);
export default app;
