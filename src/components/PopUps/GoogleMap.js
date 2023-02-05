import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PageTitle from "../Typography/PageTitle";
import { PaystackButton } from "react-paystack";
import { Icon, Typography } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import { verifyTransactionAndCreateOrder } from "../../serverFunctions/payment";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import ActionButton from "../Buttons/ActionButton";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 2,
};

const GoogleMap = (props) => {
  const [loading, setLoading] = useState(false);
  function MyMapComponent() {
    const ref = useRef();

    useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: 5.569976708828936, lng: -0.18671566160150527 },
        zoom: 17,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: 5.569976708828936, lng: -0.18671566160150527 },
        map,
      });
    });

    return (
      <div ref={ref} id="map" style={{ width: "100%", height: "70vh" }}></div>
    );
  }

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              mb={2}
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
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <MyMapComponent />
            </Wrapper>
          </Box>
          <LoadingBackdrop open={loading} />
        </Box>
      </Modal>
    </div>
  );
};

export default GoogleMap;
