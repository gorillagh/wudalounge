import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  AppBar,
  CircularProgress,
  Icon,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ActionButton from "../Buttons/ActionButton";
import OrderTrackingMap from "../OrderTrackingMap";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  background: "transparent",
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

const OrderTracking = (props) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(null);

  useEffect(() => {
    console.log("selected order==>", props.order);
  }, []);

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
              <IconButton
                sx={{
                  position: "fixed",
                  right: "5%",
                  top: "3%",
                  zIndex: 5,
                  bgcolor: "#fff",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => {
                  setCalculatedDistance(null);
                  setEstimatedTime(null);
                  props.onClose();
                }}
              >
                <Icon sx={{ color: "#000" }}>close</Icon>
              </IconButton>
              <Wrapper
                render={render}
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <OrderTrackingMap
                  order={props.order}
                  lat={props.lat}
                  lng={props.lng}
                  user={props.user}
                  selectedBranch={props.selectedBranch}
                  setEstimatedTime={setEstimatedTime}
                  setCalculatedDistance={setCalculatedDistance}
                />
                <Box borderTopRightRadius="12px" borderTopLeftRadius="12px">
                  <AppBar
                    position="fixed"
                    color="inherit"
                    sx={{
                      boxShadow: "4px 4px 8px 5px rgba(0, 0, 0, 0.2)",
                      top: "auto",
                      bottom: 0,
                      p: 2,
                      // background: "rgba(255, 255, 255, 0.5)",
                      // backdropFilter: "blur(8.8px)",
                      // WebkitBackdropFilter: "blur(8.8px)",
                      width: { md: "60%" },
                      left: { md: "20%" },
                      borderTopRightRadius: "12px",
                      borderTopLeftRadius: "12px",
                    }}
                  >
                    {estimatedTime && calculatedDistance ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Subtitle
                          title={`Arrives in ${estimatedTime}`}
                          my={0}
                        />
                        {/* <Subtitle title={calculatedDistance} my={0} /> */}

                        <IconButton size="small" color="primary">
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Icon>phone</Icon>
                            <Typography variant="body2" fontWeight={500}>
                              Call courier
                            </Typography>
                          </Box>
                        </IconButton>
                      </Box>
                    ) : (
                      ""
                    )}
                  </AppBar>
                </Box>
                <LoadingBackdrop open={loading} />
              </Wrapper>
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default OrderTracking;
