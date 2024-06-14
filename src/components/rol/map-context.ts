import { createContext } from "react";

import Map from "ol/Map";

export const MapContext = createContext<Map | null>(null);
