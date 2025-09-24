"use client";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {firebaseApp, db};
