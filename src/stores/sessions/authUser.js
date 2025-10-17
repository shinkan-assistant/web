'use client';

import { onIdTokenChanged } from '@/helpers/auth/client';
import { createContext, useEffect, useContext } from 'react';
import { setCookie, deleteCookie } from "cookies-next";
import { convertUserImpl2AuthUser } from '../../helpers/auth/utils';
import useLoadedState from '@/helpers/hooks/loadedState';

const LoadedAuthUserContext = createContext(null);

function AuthUserProvider({ children }) {
  const [loadedAuthUser, setLoadedAuthUser] = useLoadedState();

  useEffect(() => {
    const unsubscribeAuth = onIdTokenChanged(async (latestUserImpl) => {
      const latestAuthUser = convertUserImpl2AuthUser(latestUserImpl);
      if (latestAuthUser) {
        const idToken = await latestUserImpl.getIdToken();
        setCookie("__session", idToken);
      } else {
        deleteCookie("__session");
      }
      setLoadedAuthUser(latestAuthUser);
    });

    return unsubscribeAuth;
  }, []);

  return (
    <LoadedAuthUserContext.Provider value={loadedAuthUser}>
      {children}
    </LoadedAuthUserContext.Provider>
  );
}

function useLoadedAuthUser() {
  return useContext(LoadedAuthUserContext);
}

export { AuthUserProvider, useLoadedAuthUser };
