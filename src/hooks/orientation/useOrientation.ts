import { useLayoutEffect, useState } from "react";

export function useOrientation() {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: "landscape-primary",
  });

  const onChange = () => {
    const { angle, type } = window.screen.orientation;
    setOrientation({
      angle,
      type,
    });
  };

  const onError = () => {
    setOrientation({
      type: "UNKNOWN",
      angle: 999,
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
