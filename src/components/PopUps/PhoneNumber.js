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

const PhoneNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [display, setDisplay] = useState(false);

  const handleSubmit = async (e) => {
    setDisplay(true);
  };

  const containerRef = React.useRef(null);
  return (
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
              <PageTitle my={0} title="Phone Number" />
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
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Typography>+233</Typography>
              </IconButton>
              <InputBase
                type="number"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter phone number"
                inputProps={{ "aria-label": "search google maps" }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={handleSubmit}
              >
                <Icon>arrow_forward</Icon>
              </IconButton>
            </Paper>

            {display && phoneNumber.length ? (
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

export default PhoneNumber;
