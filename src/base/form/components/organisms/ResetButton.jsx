'use client';

import { useEffect, useState } from "react";
import FormButton from "../atoms/Button";

export function ResetButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { inputNames, inputInfos, inputValues } = formHook;
    const isInitialValues = inputNames
      .every(name => inputValues[name] === inputInfos[name].initialValue);
    setDisabled(isInitialValues);
  }, Object.values(formHook.inputValues))

  function reset() { 
    const { inputNames, inputInfos } = formHook;
    formHook.changeInputs(
      inputNames.reduce((acc, name) => {
        return {
          [name]: inputInfos[name].initialValue,
          ...acc,
        }
      }, {})
    );
    setDisabled(true);
  }

  return (
    <FormButton title="リセット" onClick={reset} disabled={disabled} />
  );
}