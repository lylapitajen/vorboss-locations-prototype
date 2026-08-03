"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BuildingDetailsDrawer } from "@/components/BuildingDetailsDrawer";
import { useDeviceFrameContainer } from "@/components/DeviceFrame";
import { BROADGATE_TOWER } from "@/lib/buildings";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Worship St, Broadgate, London EC2A - matches the walk-around reference flow
const INITIAL_CENTER: [number, number] = [-0.08023, 51.5210802];
const INITIAL_ZOOM = 17;
const MIN_ZOOM = 15;
const MAX_ZOOM = 19;

const SELECTED_SOURCE_ID = "selected-building";

export function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const deviceFrameContainer = useDeviceFrameContainer();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      for (const layer of map.getStyle()?.layers ?? []) {
        if ("source-layer" in layer && layer["source-layer"] === "poi_label") {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      }

      map.addSource(SELECTED_SOURCE_ID, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "selected-building-fill",
        type: "fill",
        source: SELECTED_SOURCE_ID,
        paint: {
          "fill-color": "#e0559f",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "selected-building-outline",
        type: "line",
        source: SELECTED_SOURCE_ID,
        paint: {
          "line-color": "#c2298a",
          "line-width": 2,
        },
      });

      const userLocationEl = document.createElement("div");
      userLocationEl.className = "user-location-dot";
      new mapboxgl.Marker({ element: userLocationEl })
        .setLngLat(INITIAL_CENTER)
        .addTo(map);
    });

    map.on("mousemove", (e) => {
      const hasBuilding = map
        .queryRenderedFeatures(e.point)
        .some((feature) => feature.sourceLayer === "building");
      map.getCanvas().style.cursor = hasBuilding ? "pointer" : "";
    });

    map.on("click", (e) => {
      const source = map.getSource(SELECTED_SOURCE_ID) as
        | mapboxgl.GeoJSONSource
        | undefined;
      if (!source) return;

      const building = map
        .queryRenderedFeatures(e.point)
        .find((feature) => feature.sourceLayer === "building");

      source.setData({
        type: "FeatureCollection",
        features: building
          ? [{ type: "Feature", geometry: building.geometry, properties: {} }]
          : [],
      });

      setIsDrawerOpen(building != null);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen) return;

    const source = mapRef.current?.getSource(SELECTED_SOURCE_ID) as
      | mapboxgl.GeoJSONSource
      | undefined;
    source?.setData({ type: "FeatureCollection", features: [] });
  }, [isDrawerOpen]);

  return (
    <>
      <div className="absolute inset-0">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
      <BuildingDetailsDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        container={deviceFrameContainer}
        building={BROADGATE_TOWER}
      />
    </>
  );
}
