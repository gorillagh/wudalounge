import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

var render = function (status) {
  if (status === Status.LOADING)
    return (
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          width: "100%",
          height: "25vh",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <Typography>
          <CircularProgress thickness={4} />
        </Typography>
      </Box>
    );
  if (status === Status.FAILURE)
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="body2">Unable to load map...</Typography>
      </Box>
    );

  return null;
};

const BasketMapComponent = (props) => {
  const mapRef = useRef();
  const loadMapDetails = async (lat, lng) => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat,
        lng,
      },
      zoom: 17,
      gestureHandling: "none",
      disableDefaultUI: true,
      clickableIcons: false,
    });

    const marker = new window.google.maps.Marker({
      position: {
        lat,
        lng,
      },
      map,
    });

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          props.selectedBranch.address.googleAddress.lat,
          props.selectedBranch.address.googleAddress.lng
        ),
        // destination: new window.google.maps.LatLng(),
        destination: new window.google.maps.LatLng(lat, lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now() + 1000), // 1 second from now
          trafficModel: "bestguess",
        },
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Get the distance from the result object
          const distance = result.routes[0].legs[0].distance.text;
          const duration = Math.round(
            result.routes[0].legs[0].duration_in_traffic.value / 60
          );

          // Do something with the distance and directions
          console.log(`Duration: ${duration}`);
          props.setOrderDuration(duration + props.orderDuration);
        }
      }
    );
  };

  useEffect(() => {
    let lat = "";
    let lng = "";
    var geocoder = new window.google.maps.Geocoder();

    console.log(props.pinAddress);
    if (props.pinAddress) {
      lat = props.pinAddress.geometry.location.lat();
      lng = props.pinAddress.geometry.location.lng();
      console.log("Long->", lng);
      console.log("latitude", lat);
      loadMapDetails(lat, lng);
    } else {
      geocoder.geocode(
        {
          address:
            props.user && props.user.addresses.length
              ? props.user.addresses[0].description
              : "Backyard Bar & Grill, Ring Road East, Accra, Ghana",
        },
        function (results, status) {
          if (status === "OK") {
            props.setPinAddress(results[0]);
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            console.log("Long->", lng);
            console.log("latitude", lat);
            // props.setLat(results[0].geometry.location.lat());
            // props.setLng(results[0].geometry.location.lng());
            loadMapDetails(lat, lng);
          } else {
            console.log(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
  }, [props.user, props.openAddressPin]);

  return (
    // <Wrapper render={render} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <Box
      ref={mapRef}
      id="map"
      style={{
        width: "100%",
        height: "30vh",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    />
    // </Wrapper>
  );
};

export default BasketMapComponent;
