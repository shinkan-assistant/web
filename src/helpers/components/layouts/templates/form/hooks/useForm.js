'use client';

import { useState } from "react";

export default function useForm({defaultValues}) {
  const [inputValues, setInputValues] = useState(defaultValues);

  function register(name) {
    if (!Object.keys(inputValues).includes(name))
      return null;
    return {
      id: name,
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
      const updatedInputNames = Object.keys(inputValues);
      const inputValuesTmp = {...inputValues};
      for (let name of Object.keys(inputValues)) {
        if (updatedInputNames.includes(name))
          inputValuesTmp[name] = updatedInputValues[name];
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
