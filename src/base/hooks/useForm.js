'use client';

import { useEffect, useRef, useState } from "react";

export default function useForm({
  inputInfos, convertToFormData, judgeCanSubmit, handleSubmit, Buttons
}) {
  const inputNames = Object.keys(inputInfos);
  inputInfos = inputNames.reduce((acc, inputName) => {
    return {
      [inputName]: {
        ...inputInfos[inputName],
        ref: useRef(null),
      },
      ...acc};
  }, {});

  const [inputValues, setInputValues] = inputNames.reduce((acc, inputName) => {
    const [states, setStates] = acc;
    const [state, setState] = useState(inputInfos[inputName].initialValue)
    return [
      { [inputName]: state, ...states },
      { [inputName]: setState, ...setStates }
    ];
  }, [{}, {}]);

  function onChangeInput(name, {value}) {
    setInputValues[name](value);
  }

  function changeInputs(updatedInputValues) {
    const updatedInputNames = Object.keys(updatedInputValues);
    for (let inputName of Object.keys(setInputValues)) {
      if (updatedInputNames.includes(inputName))
        setInputValues[inputName](updatedInputValues[inputName]);
    }
  }

  console.log(inputValues);
  const [formData, setFormData] = useState(convertToFormData(inputValues));
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setFormData(convertToFormData(inputValues));
    setCanSubmit(judgeCanSubmit(formData));
  }, Object.values(inputValues))

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      await handleSubmit({formData})
    }
    catch (error) {
      // TODO エラーを格納
      setError(error);
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  return {
    inputNames,
    inputInfos, 
    Buttons,
    inputValues, 
    canSubmit,
    isProcessing, 
    error,
    onChangeInput, 
    changeInputs,
    onSubmit, 
  };
}
