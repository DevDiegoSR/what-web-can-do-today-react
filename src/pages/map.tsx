import { Map } from "@/components/rol/map";
import { OpenStreetMap } from "@/components/rol/sources";
import { TileLayer } from "@/components/rol/tile-layer";
import { ROlGeolocation } from "@/components/rol/controls/geolocation/geolocation";

export function MapTemp() {
  return (
    <main className="flex-1 flex">
      <Map
        id="map-1"
        className="flex-1"
        zoom={12}
        center={[-45.967823, -23.300423]}
      >
        <TileLayer source={OpenStreetMap} zIndex={0} />
        <ROlGeolocation className="inset-4" />
      </Map>
    </main>
  );
}
