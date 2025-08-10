import { useState } from "react";

export default function useCanSubmit(judgeCanSubmit) {
  const [canSubmit, setCanSubmit] = useState(false);
  function updateCanSubmit() {
    setCanSubmit(judgeCanSubmit());
  }
  return {canSubmit, updateCanSubmit};
}