'use client';

import { useEffect, useState } from "react";
import {
  onIdTokenChanged,
} from "@/lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

export default function useAuthUserSession (initialAuthUser) {
  const [authUser, setAuthUser] = useState(initialAuthUser);

  useEffect(() => {
    const unsubscribeAuth = onIdTokenChanged(async (latestAuthUser) => {
      if (latestAuthUser) {
        const idToken = await latestAuthUser.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      setAuthUser(latestAuthUser)
    });

    return () => {
      unsubscribeAuth(null);
    }
  }, []);

  return authUser;
};
