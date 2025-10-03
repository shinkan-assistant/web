'use client';

import { useEffect, useState } from "react";
import { useFormContext } from 'react-hook-form';

import FormUtilButton from "./Base";

export function ResetButton() {
  const { watch, getValues, formState, reset } = useFormContext();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const subscription = watch(() => {
      const currentValues = getValues();
      const isDefault = Object.keys(currentValues).every(
        key => currentValues[key] === formState.defaultValues[key]);
      setDisabled(isDefault);
    });
    return () => subscription.unsubscribe();
  }, [watch, formState.defaultValues])

  function handleReset() { 
    setDisabled(true);
    reset();
  }

  return (
    <FormUtilButton title="リセット" onClick={handleReset} disabled={disabled} />
  );
}