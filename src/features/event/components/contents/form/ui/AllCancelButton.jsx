'use client';

import FormButton from "@/helpers/components/layouts/contents/form/ui/subButtons/Base";
import { useEffect, useState } from "react";

export function AllCancelButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isAllCancel = formHook.inputNames.every(
      name => !formHook.inputValues[name]);
    setDisabled(isAllCancel);
  }, [formHook.inputValues])

  function onClick() { 
    setDisabled(true);

    const updatedInputValues = {};
    for (let name of formHook.inputNames) {
      updatedInputValues[name] = false;
    }
    formHook.changeInputValues(updatedInputValues);
  }

  return (
    <FormButton title="全キャンセル" onClick={onClick} disabled={disabled} />
  );
}