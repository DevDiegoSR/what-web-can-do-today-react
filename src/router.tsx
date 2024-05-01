import { Route, Routes } from "react-router-dom";

import { Default } from "./layouts/default.tsx";

import { Home } from "./pages/home.tsx";

import { Geolocation } from "./pages/geolocation.tsx";
import { DevicePosition } from "./pages/device-position.tsx";
import { DeviceMotion } from "./pages/device-motion.tsx";

import { NetworkTypeAndSpeed } from "./pages/network-type-and-speed.tsx";
import { OnlineState } from "./pages/online-state.tsx";
import { Vibration } from "./pages/vibration.tsx";
import { BatteryStatus } from "./pages/battery-status.tsx";
import { DeviceMemory } from "./pages/device-memory.tsx";

import { NotFound } from "./pages/not-found.tsx";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />

        <Route path="geolocation" element={<Geolocation />} />
        <Route path="device-position" element={<DevicePosition />} />
        <Route path="device-motion" element={<DeviceMotion />} />

        <Route
          path="network-type-and-speed"
          element={<NetworkTypeAndSpeed />}
        />
        <Route path="online-state" element={<OnlineState />} />
        <Route path="vibration" element={<Vibration />} />
        <Route path="battery-status" element={<BatteryStatus />} />
        <Route path="device-memory" element={<DeviceMemory />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
