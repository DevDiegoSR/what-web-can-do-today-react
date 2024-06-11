export type TDeviceOrientation = {
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  timestamp: number;
  angle: number;
  type: string;
  correctionAngle: number;
  webkitCompassHeading?: number | null;
  webkitCompassHeadingCounterclockwise?: number | null;
  compass: number | null;
  absoluteCompass: number | null;
};

enum OrientationErrorCode {
  PERMISSION_DENIED = 1,
}

export type TDeviceOrientationError = {
  code: OrientationErrorCode | 9999;
  message: string;
};
