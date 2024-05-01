export type TDeviceOrientation = {
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  timestamp: number;
};

export type TDeviceOrientationError = {
  code: 9999;
  message: string;
};
