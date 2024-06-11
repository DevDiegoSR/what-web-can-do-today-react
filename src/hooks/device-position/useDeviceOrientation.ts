import { useState } from "react";

import { TDeviceOrientation, TDeviceOrientationError } from "./@types/index";
import { DetectDevice } from "@/utils/detect-device/DetectDevice";

const getCorrectionAngle = (type: string, angle: number) => {
  const correctionAngle = {
    // android
    "portrait-primary-0": 0,
    "landscape-primary-90": 270,
    "portrait-secondary-180": 180,
    "landscape-secondary-270": 90,
    // ios
    "portrait-primary-90": 0,
    "landscape-primary-0": 90,
    "portrait-secondary-270": 180,
    "landscape-secondary-180": 270,
  };

  return correctionAngle[`${type}-${angle}` as keyof typeof correctionAngle];
};

export const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<TDeviceOrientation | null>(null);
  const [error, setError] = useState<TDeviceOrientationError | null>(null);

  const [isIos] = useState(() => {
    const detectDevice = new DetectDevice();
    return detectDevice.isIos();
  });

  const onChange = (event: DeviceOrientationEvent) => {
    // @ts-ignore
    // const compass = event.webkitCompassHeading ?? event.alpha; // webkitCompassHeading = clockwise
    const compass = event.alpha as number;

    const { angle, type } = window.screen.orientation;
    const correctionAngle = getCorrectionAngle(type, angle);

    const absoluteCompass = compass + correctionAngle;

    setDeviceOrientation({
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      timestamp: event.timeStamp,
      angle,
      type,
      correctionAngle,
      // @ts-ignore
      webkitCompassHeading: event.webkitCompassHeading,
      compass,
      absoluteCompass:
        absoluteCompass > 360 ? absoluteCompass - 360 : absoluteCompass,
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
    }
  };

  const cleanUpDeviceOrientation = () => {
    if (isIos) {
      window.removeEventListener("deviceorientation", onChange, true);
    } else {
      window.removeEventListener("deviceorientationabsolute", onChange, true);
    }
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
