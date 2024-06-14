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
  const userRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    getDeviceOrientation();
    return () => cleanUpDeviceOrientation();
  }, []);

  useEffect(() => {
    if (compassRef.current && userRef.current && deviceOrientation?.compass) {
      compassRef.current.style.transform = `rotate(${deviceOrientation.absoluteCompass}deg)`;
      userRef.current.style.transform = `rotate(${
        360 - (deviceOrientation.absoluteCompass as number)
      }deg)`;
    }
    return () => {
      if (compassRef.current && userRef.current) {
        compassRef.current.style.transform = `rotate(0deg)`;
        userRef.current.style.transform = `rotate(0deg)`;
      }
    };
  }, [deviceOrientation?.absoluteCompass]);

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
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>compass</CardTitle>
          <CardDescription>
            Alpha returns device's current heading (direction) in degrees,
            counted counterclockwise from the North (0) through West (90), South
            (180) and East (270).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full grid gap-12 place-items-center">
            <img
              ref={compassRef}
              className="w-1/2"
              src={compass}
              alt="compass-needle"
            />
            <img
              ref={userRef}
              className="w-1/2 grayscale"
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
