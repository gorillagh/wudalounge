import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  AppBar,
  Chip,
  Divider,
  Grid,
  Icon,
  InputBase,
  Slide,
  Toolbar,
  Zoom,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";
import DeliveryPickupToggle from "../Buttons/DeliveryPickupToggle";

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
const cardStyle = {
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
      props.setCart({});
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
                px: 3,
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
                {props.cart && props.cart.dishes && props.cart.dishes.length ? (
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
          {props.cart && props.cart.dishes && props.cart.dishes.length ? (
            <>
              <Box sx={{ ...cardStyle }}>
                <Box>
                  <DeliveryPickupToggle
                    cart={props.cart}
                    setCart={props.setCart}
                  />
                  <Box py={1} mt={1}>
                    {props.cart.dishes.map((d, i) => (
                      <Box>
                        <Grid container py={1}>
                          <Grid item xs={2.5}>
                            <Box
                              sx={{
                                borderRadius: "10px",
                                boxSizing: "border-box",
                              }}
                            >
                              <img
                                style={{ borderRadius: "10px" }}
                                alt="dish"
                                src={d.image}
                                width="100%"
                                height="100%"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box px={1}>
                              <Typography>{d.name}</Typography>
                              {props.discount && props.discount > 0 ? (
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    py: 1,
                                    mr: 1,
                                    textDecoration: "line-through",
                                  }}
                                  variant="body2"
                                  component="span"
                                  color="text.secondary"
                                >
                                  GHC{d.price}
                                </Typography>
                              ) : (
                                ""
                              )}
                              <Chip
                                label={
                                  <Typography variant="body2" fontWeight={600}>
                                    GHC{d.price - d.price * props.discount}
                                  </Typography>
                                }
                                color="secondary"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3.5}>
                            <Box
                              sx={{
                                width: "100%",
                                // display: "flex",
                                borderRadius: "12px",
                                // alignItems: "center",
                                // justifyContent: "center",
                                // height: "100%",
                                px: 1,
                                boxSizing: "border-box",
                                display: "flex",
                                boxShadow:
                                  "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                              }}
                            >
                              <Grid
                                container
                                fullWidth
                                justifyContent="space-between"
                              >
                                <Grid item xs={2}>
                                  <Typography textAlign="left" color="primary">
                                    -
                                  </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  <Typography textAlign="center">
                                    {d.dishQuantity}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography color="primary" textAlign="right">
                                    +
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                        {i === props.cart.dishes.length - 1 ? "" : <Divider />}
                      </Box>
                    ))}
                  </Box>
                  <Divider />
                  <Box display="flex" py={1} onClick={props.close}>
                    <Icon color="primary">add_circle</Icon>
                    <Typography ml={1} color="primary">
                      Add more
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <InputBase
                      sx={{ my: 1 }}
                      fullWidth
                      multiline
                      placeholder="Leave a note or comment"
                      inputProps={{ "aria-label": "search google maps" }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  ...cardStyle,
                }}
              >
                <Box py={2}>
                  <Typography>Address and delivery information</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ...cardStyle,
                }}
              >
                <Box py={2}>
                  <Typography>Subtotal and other charges</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ...cardStyle,
                }}
              >
                <Box py={2}>
                  <Typography>Tips</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ...cardStyle,
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
                ...cardStyle,
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
