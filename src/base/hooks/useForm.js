'use client';

import { useRef, useState } from "react";

export default function useFormHook({
  inputInfos, judgeCanSubmit, handleSubmit, Buttons
}) {
  const inputNames = Object.keys(inputInfos);
  const inputInfosTmp = inputNames.reduce((acc, inputName) => {
    return {
      [inputName]: {
        ...inputInfos[inputName],
        ref: useRef(null),
      },
      ...acc};
  }, {});

  const initialInputValues = inputNames.reduce((acc, inputName) => {
    return {
      [inputName]: inputInfos[inputName].initialValue,
      ...acc,
    }
  }, {});
  const [inputValues, setInputValues] = useState(initialInputValues);
  
  function onChangeInput(inputName, {value}) {
    setInputValues({
      ...inputValues,
      [inputName]: value,
    });
  }
  function changeInputs(updatedInputValues) {
    const updatedInputNames = Object.keys(updatedInputValues);
    setInputValues(
      Object.keys(inputValues).reduce((acc, inputName) => {
        acc[inputName] = updatedInputNames.includes(inputName)
          ? updatedInputValues[inputName]
          : inputValues[inputName];
        return acc;
      }, {})
    );
  }

  function getCanSubmit() {
    return judgeCanSubmit({inputValues});
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      await handleSubmit({inputValues})
    }
    catch (error) {
      // TODO エラーを格納
      setError(error);
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  const formHook = {
    inputNames,
    inputInfos: inputInfosTmp, 
    Buttons,
    onChangeInput, 
    changeInputs,
    inputValues, 
    getCanSubmit, 
    onSubmit, 
    isProcessing, 
    error,
  }
  return formHook;
}
