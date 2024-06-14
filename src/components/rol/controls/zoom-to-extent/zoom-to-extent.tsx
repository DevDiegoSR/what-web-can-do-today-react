import { useRef } from "react";

import { Extent, getCenter } from "ol/extent";
import { FitOptions } from "ol/View";
import { transformExtent } from "ol/proj";

import { Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

import { useZoomToExtent } from "./useZoomToExtent";

export type TROlZoomToExtentProps = FitOptions & {
  className?: string;
  extent?: Extent;
};

export function ROlZoomToExtent({
  className,
  extent = [-55.3, 13.2, 112.4, 64.1],
  ...props
}: TROlZoomToExtentProps) {
  const zoomToExtentControlRef = useRef(null);

  const { zoomToExtentControl, currentExtent, handleZoomToExtent } =
    useZoomToExtent({
      element: zoomToExtentControlRef.current ?? undefined,
      extent,
    });

  const currentExtentCenter = JSON.stringify(
    getCenter(currentExtent ?? []).map((item: number) => item.toFixed(5))
  );
  const extentCenter = JSON.stringify(
    getCenter(transformExtent(extent, "EPSG:4326", "EPSG:3857")).map(
      (item: number) => item.toFixed(5)
    )
  );

  return (
    <Button
      ref={zoomToExtentControlRef}
      title="zoom to extent"
      type="button"
      variant="outline"
      size="icon"
      className={twMerge("absolute inset-auto z-10", className)}
      disabled={currentExtentCenter === extentCenter}
      onClick={handleZoomToExtent}
    >
      <Scan className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">{"zoom to extent"}</span>
    </Button>
  );
}
