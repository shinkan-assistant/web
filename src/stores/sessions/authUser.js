'use client';

import { onIdTokenChanged } from '@/helpers/auth/client';
import { createContext, useEffect, useContext, useState } from 'react';
import { setCookie, deleteCookie } from "cookies-next";
import { convertUserImpl2AuthUser } from '../../helpers/auth/utils';

const AuthUserContext = createContext(null);


function AuthUserProvider({ initialAuthUser, children }) {
  const [authUser, setAuthUser] = useState(initialAuthUser);

  useEffect(() => {
    const unsubscribeAuth = onIdTokenChanged(async (latestUserImpl) => {
      const latestAuthUser = convertUserImpl2AuthUser(latestUserImpl);
      if (latestAuthUser) {
        const idToken = await latestUserImpl.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      setAuthUser(latestAuthUser);
    });

    return unsubscribeAuth;
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
