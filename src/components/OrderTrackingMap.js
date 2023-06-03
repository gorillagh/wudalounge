import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import originMarker from "../images/wuda/originMarker.png";
import destinationMarker from "../images/wuda/destinationMarker.png";

const OrderTrackingMap = (props) => {
  const mapRef = useRef(null);

  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
  ];

  const loadMapDetails = async (orderLoc, destinationLoc) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#784af4",
        strokeOpacity: 0.8,
        strokeWeight: 4,
      },
    });
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        ...orderLoc,
      },
      zoom: 17,
      gestureHandling: "greedy",
      disableDefaultUI: true,
      clickableIcons: false,
      styles: mapStyles,
    });

    const originMarkerIcon = new window.google.maps.Marker({
      position: props.selectedBranch.address.googleAddress,
      icon: {
        url: originMarker,
        scaledSize: new window.google.maps.Size(50, 50),
      },
      map: map,
    });
    const destinationMarkerIcon = new window.google.maps.Marker({
      position: destinationLoc,
      icon: {
        url: destinationMarker,
        scaledSize: new window.google.maps.Size(50, 50),
      },
      map: map,
    });
    directionsRenderer.setMap(map);
    directionsService
      .route({
        origin: {
          ...props.selectedBranch.address.googleAddress,
        },
        destination: {
          ...destinationLoc,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: "#784af4",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        });
        const route = response.routes[0];
        if (route && route.legs && route.legs.length > 0) {
          const leg = route.legs[0];
          props.setCalculatedDistance(leg.distance.text);
          props.setEstimatedTime(leg.duration.text);
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
  };

  const setLocations = async () => {
    let orderLocSet, destinationLocSet;
    let orderLoc = { lat: "", lng: "" },
      destinationLoc = { lat: "", lng: "" };
    var geocoder = new window.google.maps.Geocoder();
    await geocoder.geocode(
      {
        address: props.order.address.description,
      },
      function (results, status) {
        if (status === "OK") {
          orderLoc.lat = results[0].geometry.location.lat();
          orderLoc.lng = results[0].geometry.location.lng();
          orderLocSet = true;
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
    await geocoder.geocode(
      {
        address: props.order.address.description,
      },
      function (results, status) {
        if (status === "OK") {
          destinationLoc.lat = results[0].geometry.location.lat();
          destinationLoc.lng = results[0].geometry.location.lng();
          destinationLocSet = true;
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
    if (orderLocSet && destinationLocSet)
      loadMapDetails(orderLoc, destinationLoc);
  };

  useEffect(() => {
    setLocations();
  }, []);

  return (
    <Box ref={mapRef} id="map" style={{ width: "100%", height: "100%" }} />
  );
};

export default OrderTrackingMap;
