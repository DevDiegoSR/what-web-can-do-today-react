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
import { useOrientation } from "@/hooks/orientation/useOrientation";

function DeviceOrientation() {
  const {
    deviceOrientation,
    error,
    getDeviceOrientation,
    cleanUpDeviceOrientation,
    isIos,
  } = useDeviceOrientation();

  const { orientation } = useOrientation();

  const compassRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    getDeviceOrientation();
    return () => cleanUpDeviceOrientation();
  }, []);

  useEffect(() => {
    if (compassRef.current && deviceOrientation?.compass) {
      const orientationCorrection = {
        "portrait-primary-0": 0, // android
        "portrait-primary-90": 0,
        "landscape-primary-90": 270, // android
        "landscape-primary-0": 90,
        "portrait-secondary-180": 180, // android
        "portrait-secondary-270": 180,
        "landscape-secondary-270": 90, // android
        "landscape-secondary-180": 270,
      };

      compassRef.current.style.transform = `rotate(${
        deviceOrientation.compass +
        orientationCorrection[
          `${orientation.type}-${orientation.angle}` as keyof typeof orientationCorrection
        ]
      }deg)`;
    }
    return () => {
      if (compassRef.current) {
        compassRef.current.style.transform = `rotate(0deg)`;
      }
    };
  }, [deviceOrientation?.compass, orientation.type, orientation.angle]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Device Orientation 123</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 mb-6">
            <li>absolute: {deviceOrientation?.absolute}</li>
            <li>alpha: {deviceOrientation?.alpha}</li>
            <li>beta: {deviceOrientation?.beta}</li>
            <li>gamma: {deviceOrientation?.gamma}</li>
            <li>timestamp: {deviceOrientation?.timestamp}</li>
            <li>isIos: {String(isIos)}</li>
            <li>
              webkitCompassHeading: {deviceOrientation?.webkitCompassHeading}
            </li>
            <li>compass: {deviceOrientation?.compass}</li>
            <li>error: {error?.message}</li>
            <li>orientation (angle): {orientation?.angle}</li>
            <li>orientation (type): {orientation?.type}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>compass</CardTitle>
          <CardDescription>
            Returns device's current heading (direction) in degrees, counted
            counterclockwise from the North (0) through West (90), South (180)
            and East (270).
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
