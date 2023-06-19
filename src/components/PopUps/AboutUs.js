import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import {
  AppBar,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import Subtitle from "../Typography/Subtitle";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Carousel } from "react-responsive-carousel";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  px: 2,
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
        <Typography>Unable to load map...</Typography>
      </Box>
    );

  return null;
};

const AboutUs = (props) => {
  const [loading, setLoading] = useState(false);
  function MyMapComponent() {
    const ref = useRef();

    useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center: {
          lat: props.selectedBranch.address.googleAddress.lat,
          lng: props.selectedBranch.address.googleAddress.lng,
        },
        zoom: 17,
        // gestureHandling: "greedy",
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: props.selectedBranch.address.googleAddress.lat,
          lng: props.selectedBranch.address.googleAddress.lng,
        },
        map,
      });
    });

    return (
      <Box
        ref={ref}
        id="map"
        style={{ width: "100%", height: "250px", borderRadius: "12px" }}
      />
    );
  }
  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        ref={containerRef}
        sx={{ width: { md: "60%" }, left: { md: "20%" } }}
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
            onClick={(e) => {
              if (e.currentTarget !== e.target) return;
              props.close();
            }}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box>
                <AppBar
                  elevation={1}
                  position="fixed"
                  color="inherit"
                  sx={{
                    top: "0",
                    px: 2,
                    background: "rgba(0, 0, 0, 0.1)",

                    backdropFilter: "blur(8.8px)",
                    WebkitBackdropFilter: "blur(8.8px)",
                  }}
                >
                  <Box my={2} display="flex" justifyContent="space-between">
                    <PageTitle
                      my={0}
                      title={`${props.restaurantDetails.name}`}
                    />
                    <Icon
                      color="error"
                      fontSize="large"
                      onClick={props.onClose}
                    >
                      close
                    </Icon>
                  </Box>
                </AppBar>
                <Toolbar sx={{ backgroundColor: "transparent", my: 2 }} />
              </Box>

              <Box>
                <Carousel
                  showIndicators={true}
                  autoPlay={false}
                  centerMode={false}
                  infiniteLoop
                  interval={4000}
                  showArrows={false}
                  showStatus={false}
                  showThumbs={false}
                  swipeable
                  emulateTouch
                >
                  {props.restaurantDetails.about.photos.map((photo, index) => (
                    <Box
                      position="relative"
                      key={index}
                      display="flex"
                      width="100%"
                      height="40vh"
                      borderRadius="12px"
                    >
                      <img
                        src={photo}
                        alt={`${props.restaurantDetails.name}`}
                        width="100%"
                        style={{
                          borderRadius: "12px",
                        }}
                      />
                    </Box>
                  ))}
                </Carousel>
              </Box>

              {props.restaurantDetails.about.texts.map((text, index) => (
                <Typography variant="body2" my={1}>
                  {text}
                </Typography>
              ))}

              <Box my={4}>
                <Subtitle
                  title="Locate us"
                  mb={1}
                  chip={
                    <Icon color="primary" fontSize="small">
                      location_on
                    </Icon>
                  }
                />
                <Typography variant="body2" fontWeight={500} mb={1}>
                  {props.selectedBranch.address.description}
                </Typography>
                <Wrapper
                  render={render}
                  apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                  <MyMapComponent />
                  <LoadingBackdrop open={loading} />
                </Wrapper>
              </Box>
              <Box>
                <Subtitle title="Working hours" mb={1} />
                {props.selectedBranch.workingHours.map((period, index) => (
                  <Typography fontWeight={500} variant="body2">
                    {period.day} : {period.start} - {period.close}
                  </Typography>
                ))}
              </Box>
              <Box my={4}>
                <Subtitle title="Contact us" mb={1} />
                <Box display="flex" alignItems="center">
                  <Icon fontSize="small" color="primary">
                    phone
                  </Icon>{" "}
                  <Typography ml={1} fontWeight={500}>
                    {props.selectedBranch.contact.phoneNumber}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" my={1}>
                  <Icon color="primary" fontSize="small">
                    mail
                  </Icon>{" "}
                  <Typography ml={1} fontWeight={500}>
                    {props.selectedBranch.contact.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* <LoadingBackdrop open={loading} /> */}
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default AboutUs;
