import { useContext, useEffect, useRef, useState } from "react";

import OlMap from "ol/Map";

import { ArrowUp, ArrowUpAZ, Locate, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

import { MapContext } from "../../map-context";

import { useWatchPosition } from "@/hooks/geolocation/useWatchPosition";
import { useDeviceOrientation } from "@/hooks/device-position/useDeviceOrientation";
import { GeolocationMarker } from "./utils/GeolocationMarker";

import { useRotation } from "./hooks/useRotation";

export type ROlGeolocationProps = {
  className?: string;
};

export function ROlGeolocation({ className, ...props }: ROlGeolocationProps) {
  const map = useContext(MapContext);

  const compassRef = useRef<SVGSVGElement | null>(null);

  const { currentRotation, handleRotation } = useRotation({
    rotation: 0,
    map: map as OlMap,
  });

  const [isChecked, setIsChecked] = useState(false);

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
      geolocationMarker?.setGeolocationMarkerRotation(0, 0);
    };
  }, [watcher]);

  useEffect(() => {
    if (deviceOrientation?.azimuth) {
      geolocationMarker?.setGeolocationMarkerRotation(
        deviceOrientation.azimuth,
        currentRotation ?? 0
      );
    }
  }, [deviceOrientation?.azimuth, currentRotation]);

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

  useEffect(() => {
    if (compassRef.current && deviceOrientation?.absoluteCompass) {
      compassRef.current.style.transform = `rotate(${deviceOrientation.absoluteCompass}deg)`;
    }
    return () => {
      if (compassRef.current) {
        compassRef.current.style.transform = `rotate(0deg)`;
      }
    };
  }, [deviceOrientation?.absoluteCompass]);

  useEffect(() => {
    if (isChecked && deviceOrientation?.azimuth) {
      const rotationInRad =
        ((360 - deviceOrientation?.azimuth) * Math.PI) / 180.0;

      // map?.getView().animate({
      //   rotation: rotationInRad,
      // });

      map?.getView().setRotation(rotationInRad);

      // map?.changed();
    }
  }, [deviceOrientation?.azimuth, isChecked]);

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
    <div
      className={twMerge(
        "flex gap-4 absolute inset-auto z-10 w-min h-min",
        className
      )}
      {...props}
    >
      <Button
        title="zoom to extent"
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => {}}
        disabled
      >
        <ArrowUp ref={compassRef} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{"zoom to extent"}</span>
      </Button>
      <Button
        title="zoom to extent"
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full transform origin-center"
        style={{ rotate: `${currentRotation}rad` }}
        onClick={handleRotation}
      >
        <ArrowUpAZ className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{"zoom to extent"}</span>
      </Button>
      <Button
        title="zoom to extent"
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={handleWatchPosition}
      >
        <Locate className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{"zoom to extent"}</span>
      </Button>
      <Button
        title="zoom to extent"
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setIsChecked(!isChecked)}
      >
        <Map className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{"zoom to extent"}</span>
      </Button>
    </div>
  );
}
