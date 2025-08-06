'use client';

import { createContext, useContext } from 'react';
import useUserSession from '@/client/hooks/useUserSession';

const AuthUserContext = createContext(null);
const UserMetadataContext = createContext(null);

function UserProvider({ initialAuthUser, children }) {
  const { authUser, userMetadata } = useUserSession(initialAuthUser);

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
