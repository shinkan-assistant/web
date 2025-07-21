'use client';

import { useEffect, useState } from "react";
import {
  onIdTokenChanged,
} from "@/lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

export default function useUserSession (initialUser) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (latestUser) => {
      if (latestUser) {
        const idToken = await latestUser.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }

      setUser(latestUser)
    });

    return () => unsubscribe(undefined);
  }, [user]);

  return user;
};
