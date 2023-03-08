import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

const MyMapComponent = (props) => {
  const [address, setAddress] = useState({});
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat: props.pinAddress.geometry.location.lat(),
          lng: props.pinAddress.geometry.location.lng(),
        },
      },
      (results, status) => {
        if (status === "OK") {
          //   const address = results[0].formatted_address;
          //   console.log(`Marker position: ${lat}, ${lng}`);
          //   console.log(`Address: ${address}`);
          console.log(results[0]);
          props.setAddress(results[0]);
        } else {
          console.log(`Geocoder failed: ${status}`);
        }
      }
    );
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: props.pinAddress.geometry.location.lat(),
        lng: props.pinAddress.geometry.location.lng(),
      },
      zoom: 17,
      gestureHandling: "greedy",
      disableDefaultUI: true,
      clickableIcons: false,
    });
    const marker = new window.google.maps.Marker({
      position: map.getCenter(),
      map,
      animation: window.google.maps.Animation.DROP,
    });
    marker.bindTo("position", map, "center");

    markerRef.current = marker;

    map.addListener("dragend", () => {
      props.setAddressLoading(true);
      const position = marker.getPosition();
      console.log(position);
      const lat = position.lat();
      const lng = position.lng();

      // Use the Google Maps Geocoding API to get the address
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK") {
          //   const address = results[0].formatted_address;
          //   console.log(`Marker position: ${lat}, ${lng}`);
          //   console.log(`Address: ${address}`);
          console.log(results[0]);
          props.setAddress(results[0]);
          props.setAddressLoading(false);
        } else {
          props.setAddressLoading(false);
          console.log(`Geocoder failed: ${status}`);
        }
      });
    });
  }, []);

  return (
    <Box ref={mapRef} id="map" style={{ width: "100%", height: "100%" }} />
  );
};

export default MyMapComponent;
