'use client';

import FormButton from "@/base/form/components/atoms/Button";
import { useEffect, useState } from "react";

export function AllCancelButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isAllCancel =formHook.inputNames
      .every(inputName => !formHook.inputValues[inputName]);
    setDisabled(isAllCancel);
  }, [formHook.inputValues])

  function changeAllCancel() { 
    const updatedInputValues = formHook.inputNames
      .reduce((acc, inputName) => {
        return {
          [inputName]: false,
          ...acc,
        }
      }, {});
    setDisabled(true);
    formHook.changeInputs(updatedInputValues);
  }

  return (
    <FormButton title="全キャンセル" onClick={changeAllCancel} disabled={disabled} />
  );
}