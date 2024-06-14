import OlStyle from "ol/style/Style";
import OlIcon from "ol/style/Icon";

import marker from "../../../../../assets/navigation.svg";

export const markerStyle = new OlStyle({
  image: new OlIcon({
    src: marker,
    width: 40,
    height: 40,
    rotation: 0,
  }),
});
