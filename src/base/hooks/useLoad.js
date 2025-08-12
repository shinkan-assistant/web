import { db } from "@/lib/firebase/clientApp";
import { useEffect, useState } from "react"

export default function useLoad(loadFunc) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setData(await loadFunc(db));
      setIsLoading(false);
    }
    getData();
  }, []);

  return {data, isLoading};
}
