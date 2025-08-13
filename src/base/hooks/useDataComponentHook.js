import { useState } from "react"

export default function useDataComponentHook({isNotForPage, requests, notHaveToLoadRequestNames}) {
  isNotForPage = isNotForPage ?? false;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function initLoading() {
    setIsLoading(true);
    setData(null);
  }

  function finLoading({data}) {
    setData(data);
    setIsLoading(false);
  }

  const requestValues = Object.values(requests);
  notHaveToLoadRequestNames = notHaveToLoadRequestNames ?? [];

  function judgeLoadedRequests() {
    return Object.keys(requests)
      .filter(name => !notHaveToLoadRequestNames.includes(name))
      .every(name => ![null, undefined].some(v => requests[name] === v))
  }

  function render(DefaultComponent) {
    if (isLoading) {
      if (isNotForPage) return <></>;
      else return <div>読み込み中です</div>;
    } 
    return DefaultComponent(data);
  }

  return { 
    initLoading, finLoading, 
    requestValues, judgeLoadedRequests,
    render 
  };
}
