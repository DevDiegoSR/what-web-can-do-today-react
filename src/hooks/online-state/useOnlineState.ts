import { useState } from "react";

import { TOnlineState } from "./@types";

export const useOnlineState = () => {
  const [onlineState, setOnlineState] = useState<TOnlineState | null>(null);

  const onChange = () => {
    const state = navigator.onLine ? "online" : "offline";

    setOnlineState({
      state,
      timestamp: Date.now(),
    });
  };

  const getOnlineState = () => {
    window.addEventListener("online", onChange);
    window.addEventListener("offline", onChange);

    onChange();
  };

  const cleanUpOnlineState = () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);

    setOnlineState(null);
  };

  return {
    onlineState,
    getOnlineState,
    cleanUpOnlineState,
  };
};
