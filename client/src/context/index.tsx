import { createContext, useContext, useState } from "react";
import { ContextClickData, ContextDataType } from "../@types/data";

const DataContext = createContext<ContextDataType | null>(null);

export const DataContextProvider = ({ children }: any) => {
  const [center, setCenter] = useState<ContextClickData["center"]>({
    lat: 41.015137,
    lng: 28.97953,
  });
  const [clicks, setClicks] = useState<ContextClickData["clicks"][]>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([e.latLng!]);
  };
  const onForm = (e: google.maps.LatLng) => {
    setClicks([e]);
  };

  const changeCenter = (m: google.maps.LatLngLiteral) => {
    setCenter({ lat: m.lat, lng: m.lng });
  };

  const values = {
    clicks,
    setClicks,
    center,
    setCenter,
    onClick,
    changeCenter,
    onForm,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useContexts = () => {
  return useContext(DataContext);
};

export default DataContext;
