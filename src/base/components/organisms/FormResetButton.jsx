'use client';

import { useEffect, useState } from "react";
import FormButton from "../atoms/FormButton";

export function ResetButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { inputNames, inputInfos, inputValues } = formHook;
    const isInitialValues = inputNames
      .every(name => inputValues[name] === inputInfos[name].initialValue);
    setDisabled(isInitialValues);
  }, [formHook.inputValues])

  function reset() { 
    const { inputNames, inputInfos } = formHook;
    const resetInputValues = inputNames.reduce((acc, name) => {
      return {
        [name]: inputInfos[name].initialValue,
        ...acc,
      }
    }, {});
    setDisabled(true);
    formHook.changeInputs(resetInputValues);
  }

  return (
    <FormButton title="リセット" onClick={reset} disabled={disabled} />
  );
}