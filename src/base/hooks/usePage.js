import { db } from "@/lib/firebase/clientApp";
import { useState } from "react"

export default function usePageHook({requests}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(null);

  function initializeLoading() {
    setIsLoading(true);
    setIsLoadingError(false);
    setData(null);
  }

  function finalizeLoading() {
    setIsLoading(false);
  }

  const loadingDependencies = requests;

  function handleLoadingError(error) {
    console.error("読み込みエラー", error);
    setIsLoadingError(true);
  }

  function render(DefaultComponent) {
    if (isLoading) 
      return <div>読み込み中です</div>;
    if (isLoadingError) 
      return <div>ネットワークエラーです</div>;
    return DefaultComponent(data);
  }

  return { 
    initializeLoading, finalizeLoading, loadingDependencies, 
    db, setData, handleLoadingError, 
    render 
  };
}
