import { Key, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useContexts } from "../../context";
import { ContextDataType } from "../../@types/data";

export default function Map() {
  const { clicks, onClick, center, changeCenter } =
    useContexts() as ContextDataType;

  const onClicks = (e: google.maps.MapMouseEvent) => {
    onClick(e);
    changeCenter({
      lat: Number(e.latLng?.toJSON().lat),
      lng: Number(e.latLng?.toJSON().lng),
    });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAPS_API),
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      options={{ streetViewControl: false, mapTypeControl: false }}
      onClick={onClicks}
      zoom={3}
      center={center}
      mapContainerClassName="map-container"
    >
      {clicks.map((latLng: google.maps.LatLng, i: Key) => (
        <Marker key={i} position={latLng} />
      ))}
    </GoogleMap>
  );
}
