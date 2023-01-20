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
  const [selectedDish, setSelectedDish] = useState({});

  const containerRef = React.useRef(null);

  // useEffect(() => {
  //   props.cart &&
  //     props.cart.dishes &&
  //     props.cart.dishes.length &&
  //     props.cart.dishes.map((d, i) => {
  //       calculateTotalAmount(d, i);
  //     });
  // });

  // const calculateTotalAmount = async (dish, index) => {
  //   if (dish && dish.extras) {
  //     let totalExtras = 0;
  //     for (var i in dish.extras) {
  //       if (dish.extras[i].checked)
  //         totalExtras =
  //           totalExtras +
  //           Number(dish.extras[i].additionalAmount) *
  //             Number(dish.extras[i].quantity);
  //     }

  //     const total =
  //       Number(dish.dishQuantity) *
  //       (Number(dish.price) +
  //         Number(dish.selectedSize.additionalAmount) +
  //         Number(totalExtras));

  //     props.setCart((prevState) => {
  //       prevState.dishes[i].total = total;
  //       window.localStorage.setItem("wdCart", JSON.stringify(prevState));
  //       return prevState;
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  const handleDishSelect = (d) => {
    props.setSelectedDish(d);
    props.setOpenDishModal(true);
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
      <Slide
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
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5.8px)",
            "-webkit-backdrop-filter": "blur(5.8px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            sx={style}
            //   onClick={() => {
            //     if (props.cart && props.cart.dishes && props.cart.dishes.length)
            //       return;
            //     props.close();
            //   }}
          >
            <Box>
              <AppBar
                elevation={0.4}
                position="fixed"
                color="inherit"
                sx={{
                  top: "0",
                  p: 2,
                  px: 3,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8.8px)",
                  "-webkit-backdrop-filter": "blur(8.8px)",
                }}
              >
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={3} textAlign="left">
                    {/* <Typography textAlign="right"> */}
                    <Icon onClick={props.close} sx={{ cursor: "pointer" }}>
                      arrow_back
                    </Icon>
                    {/* </Typography> */}
                  </Grid>
                  {props.cart &&
                  props.cart.dishes &&
                  props.cart.dishes.length ? (
                    <Grid item xs={9}>
                      <Box
                        display="flex"
                        textAlign="right"
                        justifyContent="flex-end"
                      >
                        <Icon
                          color="error"
                          sx={{ cursor: "pointer" }}
                          onClick={clearBasket}
                        >
                          delete_outlined
                        </Icon>{" "}
                        <Typography
                          color="error"
                          sx={{ cursor: "pointer" }}
                          onClick={clearBasket}
                        >
                          Clear basket
                        </Typography>
                      </Box>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </AppBar>
              <Toolbar sx={{ backgroundColor: "transparent", mb: 1.5 }} />
            </Box>
            {props.cart && props.cart.dishes && props.cart.dishes.length ? (
              <>
                <Box sx={{ ...cardStyle }}>
                  <Box>
                    <Box py={1} mt={1}>
                      {props.cart.dishes.map((d, i) => (
                        <Box key={i}>
                          <Grid container spacing={1}>
                            <Grid
                              item
                              xs={2.5}
                              onClick={() => handleDishSelect(d)}
                            >
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
                            <Grid
                              item
                              xs={9}
                              onClick={() => handleDishSelect(d)}
                            >
                              <Box>
                                <Typography>
                                  {d.name} ('{d.selectedSize.size}')
                                </Typography>

                                {d.extras.map(
                                  (e, i) =>
                                    e.checked && (
                                      <Typography variant="body2">
                                        +{e.quantity} {e.item}
                                      </Typography>
                                    )
                                )}
                              </Box>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
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
                                      <Typography
                                        variant="body2"
                                        fontWeight={600}
                                      >
                                        GHC{d.price - d.price * props.discount}
                                      </Typography>
                                    }
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <Box
                                    sx={{
                                      width: "100%",

                                      borderRadius: "12px",
                                      // alignItems: "center",
                                      // justifyContent: "center",
                                      // height: "100%",
                                      px: 1,
                                      py: 1,
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
                                      alignItems="center"
                                    >
                                      <Grid
                                        item
                                        sx={{ cursor: "pointer" }}
                                        xs={2}
                                        onClick={() => {
                                          props.setCart((prevState) => {
                                            if (d.dishQuantity === 1) {
                                              prevState.dishes.splice(i, 1);
                                            } else {
                                              prevState.dishes[i].dishQuantity =
                                                d.dishQuantity - 1;
                                            }
                                            window.localStorage.setItem(
                                              "wdCart",
                                              JSON.stringify({ ...prevState })
                                            );
                                            return { ...prevState };
                                          });
                                        }}
                                      >
                                        <Box
                                          display="flex"
                                          boxSizing="border-box"
                                          justifyContent="center"
                                        >
                                          <Icon
                                            fontSize="small"
                                            color="primary"
                                          >
                                            {props.cart.dishes[i]
                                              .dishQuantity === 1
                                              ? "delete_outlined"
                                              : "remove"}
                                          </Icon>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={8}>
                                        <Typography textAlign="center">
                                          {d.dishQuantity}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        sx={{ cursor: "pointer" }}
                                        item
                                        xs={2}
                                        onClick={() => {
                                          props.setCart((prevState) => {
                                            prevState.dishes[i].dishQuantity =
                                              d.dishQuantity + 1;
                                            window.localStorage.setItem(
                                              "wdCart",
                                              JSON.stringify({ ...prevState })
                                            );
                                            return { ...prevState };
                                          });
                                        }}
                                      >
                                        <Box
                                          display="flex"
                                          boxSizing="border-box"
                                          justifyContent="center"
                                        >
                                          <Icon
                                            fontSize="small"
                                            color="primary"
                                          >
                                            add
                                          </Icon>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={3.5}></Grid>
                          </Grid>
                          {i === props.cart.dishes.length - 1 ? (
                            ""
                          ) : (
                            <Divider />
                          )}
                        </Box>
                      ))}
                    </Box>
                    <Divider />
                    <Box
                      display="flex"
                      py={1}
                      onClick={props.close}
                      sx={{ cursor: "pointer" }}
                    >
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
                    px: 0.5,
                  }}
                >
                  <Box py={1}>
                    <DeliveryPickupToggle
                      cart={props.cart}
                      setCart={props.setCart}
                    />
                    <Paper
                      component="form"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 1,
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <Icon>location_on</Icon>
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Street address"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                    </Paper>
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
                  {props.cartTotal && props.discount ? (
                    <Box py={1}>
                      <Grid container py={0.5} justifyContent="space-between">
                        <Grid item xs={6}>
                          <Typography>
                            {props.discount * 100}% discount
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography textAlign="right">
                            -GHC{(props.cartTotal * props.discount).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container py={0.5} justifyContent="space-between">
                        <Grid item xs={6}>
                          <Typography fontWeight="bold">Subtotal</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography textAlign="right" fontWeight="bold">
                            GHC
                            {(
                              props.cartTotal -
                              props.cartTotal * props.discount
                            ).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                      {props.cart.deliveryMode &&
                      props.cart.deliveryMode === "delivery" ? (
                        <Grid container py={0.5} justifyContent="space-between">
                          <Grid item xs={6}>
                            <Typography>Rider tip</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography textAlign="right">
                              GHC{props.cart.riderTip ? props.cart.riderTip : 0}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        ""
                      )}

                      {props.cart.deliveryMode &&
                      props.cart.deliveryMode === "delivery" ? (
                        <Grid container py={0.5} justifyContent="space-between">
                          <Grid item xs={6}>
                            <Typography>Delivery fee</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography textAlign="right">
                              GHC
                              {props.cart.deliveryFee
                                ? props.cart.deliveryFee.toFixed(2)
                                : 0}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        ""
                      )}
                      <Divider sx={{ my: 1 }} />
                      <Grid container py={0.5} justifyContent="space-between">
                        <Grid item xs={6}>
                          <Typography fontWeight="bold">Total</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontWeight="bold" textAlign="right">
                            GHC
                            {(
                              props.cartTotal -
                              props.cartTotal * props.discount +
                              (props.cart.riderTip ? props.cart.riderTip : 0) +
                              (props.cart.deliveryFee
                                ? props.cart.deliveryFee
                                : 0)
                            ).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>

                <Box
                  sx={{
                    ...cardStyle,
                    mb: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Box py={1}>
                    <ActionButton
                      fontWeight="bold"
                      text={
                        <Typography fontWeight="bold" textAlign="center">
                          Place order GHC
                          {(
                            props.cartTotal -
                            props.cartTotal * props.discount +
                            (props.cart.riderTip ? props.cart.riderTip : 0) +
                            (props.cart.deliveryFee
                              ? props.cart.deliveryFee
                              : 0)
                          ).toFixed(2)}
                        </Typography>
                      }
                      my={0}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                bgcolor="transparent"
                height="80vh"
                onClick={() => {
                  if (
                    props.cart &&
                    props.cart.dishes &&
                    props.cart.dishes.length
                  )
                    return;
                  props.close();
                }}
              >
                <Box
                  sx={{
                    ...cardStyle,
                  }}
                >
                  <Subtitle title="Your basket is empty!" textAlign="center" />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default Basket;
