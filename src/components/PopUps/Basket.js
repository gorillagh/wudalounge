import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Icon, Zoom } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,

  background: "transparent",
};

const Basket = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const containerRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleRemoveDish = (dish) => {
    //
  };

  return (
    <Box>
      {props.cart && (
        <Modal
          closeAfterTransition={true}
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slots={{
            backdrop: () => (
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(5.8px)",
                  "-webkit-backdrop-filter": "blur(5.8px)",
                  width: "100%",
                  height: "100%",
                }}
                onClick={props.close}
              />
            ),
          }}
          ref={containerRef}
        >
          <Zoom
            container={containerRef.current}
            appear={true}
            in={props.open}
            mountOnEnter
            unmountOnExit
            timeout={300}
          >
            <Box sx={style}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(8.8px)",
                  "-webkit-backdrop-filter": "blur(8.8px)",

                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                  webkitBackdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  position: "relative",
                }}
                component="form"
                onSubmit={handleSubmit}
                noValidate
              >
                <Box sx={{ position: "relative" }}>
                  <PageTitle title="coming soom..!" />
                </Box>
                <Box sx={{ position: "absolute", top: "3%" }}>
                  <Icon
                    onClick={props.close}
                    fontSize="large"
                    color="error"
                    sx={{
                      position: "fixed",
                      right: "3%",
                      zIndex: 4,
                    }}
                  >
                    close
                  </Icon>
                </Box>
              </Box>
            </Box>
          </Zoom>
        </Modal>
      )}
    </Box>
  );
};

export default Basket;
