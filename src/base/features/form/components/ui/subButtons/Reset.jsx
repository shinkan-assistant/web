'use client';

import { useEffect, useState } from "react";
import FormButton from "./Base";

export function ResetButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isInitialValues = formHook.inputNames.every(
      name => formHook.inputValues[name] === formHook.initialValues[name]);
    setDisabled(isInitialValues);
  }, Object.values(formHook.inputValues))

  function reset() { 
    setDisabled(true);

    const updatedInputValues = {};
    for (let name of formHook.inputNames) {
      updatedInputValues[name] = formHook.initialValues[name];
    }
    formHook.changeInputValues(updatedInputValues);
  }

  return (
    <FormButton title="リセット" onClick={reset} disabled={disabled} />
  );
}