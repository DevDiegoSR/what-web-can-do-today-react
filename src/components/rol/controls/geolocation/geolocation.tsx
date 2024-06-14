import { useContext, useEffect, useRef, useState } from "react";

import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

import { MapContext } from "../../map-context";

import { useWatchPosition } from "@/hooks/geolocation/useWatchPosition";
import { useDeviceOrientation } from "@/hooks/device-position/useDeviceOrientation";
import { GeolocationMarker } from "./utils/GeolocationMarker";

export type ROlGeolocationProps = {
  className?: string;
};

export function ROlGeolocation({ className, ...props }: ROlGeolocationProps) {
  const map = useContext(MapContext);

  const [geolocationMarker, setGeolocationMarker] =
    useState<GeolocationMarker>();
  const isMarkerFirstRenderRef = useRef(true);
  const isFirstRenderRef = useRef(true);

  // @ts-ignore
  const { position, error, watcher, startWatchPosition, stopWatchPosition } =
    useWatchPosition();
  const { deviceOrientation, getDeviceOrientation, cleanUpDeviceOrientation } =
    useDeviceOrientation();

  useEffect(() => {
    if (!map) return;
    setGeolocationMarker(new GeolocationMarker(map));
  }, [map]);

  useEffect(() => {
    if (watcher !== undefined) {
      getDeviceOrientation();
    }
    return () => {
      cleanUpDeviceOrientation();
      geolocationMarker?.setGeolocationMarkerRotation(0);
    };
  }, [watcher]);

  useEffect(() => {
    if (deviceOrientation?.absoluteCompass) {
      geolocationMarker?.setGeolocationMarkerRotation(
        360 - deviceOrientation.absoluteCompass
      );
    }
  }, [deviceOrientation?.absoluteCompass]);

  useEffect(() => {
    if (position?.coords) {
      if (isMarkerFirstRenderRef.current && !isFirstRenderRef.current) {
        // first render add marker
        isMarkerFirstRenderRef.current = false;
        geolocationMarker?.addGeolocationMarker(position.coords);
        return;
      }

      // other renders (update location) update marker
      geolocationMarker?.updateGeolocationMarker(position.coords, false);
      return;
    }

    isFirstRenderRef.current = false;
    isMarkerFirstRenderRef.current = true;
  }, [position?.coords]);

  const isWatchPositionActive = watcher !== undefined;

  function handleWatchPosition() {
    if (isWatchPositionActive) {
      geolocationMarker?.removeGeolocationMarker();
      stopWatchPosition();
      return;
    }

    startWatchPosition();
  }

  return (
    <Button
      {...props}
      title="zoom to extent"
      type="button"
      variant="outline"
      size="icon"
      className={twMerge("absolute inset-auto z-10", className)}
      onClick={handleWatchPosition}
    >
      <Compass className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">{"zoom to extent"}</span>
    </Button>
  );
}
