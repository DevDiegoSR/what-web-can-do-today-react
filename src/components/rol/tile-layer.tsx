import { useEffect, useContext } from "react";

import OlTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { Options } from "ol/layer/BaseTile";

import { MapContext } from "./map-context";

export type TTileLayerProps = Options<TileSource> & {};

export function TileLayer({ ...props }: TTileLayerProps) {
  const map = useContext(MapContext);

  const source = props.source;
  const zIndex = props.zIndex;

  useEffect(() => {
    if (!map) return;

    const tileLayerOptions: Options<TileSource> = {
      source,
      zIndex,
    };
    const tileLayerObject = new OlTileLayer(tileLayerOptions);

    map.addLayer(tileLayerObject);

    return () => {
      if (map) {
        map.removeLayer(tileLayerObject);
      }
    };
  }, [map]);

  return null;
}
