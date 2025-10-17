'use client';

import { useState } from "react";
import judgeNullish from "../utils/nullish";


class LoadedState {
  constructor(data) {
    this.set(data);
  }

  static ready(data) {
    return new LoadedState(data, false);
  }

  // 便利メソッド
  get () {
    return this.isNull ? null : this.data;
  }
  set (data) {
    this.isNull = judgeNullish(data);
    if (!this.isNull) {
      this.data = data;
    }
  }
}

export default function useLoadedState(initialData) {
  // const [loadedResult, setLoadedState] = useState(LoadedState.ready(initialData));
  const [loadedResult, setLoadedState] = useState(null);
  const handleSetLoadedState = (data) => {
    setLoadedState(LoadedState.ready(data));
  }
  return [loadedResult, handleSetLoadedState];
} 
