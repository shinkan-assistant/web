'use client';

import { onIdTokenChanged } from '@/lib/firebase/auth';
import { createContext, useEffect, useContext, useState } from 'react';
import { setCookie, deleteCookie } from "cookies-next";

const AuthUserContext = createContext(null);

function toAuthUser(src) {
  return src ? {
    email: src.email,
    displayName: src.displayName,
    photoURL: src.photoURL,
  } : undefined;
}

function AuthUserProvider({ initialAuthUser, children }) {
  const [authUser, setAuthUser] = useState(toAuthUser(initialAuthUser));

  useEffect(() => {
    const unsubscribeAuth = onIdTokenChanged(async (latestAuthUser) => {
      if (latestAuthUser) {
        const idToken = await latestAuthUser.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      setAuthUser(toAuthUser(latestAuthUser));
    });

    return () => {
      unsubscribeAuth(null);
    }
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}

function useAuthUser() {
  return useContext(AuthUserContext);
}

export { AuthUserProvider, useAuthUser };
