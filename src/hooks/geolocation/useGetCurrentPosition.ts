import { useState } from "react";

import { TPositionOptions, TPosition, TPositionError } from "./@types/index";

const defaultPositionOptions: TPositionOptions = {
  maximumAge: 0,
  timeout: Infinity,
  enableHighAccuracy: false,
};

export const useGetCurrentPosition = (
  positionOptions = defaultPositionOptions
) => {
  const [position, setPosition] = useState<TPosition | null>(null);
  const [error, setError] = useState<TPositionError | null>(null);

  const options: TPositionOptions = {
    ...defaultPositionOptions,
    ...positionOptions,
  };

  const onChange = ({ coords, timestamp }: TPosition) => {
    setPosition({
      coords,
      timestamp,
    });
  };

  const onError = (error: TPositionError) => {
    setError({ code: error.code, message: error.message });
  };

  const getCurrentPosition = () => {
    if (!navigator || !navigator.geolocation) {
      setError({ code: 9999, message: "Geolocation is not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, options);
  };

  const clearCurrentPosition = () => {
    setPosition(null);
    setError(null);
  };

  return { position, error, getCurrentPosition, clearCurrentPosition };
};
