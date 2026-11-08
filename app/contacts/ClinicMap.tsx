"use client";

import { useEffect, useRef, useState } from "react";
import { load } from "@2gis/mapgl";

const clinicCoordinates: [number, number] = [61.448916, 55.160948];
const mapKey = process.env.NEXT_PUBLIC_2GIS_MAP_KEY;

export default function ClinicMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !mapKey) return;

    let disposed = false;
    let map: InstanceType<Awaited<ReturnType<typeof load>>["Map"]> | undefined;

    load()
      .then((mapgl) => {
        if (disposed || !containerRef.current) return;
        map = new mapgl.Map(containerRef.current, {
          key: mapKey,
          center: clinicCoordinates,
          zoom: 16,
          lang: "ru",
          zoomControl: "centerRight",
          disableZoomOnScroll: true,
        });
        new mapgl.Marker(map, { coordinates: clinicCoordinates });
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      map?.destroy();
    };
  }, []);

  return (
    <div className="contacts-map" aria-label="Карта: Арт-Медика, Челябинск, проспект Ленина, 12А">
      {mapKey && !failed ? (
        <div ref={containerRef} className="contacts-map-canvas" />
      ) : (
        <div className="contacts-map-fallback">
          <p>Карта временно недоступна</p>
          <a href="https://2gis.ru/chelyabinsk/search/проспект%20Ленина%2012А" target="_blank" rel="noreferrer">
            Открыть адрес в 2ГИС
          </a>
        </div>
      )}
    </div>
  );
}
