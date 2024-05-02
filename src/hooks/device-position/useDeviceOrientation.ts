import { useState } from "react";

import { TDeviceOrientation, TDeviceOrientationError } from "./@types/index";

export const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<TDeviceOrientation | null>(null);
  const [error, setError] = useState<TDeviceOrientationError | null>(null);

  const onChange = (event: DeviceOrientationEvent) => {
    console.log(event);
    setDeviceOrientation({
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      timestamp: event.timeStamp,
    });
  };

  const getDeviceOrientation = () => {
    if (!("DeviceOrientationEvent" in window)) {
      setError({
        code: 9999,
        message: "Device orientation API not supported",
      });
      return;
    }

    window.addEventListener("deviceorientationabsolute", onChange, true);
  };

  const cleanUpDeviceOrientation = () => {
    window.removeEventListener("deviceorientationabsolute", onChange, true);
    setDeviceOrientation(null);
    setError(null);
  };

  return {
    deviceOrientation,
    error,
    getDeviceOrientation,
    cleanUpDeviceOrientation,
  };
};
