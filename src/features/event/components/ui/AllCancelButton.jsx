'use client';

import FormButton from "@/base/features/form/components/ui/subButtons/Base";
import { useEffect, useState } from "react";

export function AllCancelButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isAllCancel =formHook.inputNames
      .every(inputName => !formHook.inputValues[inputName]);
    setDisabled(isAllCancel);
  }, [formHook.inputValues])

  function onClick() { 
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
    <FormButton title="全キャンセル" onClick={onClick} disabled={disabled} />
  );
}