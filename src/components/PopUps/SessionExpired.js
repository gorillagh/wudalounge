import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Icon, IconButton, Typography, Zoom } from "@mui/material";
import Subtitle from "../Typography/Subtitle";

import ActionButton from "../Buttons/ActionButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 250,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

const SessionExpired = (props) => {
  const containerRef = React.useRef(null);

  return (
    <div>
      <Modal
        hideBackdrop
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
                mb={2}
              >
                <Subtitle title="Your Session Expired" my={0} />
              </Box>
              <Box>
                <Typography variant="body2" my={2}>
                  The page will reload.
                </Typography>
                <ActionButton
                  text="Ok"
                  sx={{
                    fontWeight: "bold",

                    borderRadius: 5,
                    textTransform: "capitalize",
                    color: props.variant !== "contained" ? "" : "#fff",
                    boxShadow: "0.5px 1px 0px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#E3581C",
                    "&:hover": {
                      backgroundColor: "#E3581C",
                    },
                  }}
                  my={0}
                  onClick={() => window.location.reload()}
                />
              </Box>
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default SessionExpired;
