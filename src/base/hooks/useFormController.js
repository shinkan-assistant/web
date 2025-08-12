'use client';

import { useRef, useState } from "react";

export default function useFormController({
  inputInfos, judgeCanSubmit, handleSubmit
}) {
  const inputInfosTmp = Object.keys(inputInfos).reduce((acc, inputName) => {
    return {
      [inputName]: {
        ...inputInfos[inputName],
        ref: useRef(null),
      },
      ...acc};
  }, {});

  const [inputValues, setInputValues] = useState(
    Object.keys(inputInfos).reduce((acc, inputName) => {
      return {
        [inputName]: inputInfos[inputName].initialValue,
        ...acc
      }
    }, {})
  );
  
  function onChangeInput(inputName, {value}) {
    setInputValues({
      ...inputValues,
      [inputName]: value,
    });
  }

  function getCanSubmit() {
    return judgeCanSubmit(inputValues);
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      await handleSubmit(inputValues)
    }
    catch (error) {
      // TODO エラーを格納
      setError(error);
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  const formController = {
    inputInfos: inputInfosTmp, 
    onChangeInput, 
    inputValues, 
    getCanSubmit, 
    onSubmit, 
    isProcessing, 
    error,
  }
  return formController;
}
