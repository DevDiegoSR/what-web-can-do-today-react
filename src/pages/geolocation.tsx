import { useContext, useEffect, useRef, useState } from "react";

import OlMap from "ol/Map";

import { Map } from "@/components/rol/map";
import { OpenStreetMap } from "@/components/rol/sources";
import { TileLayer } from "@/components/rol/tile-layer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useGetCurrentPosition } from "@/hooks/geolocation/useGetCurrentPosition";
import { useWatchPosition } from "@/hooks/geolocation/useWatchPosition";
import { MapContext } from "@/components/rol/map-context";
import { GeolocationMarker } from "@/components/rol/controls/geolocation/utils/GeolocationMarker";
import { useRotation } from "@/components/rol/controls/geolocation/hooks/useRotation";

function GetCurrentPosition() {
  const { position, error, getCurrentPosition, clearCurrentPosition } =
    useGetCurrentPosition();
  const { watcher } = useWatchPosition();

  const hasCoords = position?.coords ? true : false;
  const buttonText = hasCoords
    ? "Clear Current Position"
    : "Get Current Position";
  const buttonOnClick = hasCoords ? clearCurrentPosition : getCurrentPosition;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Position</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={buttonOnClick} disabled={watcher !== undefined}>
          {buttonText}
        </Button>
        <ul className="grid gap-4 mt-4">
          <li>latitude: {position?.coords.latitude}</li>
          <li>longitude: {position?.coords.longitude}</li>
          <li>altitude: {position?.coords.altitude}</li>
          <li>accuracy: {position?.coords.accuracy}</li>
          <li>altitudeAccuracy: {position?.coords.altitudeAccuracy}</li>
          <li>speed: {position?.coords.speed}</li>
          <li>heading: {position?.coords.heading}</li>
          <li>timestamp: {position?.timestamp}</li>
          <li>error code: {error?.code}</li>
          <li>error message: {error?.message}</li>
        </ul>
      </CardContent>
    </Card>
  );
}

function WatchPosition() {
  const map = useContext(MapContext);

  const [geolocationMarker, setGeolocationMarker] =
    useState<GeolocationMarker>();
  const isMarkerFirstRenderRef = useRef(true);
  const isFirstRenderRef = useRef(true);

  const { currentRotation } = useRotation({
    rotation: 0,
    map: map as OlMap,
  });

  const { position, error, watcher, startWatchPosition, stopWatchPosition } =
    useWatchPosition();

  const hasWatcher = watcher === undefined ? true : false;
  const buttonText = hasWatcher
    ? "Start Watch Position"
    : "Stop Watch Position";
  const buttonOnClick = hasWatcher ? startWatchPosition : stopWatchPosition;

  useEffect(() => {
    if (!map) return;
    setGeolocationMarker(new GeolocationMarker(map));
  }, [map]);

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
      geolocationMarker?.setGeolocationMarkerRotation(
        position.coords.heading ?? 0,
        currentRotation
      );
      return;
    }

    isFirstRenderRef.current = false;
    isMarkerFirstRenderRef.current = true;

    return () => {
      geolocationMarker?.setGeolocationMarkerRotation(0, 0);
    };
  }, [position?.coords]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch Position</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={buttonOnClick}>{buttonText}</Button>
        <ul className="grid gap-4 mt-4">
          <li>latitude: {position?.coords.latitude}</li>
          <li>longitude: {position?.coords.longitude}</li>
          <li>altitude: {position?.coords.altitude}</li>
          <li>accuracy: {position?.coords.accuracy}</li>
          <li>altitudeAccuracy: {position?.coords.altitudeAccuracy}</li>
          <li>speed: {position?.coords.speed}</li>
          <li>heading: {position?.coords.heading}</li>
          <li>timestamp: {position?.timestamp}</li>
          <li>error code: {error?.code}</li>
          <li>error message: {error?.message}</li>
          <li>watcher: {watcher}</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export function Geolocation() {
  return (
    <section className="flex-1 p-6 grid grid-cols-1 auto-rows-min gap-4">
      <GetCurrentPosition />
      <main className="h-screen w-full flex">
        <Map
          id="map-1"
          className="flex-1"
          zoom={12}
          center={[-45.967823, -23.300423]}
        >
          <WatchPosition />
          <TileLayer source={OpenStreetMap} zIndex={0} />
        </Map>
      </main>
    </section>
  );
}
