import { useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDeviceOrientation } from "@/hooks/device-position/useDeviceOrientation";

import compass from "../assets/compass.svg";

function DeviceOrientation() {
  const {
    deviceOrientation,
    error,
    getDeviceOrientation,
    cleanUpDeviceOrientation,
    isIos,
  } = useDeviceOrientation();

  const compassRef = useRef<HTMLImageElement | null>(null);
  const azimuthRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    getDeviceOrientation();
    return () => cleanUpDeviceOrientation();
  }, []);

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
    if (azimuthRef.current && deviceOrientation?.azimuth) {
      azimuthRef.current.style.transform = `rotate(${deviceOrientation.azimuth}deg)`;
    }
    return () => {
      if (azimuthRef.current) {
        azimuthRef.current.style.transform = `rotate(0deg)`;
      }
    };
  }, [deviceOrientation?.azimuth]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Device Orientation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 mb-6">
            <li>isIos: {String(isIos)}</li>
            <li>absolute: {deviceOrientation?.absolute}</li>
            <li>alpha: {deviceOrientation?.alpha}</li>
            <li>beta: {deviceOrientation?.beta}</li>
            <li>gamma: {deviceOrientation?.gamma}</li>
            <li>timestamp: {deviceOrientation?.timestamp}</li>
            <li>error: {error?.message}</li>
            <li>angle: {deviceOrientation?.angle}</li>
            <li>type: {deviceOrientation?.type}</li>
            <li>correctionAngle: {deviceOrientation?.correctionAngle}</li>
            <li>
              webkitCompassHeading: {deviceOrientation?.webkitCompassHeading}
            </li>
            <li>
              webkitCompassHeadingCounterclockwise:{" "}
              {deviceOrientation?.webkitCompassHeadingCounterclockwise}
            </li>
            <li>compass: {deviceOrientation?.compass}</li>
            <li>absoluteCompass: {deviceOrientation?.absoluteCompass}</li>
            <li>azimuth: {deviceOrientation?.azimuth}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compass (Always Pointing North)</CardTitle>
          <CardDescription>
            <p>
              Returns device's current heading (direction) in degrees, counted
              counterclockwise from the North (0) through West (90), South (180)
              and East (270).
            </p>
            <p>Android = alpha | IOS = webkitCompassHeadingCounterclockwise</p>
            <p>
              *webkitCompassHeadingCounterclockwise = (360 -
              event.webkitCompassHeading) % 360
            </p>
            <p>*absoluteCompass = compass + correctionAngle</p>
            <p>*correctionAngle = device orientation angle</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 grid place-items-center">
            <img
              ref={compassRef}
              className="h-72 w-72"
              src={compass}
              alt="compass-needle"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Azimuth</CardTitle>
          <CardDescription>
            <p>
              The horizontal angle of an object from a reference point,
              typically north or south.
            </p>
            <p>360 - absoluteCompass</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 grid place-items-center">
            <img
              ref={azimuthRef}
              className="h-72 w-72 -hue-rotate-90"
              src={compass}
              alt="compass-needle"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function DevicePosition() {
  return (
    <section className="flex-1 p-6 grid grid-cols-1 auto-rows-min gap-4">
      <DeviceOrientation />
    </section>
  );
}
