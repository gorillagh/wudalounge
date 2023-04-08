import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  CircularProgress,
  Icon,
  MenuItem,
  Select,
  Typography,
  Zoom,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ActionButton from "../Buttons/ActionButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  py: 1,
  height: "80vh",
};

var render = function (status) {
  if (status === Status.LOADING)
    return (
      <Box display="flex" justifyContent="center">
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

const GoogleMap = (props) => {
  const [chosenBranch, setChosenBranch] = useState(props.selectedBranch.name);
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    props.selectedBranch
  );
  const [loading, setLoading] = useState(false);
  // const [lng, setLng] = useState(selectedRestaurant.address.googleAddress.lng);
  // const [lat, setLat] = useState(selectedRestaurant.address.googleAddress.lat);

  const handleBranchChange = (e) => {
    setChosenBranch(e.target.value);
    setSelectedRestaurant((prevState) => {
      props.restaurantDetails.branches.map((branch, index) => {
        if (e.target.value === branch.name) {
          prevState = branch;
        }
      });
      return prevState;
    });
  };

  function MyMapComponent() {
    const ref = useRef();
    useEffect(() => {
      // var geocoder = new window.google.maps.Geocoder();
      // geocoder.geocode(
      //   { address: "1st Ringway Close, Accra, Ghana" },
      //   function (results, status) {
      //     if (status === "OK") {
      //       setLat(results[0].geometry.location.lat());
      //       setLng(results[0].geometry.location.lng());
      //       console.log("Latitude: " + lat);
      //       console.log("Longitude: " + lng);
      //     } else {
      //       console.log(
      //         "Geocode was not successful for the following reason: " + status
      //       );
      //     }
      //   }
      // );
      const map = new window.google.maps.Map(ref.current, {
        center: {
          lat: selectedRestaurant.address.googleAddress.lat,
          lng: selectedRestaurant.address.googleAddress.lng,
        },
        zoom: 17,
        gestureHandling: "greedy",
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: selectedRestaurant.address.googleAddress.lat,
          lng: selectedRestaurant.address.googleAddress.lng,
        },
        map,
      });
    });

    return <Box ref={ref} id="map" style={{ width: "100%", height: "50vh" }} />;
  }
  const containerRef = React.useRef(null);

  const handleSetBranch = () => {
    if (props.restaurantDetails === selectedRestaurant) {
      props.onClose();
      return;
    } else {
      if (
        window.confirm(
          `Are you sure you want to change the branch to "${chosenBranch}" branch`
        )
      ) {
        props.setSelectedBranch(selectedRestaurant);
        props.onClose();
      }
    }
  };

  return (
    <div>
      <Modal
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom
          container={containerRef.current}
          appear={true}
          in={props.open}
          direction="left"
          mountOnEnter
          unmountOnExit
          //   timeout={300}
        >
          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Subtitle title="Select branch" my={0} />

                <Icon
                  fontSize="large"
                  color="error"
                  onClick={() => props.onClose()}
                >
                  close
                </Icon>
              </Box>
              <Box p={2}>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chosenBranch}
                  onChange={handleBranchChange}
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {props.restaurantDetails.branches.map((branch, index) => (
                    <MenuItem value={branch.name}>
                      {branch.name.toUpperCase()}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value="tankosWeija">Weija</MenuItem>
                  <MenuItem value="tankosKokrobite">Kokrobite</MenuItem> */}
                </Select>
              </Box>
              <Typography variant="body2" px={2} fontWeight={500}>
                {props.selectedBranch.address.description}
              </Typography>
              <Wrapper
                render={render}
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <MyMapComponent />
                <LoadingBackdrop open={loading} />
              </Wrapper>
              <Box p={2}>
                <ActionButton
                  text="Set branch"
                  my={0}
                  onClick={handleSetBranch}
                />
              </Box>
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default GoogleMap;
