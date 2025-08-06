'use client';

import { createContext, useContext } from 'react';
import useAuthUserSession from '@/client/hooks/useAuthUserSession';

const AuthUserContext = createContext(null);

function UserProvider({ initialAuthUser, children }) {
  const authUser = useAuthUserSession(initialAuthUser);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}

function useAuthUser() {
  return useContext(AuthUserContext);
}

export {UserProvider, useAuthUser};
