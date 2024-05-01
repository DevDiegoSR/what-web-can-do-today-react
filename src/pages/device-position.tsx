import { useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDeviceOrientation } from "@/hooks/device-position/useDeviceOrientation";

import compassNeedle from "../assets/compass-needle.svg";

function DeviceOrientation() {
  const {
    deviceOrientation,
    error,
    getDeviceOrientation,
    cleanUpDeviceOrientation,
  } = useDeviceOrientation();

  const compassNeedleRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    getDeviceOrientation();
    return () => cleanUpDeviceOrientation();
  }, []);

  useEffect(() => {
    if (compassNeedleRef.current) {
      compassNeedleRef.current.style.transform = `rotate(${deviceOrientation?.alpha}deg)`;
    }
    return () => {
      if (compassNeedleRef.current) {
        compassNeedleRef.current.style.transform = `rotate(0deg)`;
      }
    };
  }, [deviceOrientation?.alpha]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Device Orientation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 mb-6">
            <li>absolute: {deviceOrientation?.absolute}</li>
            <li>alpha: {deviceOrientation?.alpha}</li>
            <li>beta: {deviceOrientation?.beta}</li>
            <li>gamma: {deviceOrientation?.gamma}</li>
            <li>timestamp: {deviceOrientation?.timestamp}</li>
            <li>error: {error?.message}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>alpha</CardTitle>
          <CardDescription>
            Returns device's current heading (direction) in degrees, counted
            counterclockwise from the North (0) through West (90), South (180)
            and East (270).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[url('../../public/compass.svg')] bg-contain bg-no-repeat bg-center h-52 w-full grid place-items-center">
            <img
              ref={compassNeedleRef}
              className="h-24 ml-3"
              src={compassNeedle}
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
