import "server-only";

import { cookies } from "next/headers";
import { initializeServerApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  const firebaseServerApp = initializeServerApp(initializeApp(firebaseConfig), {authIdToken});

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();
  const authUser = auth.currentUser;

  return { firebaseServerApp, authUser };
}

export function getAuthenticatedDb(firebaseServerApp) {
  return getFirestore(firebaseServerApp);
}
