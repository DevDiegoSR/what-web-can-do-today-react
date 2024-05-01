export type TPosition = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    speed: number | null;
    heading: number | null;
  };
  timestamp: number;
};

enum PositionErrorCode {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

export type TPositionError = {
  code: PositionErrorCode | 9999;
  message: string;
};

export type TPositionOptions = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};
