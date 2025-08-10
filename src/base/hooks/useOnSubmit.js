'use client';

import { useState } from "react";

export default function useOnSubmitForPost({postData}) {
  const [isProcessing, setIsProcessing] = useState(false);
  let errors = [];

  async function onSubmit(e) {
    e.preventDefault();

    setIsProcessing(true);
    errors = [];

    try {
      await postData(e)
    }
    catch (error) {
      // TODO エラーを格納
      errors = ["何らかのエラー"];
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  return { onSubmit, isProcessing, errors }
}
