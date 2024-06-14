import React, { useEffect, useState } from "react";

import OlMap, { MapOptions } from "ol/Map";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import View, { ViewOptions } from "ol/View";
import { fromLonLat } from "ol/proj";

import { twMerge } from "tailwind-merge";

import { MapContext } from "./map-context";

import "ol/ol.css";
import "./rol.css";

type TMapProps = ViewOptions &
  MapOptions & {
    id?: string;
    className?: string;
    children?: React.ReactNode;
  };

export function Map({
  id = self.crypto.randomUUID(),
  className,
  children,
  ...props
}: TMapProps) {
  const [map, setMap] = useState<OlMap | null>(null);

  const center = props.center || [0, 0];
  const zoom = props.zoom || 3;

  useEffect(() => {
    const viewOptions: ViewOptions = {
      center: fromLonLat(center),
      zoom,
      minZoom: 3,
      maxZoom: 27,
    };
    const viewObject = new View(viewOptions);

    const interactions = defaultInteractions({
      altShiftDragRotate: true,
      pinchRotate: true,
    });

    const controls = defaultControls({
      zoom: false,
      rotate: false,
    });

    const mapOptions: MapOptions = {
      view: viewObject,
      layers: [],
      controls,
      interactions,
      overlays: [],
      target: id,
    };
    const mapObject = new OlMap(mapOptions);

    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(fromLonLat(center));
  }, [center]);

  return (
    <MapContext.Provider value={map as OlMap}>
      <div
        id={id}
        // tabIndex={0}
        className={twMerge(
          "relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transform",
          className
        )}
      >
        {children}
      </div>
    </MapContext.Provider>
  );
}
