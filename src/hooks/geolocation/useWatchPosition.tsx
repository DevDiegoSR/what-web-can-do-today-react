import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

import { TPositionOptions, TPosition, TPositionError } from "./@types/index";

const defaultPositionOptions: TPositionOptions = {
  maximumAge: 0,
  timeout: Infinity,
  enableHighAccuracy: true,
};

export type TWatchPositionContext = {
  position: TPosition | null;
  error: TPositionError | null;
  watcher?: number;
  startWatchPosition: () => void;
  stopWatchPosition: () => void;
};

const WatchPositionContext = createContext<TWatchPositionContext>(
  {} as TWatchPositionContext
);

export type TWatchPositionProps = {
  children: ReactNode;
  positionOptions?: TPositionOptions;
};

export function WatchPositionProvider({
  children,
  positionOptions = defaultPositionOptions,
}: TWatchPositionProps) {
  const [position, setPosition] = useState<TPosition | null>(null);
  const [error, setError] = useState<TPositionError | null>(null);
  const [watcher, setWatcher] = useState<number>();

  const options: TPositionOptions = {
    ...defaultPositionOptions,
    ...positionOptions,
  };

  const onChange = ({ coords, timestamp }: TPosition) => {
    setPosition({
      coords,
      timestamp,
    });
  };

  const onError = (error: TPositionError) => {
    setError({ code: error.code, message: error.message });
  };

  const startWatchPosition = () => {
    if (!navigator || !navigator.geolocation) {
      setError({ code: 9999, message: "Geolocation is not supported" });
      return;
    }

    const currentWatcher = navigator.geolocation.watchPosition(
      onChange,
      onError,
      options
    );

    setWatcher(currentWatcher);
  };

  const stopWatchPosition = () => {
    if (watcher !== undefined) {
      navigator.geolocation.clearWatch(watcher);
      setPosition(null);
      setError(null);
      setWatcher(undefined);
    }
  };

  return (
    <WatchPositionContext.Provider
      value={{
        position,
        error,
        watcher,
        startWatchPosition,
        stopWatchPosition,
      }}
    >
      {children}
    </WatchPositionContext.Provider>
  );
}

export const useWatchPosition = () => {
  const context = useContext(WatchPositionContext);

  useEffect(() => {
    context.stopWatchPosition();
  }, []);

  return context;
};
