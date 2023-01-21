import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  AppBar,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Paper,
  Slide,
  Toolbar,
  Zoom,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";
import DeliveryPickupToggle from "../Buttons/DeliveryPickupToggle";
import CircularLoading from "../Feedbacks/CircularLoading";

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

const Address = (props) => {
  const [address, setAddress] = useState("");

  const handleSetAddress = async (e) => {
    setAddress(e.target.value);
  };

  const containerRef = React.useRef(null);
  return (
    <Modal
      hideBackdrop
      closeAfterTransition={true}
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // slots={{
      //   backdrop: () => (
      //
      //       <Box
      //         sx={{
      //           background: "rgba(0, 0, 0, 0.05)",
      //           backdropFilter: "blur(5.8px)",
      //           "-webkit-backdrop-filter": "blur(5.8px)",
      //           width: "100%",
      //           height: "100%",
      //         }}
      //         onClick={props.close}
      //       />
      //   ),
      // }}
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
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5.8px)",
            "-webkit-backdrop-filter": "blur(5.8px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box sx={style}>
            <Box my={2} display="flex" justifyContent="space-between">
              <PageTitle my={0} title="Delivery Address" />
              <Icon color="error" fontSize="large" onClick={props.onClose}>
                close
              </Icon>
            </Box>
            <Paper
              component="form"
              sx={{
                borderRadius: "20px",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
                value={address}
                onChange={handleSetAddress}
              />
            </Paper>

            {address && address.length ? (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography mt={4} textAlign="center">
                  Under maintenance...!
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default Address;
