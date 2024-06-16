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
import azimuthArrow from "../assets/azimuth_arrow.svg";
import azimuthCompassRose from "../assets/azimuth_compass_rose.svg";

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
            Returns device's current heading (direction) in degrees, counted
            counterclockwise from the North (0) through West (90), South (180)
            and East (270).
            <br />
            Android = alpha | IOS = webkitCompassHeadingCounterclockwise
            <br />
            *webkitCompassHeadingCounterclockwise = (360 -
            event.webkitCompassHeading) % 360
            <br />
            *absoluteCompass = compass + correctionAngle
            <br />
            *correctionAngle = device orientation angle
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 grid place-items-center">
            <img
              ref={compassRef}
              className="h-72 w-72"
              src={compass}
              alt="compass"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Azimuth</CardTitle>
          <CardDescription>
            The horizontal angle of an object from a reference point, typically
            north or south.
            <br />
            360 - absoluteCompass
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full relative h-96 grid place-items-center">
            <img
              ref={azimuthRef}
              className="absolute h-16 w-16"
              src={azimuthArrow}
              alt="compass-needle"
            />
            <img className="h-72 w-72" src={azimuthCompassRose} alt="compass" />
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
