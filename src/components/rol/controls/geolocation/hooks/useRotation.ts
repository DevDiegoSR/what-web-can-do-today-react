import { useEffect, useState } from "react";

import OlMap from 'ol/Map'

export type TRotationOptions = {
  map: OlMap
  rotation: number;
};

export function useRotation({ map, rotation }: TRotationOptions) {
  const [currentRotation, setCurrentRotation] = useState<number>();

  useEffect(() => {
    if (!map) return;

    map.getView().addChangeListener("rotation", onRotationChange);

    return () => {
      if (!map) return;

      map.getView().removeChangeListener("rotation", onRotationChange);
    };
  }, [map]);

  function onRotationChange() {
    const rotation = map?.getView().getRotation();

    setCurrentRotation(rotation);
  }

  function handleRotation() {
    if (!map) return;

    map.getView().animate({
      rotation: rotation * Math.PI / 180.0,
    });
  }

  return { currentRotation, handleRotation };
}
