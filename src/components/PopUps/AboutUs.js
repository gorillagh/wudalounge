import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import {
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import Subtitle from "../Typography/Subtitle";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

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
        center: { lat: 5.569976708828936, lng: -0.18671566160150527 },
        zoom: 17,
        // gestureHandling: "greedy",
      });
      const marker = new window.google.maps.Marker({
        position: { lat: 5.569976708828936, lng: -0.18671566160150527 },
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
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="Wuda Lounge" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              <Box borderRadius="12px">
                <img
                  style={{ borderRadius: "12px" }}
                  src="https://res.cloudinary.com/dkxrwzp2d/image/upload/v1675981586/IMG-0735_g5fyvp.jpg"
                  alt="Wuda family"
                  width="100%"
                />
              </Box>
              <Typography variant="body2" my={1}>
                Welcome to Wuda Lounge, a family-owned and operated restaurant
                that offers delicious and fresh meals for dine-in and delivery.
                We believe in using only the finest ingredients and preparing
                each dish to perfection, ensuring that every bite is memorable.
                From classic comfort foods to contemporary cuisine, we have
                something for everyone.
              </Typography>
              <Typography variant="body2" my={1}>
                Let us bring our passion for food to your door, and experience
                the taste of Wuda Lounge in the comfort of your own home.
              </Typography>
              {/* <Typography variant="body2" my={1}>
                Welcome to Wuda Lounge, a family-owned and operated restaurant
                that has been serving delicious meals for over 5 years. Our
                passion for food, hospitality, and community has driven us to
                create a warm and inviting atmosphere where everyone feels at
                home.
              </Typography>
              <Typography variant="body2" my={1}>
                Our menu features a wide variety of dishes made with only the
                freshest and finest ingredients, sourced from local suppliers
                and farmers. From classic comfort foods to contemporary cuisine,
                we have something to suit everyone's taste buds. Our chef and
                kitchen staff take great pride in preparing each dish to
                perfection, ensuring that every bite is as good as the last.
              </Typography>
              <Typography variant="body2" my={1}>
                In addition to dining in, we also offer food delivery services
                to make sure our customers can enjoy their favorite meals in the
                comfort of their own homes. Our delivery drivers are prompt,
                friendly, and committed to delivering your food hot and fresh.
              </Typography>
              <Typography variant="body2" my={1}>
                We believe that food should not only taste great, but also do
                good for the community and the environment. That's why we have
                implemented eco-friendly practices in our kitchen and have made
                a commitment to supporting local non-profit organizations.
              </Typography>
              <Typography variant="body2" my={1}>
                Whether you're in the mood for a quick lunch, a romantic dinner
                for two, or a family gathering, Wuda Lounge is the perfect place
                to be. We look forward to serving you and making your dining
                experience a memorable one.
              </Typography> */}
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
              <Box my={4}>
                <Subtitle title="Contact us" mb={1} />
                <Box display="flex" alignItems="center">
                  <Icon fontSize="small" color="primary">
                    phone
                  </Icon>{" "}
                  <Typography ml={1} fontWeight={500}>
                    +233244410869
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" my={1}>
                  <Icon color="primary" fontSize="small">
                    mail
                  </Icon>{" "}
                  <Typography ml={1} fontWeight={500}>
                    support@wudalounge.com
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
