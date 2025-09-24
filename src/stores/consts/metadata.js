'use client';

import { createContext, useContext } from "react";

const MetadataContext = createContext(null);

function MetadataProvider({ children }) {
  const metadata = {
    title: "Gatherlynx",
    description: "Web Application for New Welcome",
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
