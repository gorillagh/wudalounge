import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CircularProgress, Icon, Typography, Zoom } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  py: 1,
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
  const [loading, setLoading] = useState(false);
  function MyMapComponent() {
    const ref = useRef();

    useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: 5.569976708828936, lng: -0.18671566160150527 },
        zoom: 17,
        gestureHandling: "greedy",
      });
      const marker = new window.google.maps.Marker({
        position: { lat: 5.569976708828936, lng: -0.18671566160150527 },
        map,
      });
    });

    return <Box ref={ref} id="map" style={{ width: "100%", height: "70vh" }} />;
  }
  const containerRef = React.useRef(null);

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
                <Subtitle title="Locate us" my={0} />

                <Icon
                  fontSize="large"
                  color="error"
                  onClick={() => props.onClose()}
                >
                  close
                </Icon>
              </Box>
              <Typography variant="body2" px={2} fontWeight={500}>
                Opposite Police Headquaters Gate 1, Ring Rd E, Accra
              </Typography>
              <Wrapper
                render={render}
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <MyMapComponent />
                <LoadingBackdrop open={loading} />
              </Wrapper>
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default GoogleMap;
