import { useLayoutEffect, useState } from "react";

export function useOrientation() {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: "landscape-primary",
    correctionAngle: 0,
  });

  const onChange = () => {
    const { angle, type } = window.screen.orientation;

    const correctionAngle = {
      "portrait-primary-0": 0, // android
      "portrait-primary-90": 0,
      "landscape-primary-90": 270, // android
      "landscape-primary-0": 90,
      "portrait-secondary-180": 180, // android
      "portrait-secondary-270": 180,
      "landscape-secondary-270": 90, // android
      "landscape-secondary-180": 270,
    };

    setOrientation({
      angle,
      type,
      correctionAngle:
        correctionAngle[`${type}-${angle}` as keyof typeof correctionAngle],
    });
  };

  const onError = () => {
    setOrientation({
      type: "UNKNOWN",
      angle: 999,
      correctionAngle: 999,
    });
  };

  useLayoutEffect(() => {
    if (window.screen?.orientation) {
      onChange();
      window.screen.orientation.addEventListener("change", onChange);
    } else {
      onError();
      window.addEventListener("orientationchange", onError);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", onChange);
      } else {
        window.removeEventListener("orientationchange", onError);
      }
    };
  }, []);

  return { orientation };
}
