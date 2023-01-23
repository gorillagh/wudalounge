import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  AppBar,
  Chip,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
const tips = [
  { label: "GHC0", value: 0 },
  { label: "GHC1", value: 1 },
  { label: "GHC2", value: 2 },
  { label: "GHC5", value: 5 },
  { label: "GHC10", value: 10 },
];
const Basket = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDish, setSelectedDish] = useState({});
  const [selectedTip, setSelectedTip] = useState(null);
  const [notes, setNotes] = useState("");

  const containerRef = React.useRef(null);

  useEffect(() => {
    props.cart && props.cart.riderTip
      ? setSelectedTip(props.cart.riderTip)
      : setSelectedTip(0);

    props.cart &&
      props.cart.dishes &&
      props.cart.dishes.length &&
      props.cart.dishes.map((d, i) => {
        calculateTotalAmount(d, i);
      });
  }, [props.cart]);

  const calculateTotalAmount = async (dish, index) => {
    if (dish && dish.extras) {
      let totalExtras = 0;
      for (var i in dish.extras) {
        if (dish.extras[i].checked)
          totalExtras =
            totalExtras +
            Number(dish.extras[i].additionalAmount) *
              Number(dish.extras[i].quantity);
      }

      const total =
        Number(dish.dishQuantity) *
        (Number(dish.price) +
          Number(dish.selectedSize.additionalAmount) +
          Number(totalExtras));

      props.setCart((prevState) => {
        prevState.dishes[index].total = total;
        window.localStorage.setItem("wdCart", JSON.stringify(prevState));
        return prevState;
      });
    }
  };

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
                {/* ///////////////////////////////Basket Items section///////////////////////////////////// */}
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
                            <Grid item xs={9.5}>
                              <Box onClick={() => handleDishSelect(d)}>
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
                              <Grid container mt={1} alignItems="flex-end">
                                <Grid item xs={5}>
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
                                <Grid item xs={7}>
                                  {d.total ? (
                                    <Box
                                      display="flex"
                                      justifyContent="right"
                                      alignItems="flex-end"
                                    >
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
                                          GHC{d.total}
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
                                            GHC
                                            {d.total - d.total * props.discount}
                                          </Typography>
                                        }
                                        color="secondary"
                                      />
                                    </Box>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          {i === props.cart.dishes.length - 1 ? (
                            ""
                          ) : (
                            <Divider sx={{ my: 2 }} />
                          )}
                        </Box>
                      ))}
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                    <Box
                      display="flex"
                      py={2}
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
                        size="small"
                        sx={{ my: 1 }}
                        fullWidth
                        multiline
                        placeholder="Leave a note or comment"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Box>
                {/* //////////////////////////////////////////////////////////////////////////////////// */}

                {/* //////////////////////////Delivery&Contact setion//////////////////////////////////// */}
                <DeliveryPickupToggle
                  cart={props.cart}
                  setCart={props.setCart}
                  mb={1}
                />
                <Box
                  sx={{
                    ...cardStyle,
                  }}
                >
                  {props.user && props.user._id ? (
                    <Box
                      display="flex"
                      py={1}
                      onClick={() => props.setOpenPhoneNumber(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon>person</Icon>
                      <Typography ml={1}>
                        Add contact info{" "}
                        <Typography
                          fontWeight="bold"
                          component="span"
                          color="primary"
                        >
                          *
                        </Typography>
                      </Typography>
                      <Box ml="auto" justifyContent="right">
                        <IconButton
                          sx={{ borderRadius: 0, p: 0 }}
                          size="small"
                          color="info"
                        >
                          <Icon>add</Icon>
                        </IconButton>
                      </Box>
                    </Box>
                  ) : (
                    <Box py={1}>
                      {props.cart &&
                      props.cart.deliveryMode &&
                      props.cart.deliveryMode === "delivery" ? (
                        <>
                          <Box
                            display="flex"
                            py={1}
                            onClick={() => props.setOpenPhoneNumber(true)}
                            sx={{ cursor: "pointer" }}
                          >
                            <Icon fontSize="small">phone</Icon>
                            {/* <Typography ml={1}>
                              {props.user.phoneNumber} ({props.user.name})
                            </Typography> */}
                            <Typography ml={1}>
                              0244234390 (Governor)
                            </Typography>
                            <Box ml="auto" justifyContent="right">
                              <IconButton
                                sx={{ borderRadius: 0, p: 0 }}
                                size="small"
                                color="primary"
                              >
                                <Icon fontSize="small">edit</Icon>
                              </IconButton>
                            </Box>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                        </>
                      ) : (
                        ""
                      )}
                      <Box
                        display="flex"
                        py={1}
                        onClick={() => props.setOpenAddress(true)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Icon fontSize="small">location_on</Icon>
                        <Typography ml={1}>Mimosa St</Typography>
                        <Box ml="auto" justifyContent="right">
                          <IconButton
                            sx={{ borderRadius: 0, p: 0 }}
                            size="small"
                            color="primary"
                          >
                            <Icon fontSize="small">edit</Icon>
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                {/* //////////////////////////////////////////////////////////////////////////////// */}

                {/* ///////////////////////////Tips Section/////////////////////////////////////// */}
                {props.cart.deliveryMode &&
                props.cart.deliveryMode === "delivery" &&
                selectedTip >= 0 ? (
                  <Box
                    sx={{
                      ...cardStyle,
                    }}
                  >
                    <Box py={1} boxSizing="border-box">
                      <Box display="flex" alignItems="center">
                        <Icon fontSize="small" sx={{ mr: 1 }}>
                          volunteer_activism
                        </Icon>
                        <Box>
                          <Typography>Tip the courier?</Typography>

                          <Typography variant="body2">
                            Our couriers appreciate your generosity. They get
                            100% of your tips.
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        mt={1}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          pb: 0,
                          m: 0,
                        }}
                      >
                        {tips.map((tip, index) => (
                          <Chip
                            key={index}
                            label={tip.label}
                            variant={
                              selectedTip === tip.value ? "outlined" : ""
                            }
                            sx={{
                              bgcolor:
                                selectedTip === tip.value
                                  ? "highlight"
                                  : "#fff",
                              fontWeight: selectedTip === tip.value ? 700 : "",
                              color:
                                selectedTip === tip.value ? "primary.main" : "",
                              my: 1,
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  selectedTip === tip.value
                                    ? theme.palette.highlight
                                    : "#fff",
                              },
                            }}
                            onClick={() => {
                              setSelectedTip(tip.value);
                              props.setCart((prevState) => {
                                prevState.riderTip = tip.value;
                                window.localStorage.setItem(
                                  "wdCart",
                                  JSON.stringify(prevState)
                                );
                                return prevState;
                              });
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
                {/* ////////////////////////////////////////////////////////////////////////////// */}

                {/* ////////////////Bill section////////////////////////////////////////////// */}
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
                              (props.cart.deliveryMode === "delivery" &&
                              props.cart.riderTip
                                ? props.cart.riderTip
                                : 0) +
                              (props.cart.deliveryMode === "delivery" &&
                              props.cart.deliveryFee
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
                {/* ////////////////////////////////////////////////////////////////////// */}

                {/* //////////////////////////////Place Order///////////////////////////////////// */}
                <Box
                  sx={{
                    ...cardStyle,
                    mb: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Box py={1}>
                    <Box mb={3}>
                      <Typography>Pay with</Typography>

                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Pay with"
                        value={
                          props.cart.paymentMethod
                            ? props.cart.paymentMethod
                            : "cashless"
                        }
                        onChange={(e) =>
                          props.setCart((prevState) => {
                            prevState.paymentMethod = e.target.value;
                            window.localStorage.setItem(
                              "wdCart",
                              JSON.stringify({ ...prevState })
                            );
                            return { ...prevState };
                          })
                        }
                        size="small"
                        fullWidth
                        sx={{ borderRadius: 5 }}
                      >
                        <MenuItem value="cashless">
                          <Box display="flex" alignItems="center">
                            <Icon sx={{ mr: 1 }} fontSize="small">
                              payments
                            </Icon>
                            <Typography>Card/Mobile money</Typography>
                          </Box>
                        </MenuItem>
                        {/* <MenuItem value="">
                            <Icon sx={{ mr: 1 }} fontSize="small">
                              send_to_mobile
                            </Icon>{" "}
                            Mobile money
                          </MenuItem> */}
                        <MenuItem value="cash">
                          <Box display="flex" alignItems="center">
                            <Icon sx={{ mr: 1 }} fontSize="small">
                              money
                            </Icon>
                            <Typography>Cash</Typography>
                          </Box>
                        </MenuItem>
                      </Select>
                    </Box>
                    <ActionButton
                      fontWeight="bold"
                      text={
                        <>
                          {props.cartTotalLoading ? (
                            <Typography variant="body2" fontWeight={600}>
                              <CircularLoading size={20} thickness={6} />
                            </Typography>
                          ) : (
                            <Typography textAlign="center" fontWeight="bold">
                              Place order GHC
                              {(
                                props.cartTotal -
                                props.cartTotal * props.discount +
                                (props.cart.deliveryMode === "delivery" &&
                                props.cart.riderTip
                                  ? props.cart.riderTip
                                  : 0) +
                                (props.cart.deliveryMode === "delivery" &&
                                props.cart.deliveryFee
                                  ? props.cart.deliveryFee
                                  : 0)
                              ).toFixed(2)}
                            </Typography>
                          )}
                        </>
                      }
                      my={0}
                    />
                  </Box>
                </Box>
                {/* //////////////////////////////////////////////////////////////////////////// */}
              </>
            ) : (
              ////////////////////////Basket Empty//////////////////////////////////////////////
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
