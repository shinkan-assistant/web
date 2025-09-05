"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
// TODO try-catch 作りたい（アカウント消された時は、ここで、Bad Request と出る）
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


export {firebaseApp, auth, db};
