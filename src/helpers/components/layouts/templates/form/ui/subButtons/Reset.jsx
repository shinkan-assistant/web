'use client';

import { useEffect, useState } from "react";
import FormButton from "./Base";

export function ResetButton({formMethods}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isInitialValues = Object.keys(formMethods.inputValues).every(
      name => formMethods.inputValues[name] === formMethods.defaultValues[name]);
    setDisabled(isInitialValues);
  }, Object.values(formMethods.inputValues))

  function reset() { 
    setDisabled(true);
    formMethods.reset();
  }

  return (
    <FormButton title="リセット" onClick={reset} disabled={disabled} />
  );
}