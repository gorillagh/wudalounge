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
  const clearBasket = () => {
    if (window.confirm("Are you sure you want to clear your basket?")) {
      props.setCart([]);
      window.localStorage.removeItem("wdCart");
    }
  };

  return (
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
                {props.cart && props.cart.length ? (
                  <Grid item xs={9}>
                    <Box
                      display="flex"
                      textAlign="right"
                      justifyContent="flex-end"
                    >
                      <Icon color="error" onClick={clearBasket}>
                        delete_outlined
                      </Icon>{" "}
                      <Typography color="error" onClick={clearBasket}>
                        Clear basket
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </AppBar>
            <Toolbar sx={{ backgroundColor: "#fff" }} />
          </Box>
          {props.cart && props.cart.length ? (
            <>
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
                <Box py={2}>
                  <Typography>Basket information</Typography>
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
                <Box py={2}>
                  <Typography>Address and delivery information</Typography>
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
                <Box py={2}>
                  <Typography>Subtotal and other charges</Typography>
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
                <Box py={2}>
                  <Typography>Tips</Typography>
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
                <Box py={2}>
                  <Typography>Grand total and payment</Typography>
                  <ActionButton text="Place order" my={0} />
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                p: 5,
                mt: 5,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8.8px)",
                "-webkit-backdrop-filter": "blur(8.8px)",
              }}
            >
              <Subtitle title="Your basket is empty!" textAlign="center" />
            </Box>
          )}
        </Box>
      </Slide>
    </Modal>
  );
};

export default Basket;
