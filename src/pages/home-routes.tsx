import {
  MdMyLocation,
  MdGroupWork,
  MdOutlineScreenRotation,
  Md3DRotation,
  MdLeakAdd,
  MdOutlineWifiTethering,
  MdOutlineSignalCellularConnectedNoInternet4Bar,
  MdVibration,
  MdBatteryFull,
  MdMemory,
} from "react-icons/md";

export const homeRoutes = {
  locationAndPosition: [
    {
      id: "1",
      to: "/geolocation",
      title: "Geolocation",
      icon: <MdMyLocation size={20} />,
      isAvailable: true,
    },
    {
      id: "2",
      to: "/geofencing",
      title: "Geofencing",
      icon: <MdGroupWork size={20} />,
      isAvailable: false,
    },
    {
      id: "3",
      to: "/device-position",
      title: "Device Position",
      icon: <MdOutlineScreenRotation size={20} />,
      isAvailable: true,
    },
    {
      id: "4",
      to: "/device-motion",
      title: "Device Motion",
      icon: <Md3DRotation size={20} />,
      isAvailable: true,
    },
    {
      id: "5",
      to: "/proximity-sensors",
      title: "Proximity Sensors",
      icon: <MdLeakAdd size={20} />,
      isAvailable: false,
    },
  ],
  deviceFeatures: [
    {
      id: "1",
      to: "/network-type-and-speed",
      title: "Network Type & Speed",
      icon: <MdOutlineWifiTethering size={20} />,
      isAvailable: true,
    },
    {
      id: "2",
      to: "/online-state",
      title: "Online State",
      icon: <MdOutlineSignalCellularConnectedNoInternet4Bar size={20} />,
      isAvailable: true,
    },
    {
      id: "3",
      to: "/vibration",
      title: "Vibration",
      icon: <MdVibration size={20} />,
      isAvailable: true,
    },
    {
      id: "4",
      to: "/battery-status",
      title: "Battery Status",
      icon: <MdBatteryFull size={20} />,
      isAvailable: true,
    },
    {
      id: "5",
      to: "/device-memory",
      title: "Device Memory",
      icon: <MdMemory size={20} />,
      isAvailable: true,
    },
  ],
};
