import OlMap from "ol/Map";
import { Vector as OlVector } from "ol/layer";
import OlFeature, { FeatureLike } from "ol/Feature";
import { Vector as OlVectorSource } from "ol/source";
import { Point } from "ol/geom";
import { buffer } from "ol/extent";
import Style from "ol/style/Style";

import { markerStyle } from "./GeolocationMarkerStyle";

import { Coordinates } from "../@types/index";

export class GeolocationMarker {
  private vectorLayer: OlVector<FeatureLike>;

  constructor(private map: OlMap) {
    this.map = map;
    this.vectorLayer = new OlVector({
      source: new OlVectorSource(),
      style: markerStyle,
      zIndex: map.getLayers().getLength() + 99,
    });
  }

  private createMarker(coordinates: Coordinates) {
    const point = new Point([
      coordinates.longitude,
      coordinates.latitude,
    ]).transform("EPSG:4326", "EPSG:3857");

    const feature = new OlFeature({
      geometry: point,
    });

    return { feature, point };
  }

  public addGeolocationMarker(coordinates: Coordinates) {
    this.map.addLayer(this.vectorLayer);

    const { feature, point } = this.createMarker(coordinates);

    this.vectorLayer.getSource()!.addFeature(feature);

    this.map.getView().fit(buffer(point.getExtent(), 25000));
  }

  public updateGeolocationMarker(
    coordinates: Coordinates,
    fitToExtent = false
  ) {
    this.vectorLayer.getSource()!.clear();

    const { feature, point } = this.createMarker(coordinates);

    this.vectorLayer.getSource()!.addFeature(feature);

    if (fitToExtent) {
      this.map.getView().fit(buffer(point.getExtent(), 200));
    }
  }

  public removeGeolocationMarker() {
    this.vectorLayer.getSource()!.clear();
    this.map.removeLayer(this.vectorLayer);
  }

  private degToRad(degrees: number) {
    return (degrees * Math.PI) / 180.0;
  }

  private radToDeg(radians: number) {
    return radians * (180.0 / Math.PI);
  }

  public setGeolocationMarkerRotation(rotation: number, mapRotation: number) {
    if (this.vectorLayer) {
      const mapRotationInDeg = this.radToDeg(mapRotation);
      const absoluteRotation = (rotation + mapRotationInDeg) % 360;
      const rotationInRad = this.degToRad(Math.round(absoluteRotation));

      const style = this.vectorLayer.getStyle() as Style;
      style?.getImage()?.setRotation(rotationInRad);
      this.vectorLayer.getSource()?.changed();
    }
  }
}
