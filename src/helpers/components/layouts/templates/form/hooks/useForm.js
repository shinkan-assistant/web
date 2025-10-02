'use client';

import { useState } from "react";

export default function useForm(inputInfos) {
  const defaultValues = {};
  for (let inputName of Object.keys(inputInfos)) {
    defaultValues[inputName] = inputInfos[inputName].initialValue;
  }

  const [inputValues, setInputValues] = useState(defaultValues);

  function register(name) {
    if (!Object.keys(inputValues).includes(name))
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

  function reset(updatedInputValues) {
    if (!updatedInputValues) {
      setInputValues(defaultValues);
    } else {
      const updatedInputNames = Object.keys(inputInfos);
      const inputValuesTmp = {...inputValues};
      for (let inputName of Object.keys(inputInfos)) {
        if (updatedInputNames.includes(inputName))
          inputValuesTmp[inputName] = updatedInputValues[inputName];
      }
      setInputValues(inputValuesTmp);
    }
  }

  const [error, setError] = useState(null);

  return {
    inputValues, 
    defaultValues,
    register,
    reset,
    error, 
    setError,
  };
}
