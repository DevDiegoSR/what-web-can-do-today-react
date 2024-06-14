import { useContext, useEffect, useState } from "react";

import { Control } from "ol/control";
import { Options } from "ol/control/Control";
import { AnimationOptions } from "ol/View";
import { transformExtent } from "ol/proj";
import { Extent } from "ol/extent";

import { MapContext } from "../../map-context";

export type TZoomToExtentOptions = Options &
  AnimationOptions & {
    extent: Extent;
  };

export function useZoomToExtent(options: TZoomToExtentOptions) {
  const map = useContext(MapContext);

  const [zoomToExtentControl, setZoomToExtentControl] = useState<Control>();

  const [currentExtent, setCurrentExtent] = useState<Extent>();

  useEffect(() => {
    if (!map) return;

    const zoomToExtentControlObject = new Control(options);

    map.addControl(zoomToExtentControlObject);
    setZoomToExtentControl(zoomToExtentControlObject);
    setCurrentExtent(map.getView().calculateExtent());

    return () => {
      if (!map) return;

      map.removeControl(zoomToExtentControlObject);
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    map.getView().addChangeListener("center", onCenterChange);

    return () => {
      if (!map) return;

      map.getView().removeChangeListener("center", onCenterChange);
    };
  }, [zoomToExtentControl]);

  function onCenterChange() {
    setCurrentExtent(map?.getView().calculateExtent());
  }

  function handleZoomToExtent() {
    if (!map) return;

    map
      .getView()
      .fit(transformExtent(options.extent, "EPSG:4326", "EPSG:3857"), {
        // duration
      });
  }

  return { zoomToExtentControl, currentExtent, handleZoomToExtent };
}
