export type TDeviceOrientation = {
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  timestamp: number;
  webkitCompassHeading?: number | null;
  compass: number | null;
};

enum OrientationErrorCode {
  PERMISSION_DENIED = 1,
}

export type TDeviceOrientationError = {
  code: OrientationErrorCode | 9999;
  message: string;
};
