import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { AppBar, Grid, Icon, Slide, Toolbar, Zoom } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  px: 1,
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
    props.cart && (
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
        <Slide
          container={containerRef.current}
          appear={true}
          in={props.open}
          direction="left"
          mountOnEnter
          unmountOnExit
          //   timeout={300}
        >
          <Box sx={style}>
            <Box>
              <AppBar
                elevation={0}
                position="fixed"
                color="inherit"
                sx={{
                  top: "0",
                  p: 2,
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(8.8px)",
                  "-webkit-backdrop-filter": "blur(8.8px)",
                }}
              >
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={3} textAlign="left">
                    {/* <Typography textAlign="right"> */}
                    <Icon onClick={props.close}>arrow_back</Icon>
                    {/* </Typography> */}
                  </Grid>
                  <Grid item xs={9}>
                    <Box
                      display="flex"
                      textAlign="right"
                      justifyContent="flex-end"
                    >
                      <Icon color="error">delete_outlined</Icon>{" "}
                      <Typography color="error">Clear basket</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AppBar>
              <Toolbar sx={{ backgroundColor: "#fff" }} />
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                borderBottomRightRadius: "12px",
                borderBottomLeftRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Box height={100}>
                <Subtitle title="Basket information" />
              </Box>
            </Box>

            <Box
              sx={{
                px: 2,
                py: 1,
                my: 1,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Box height={100}>
                <Subtitle title="Address and delivery information" />
              </Box>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                my: 1,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Box height={100}>
                <Subtitle title="Dishes total and other charges" />
              </Box>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                my: 1,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Box height={100}>
                <Subtitle title="Tip" />
              </Box>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                mt: 1,
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Box>
                <Subtitle title="Grand total and payment" />
                <ActionButton text="Place order" my={0} />
              </Box>
            </Box>
          </Box>
        </Slide>
      </Modal>
    )
  );
};

export default Basket;
