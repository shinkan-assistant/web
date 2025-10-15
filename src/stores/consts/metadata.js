'use client';

import { createContext, useContext } from "react";

const MetadataContext = createContext(null);

function MetadataProvider({ children }) {
  const metadata = {
    title: "新歓アシスタント",
    description: "「無給」の新歓運営から解放されよう！",
  }

  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  );
}

function useMetadata() {
  return useContext(MetadataContext);
}

export { MetadataProvider, useMetadata };
