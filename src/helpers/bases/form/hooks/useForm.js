'use client';

import { useEffect, useState } from "react";

export default function useForm({
  inputInfos, generateFormData, judgeCanSubmit, handleSubmit, Buttons
}) {
  const inputNames = Object.keys(inputInfos);

  const initialValues = {};
  for (let inputName of inputNames) {
    initialValues[inputName] = inputInfos[inputName].initialValue;
  }

  const [inputValues, setInputValues] = useState(initialValues);

  function getInputProps(name) {
    if (!inputNames.includes(name))
      return null;

    return {
      id: name,
      name: name,
      label: inputInfos[name].label,
      value: inputValues[name],
      onChange: function (name, {value}) {
        const inputValuesTmp = {...inputValues};
        inputValuesTmp[name] = value;
        setInputValues(inputValuesTmp);
      }
    }
  };

  function changeInputValues(updatedInputValues) {
    const updatedInputNames = Object.keys(updatedInputValues);
    const inputValuesTmp = {...inputValues};
    for (let inputName of inputNames) {
      if (updatedInputNames.includes(inputName))
        inputValuesTmp[inputName] = updatedInputValues[inputName];
    }
    setInputValues(inputValuesTmp);
  }

  const initialFormData = generateFormData(initialValues, initialValues);
  const [formData, setFormData] = useState(initialFormData);

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const formDataTmp = generateFormData(initialValues, inputValues)
    setFormData(formDataTmp);
    setCanSubmit(judgeCanSubmit(initialFormData, formDataTmp));
  }, [inputValues])

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      await handleSubmit(formData)
    }
    catch (error) {
      // TODO エラーを格納
      setError(error);
      console.error(error);
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  return {
    inputNames,
    initialValues, 
    inputValues, 
    getInputProps,
    Buttons,
    changeInputValues,
    canSubmit,
    isProcessing, 
    error, 
    onSubmit, 
  };
}
