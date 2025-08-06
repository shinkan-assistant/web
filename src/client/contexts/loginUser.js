'use client';

import { createContext, useContext } from 'react';
import useUserSession from '@/client/hooks/useUserSession';

const LoginUserContext = createContext(undefined);

function LoginUserProvider({ initialUser, children }) {
  const user = useUserSession(initialUser);

  return (
    <LoginUserContext.Provider value={user}>
      {children}
    </LoginUserContext.Provider>
  );
}

function useLoginUser() {
  return useContext(LoginUserContext);
}

export {LoginUserProvider, useLoginUser}
