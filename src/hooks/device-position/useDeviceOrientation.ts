import { useState } from "react";

import { TDeviceOrientation, TDeviceOrientationError } from "./@types/index";
import { DetectDevice } from "@/utils/detect-device/DetectDevice";

export const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<TDeviceOrientation | null>(null);
  const [error, setError] = useState<TDeviceOrientationError | null>(null);

  const [isIos] = useState(() => {
    const detectDevice = new DetectDevice();
    return detectDevice.isIos();
  });

  const onChange = (event: DeviceOrientationEvent) => {
    setDeviceOrientation({
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      timestamp: event.timeStamp,
      // @ts-ignore
      webkitCompassHeading: event.webkitCompassHeading,
      // @ts-ignore
      compass: event.webkitCompassHeading ?? event.alpha,
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

    // @ts-ignore
    if (isIos && typeof DeviceMotionEvent.requestPermission === "function") {
      // @ts-ignore
      DeviceOrientationEvent.requestPermission() // requestPermission does not exist on DeviceOrientationEvent
        .then((response: any) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", onChange, true);
          } else {
            setError({
              code: 1,
              message: "User denied orientation permission",
            });
          }
        })
        .catch(() => {
          setError({
            code: 9999,
            message: "Device orientation API not supported",
          });
        });
    } else {
      window.addEventListener("deviceorientationabsolute", onChange, true);
      // window.addEventListener("deviceorientation", onChange, false);
    }
  };

  const cleanUpDeviceOrientation = () => {
    window.removeEventListener("deviceorientationabsolute", onChange, true);
    // window.removeEventListener("deviceorientation", onChange, false);
    setDeviceOrientation(null);
    setError(null);
  };

  return {
    deviceOrientation,
    error,
    getDeviceOrientation,
    cleanUpDeviceOrientation,
    isIos,
  };
};
