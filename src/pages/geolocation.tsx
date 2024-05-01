import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useGetCurrentPosition } from "@/hooks/geolocation/useGetCurrentPosition";
import { useWatchPosition } from "@/hooks/geolocation/useWatchPosition";

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
  const { position, error, watcher, startWatchPosition, stopWatchPosition } =
    useWatchPosition();

  const hasWatcher = watcher === undefined ? true : false;
  const buttonText = hasWatcher
    ? "Start Watch Position"
    : "Stop Watch Position";
  const buttonOnClick = hasWatcher ? startWatchPosition : stopWatchPosition;

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
      <WatchPosition />
    </section>
  );
}
