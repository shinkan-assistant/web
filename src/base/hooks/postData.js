'use client';

import { useEffect, useState } from "react";

export default function usePostData(mainFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function postData(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    await mainFn(e, {setErrors})

    setIsLoading(false);
  };

  return { postData, isLoading, errors }
}
