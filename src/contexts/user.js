'use client';

import { createContext, useContext } from 'react';
import useUserSession from '@/hooks/useUserSession';

const UserContext = createContext(undefined);

function UserProvider({ initialUser, children }) {
  const user = useUserSession(initialUser);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export {UserProvider, useUser}
