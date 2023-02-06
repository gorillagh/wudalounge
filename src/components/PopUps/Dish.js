import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { v4 as uuid } from "uuid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import {
  AppBar,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Drawer,
  Fade,
  FormControlLabel,
  Grid,
  Icon,
  InputBase,
  Slide,
  Toolbar,
  Zoom,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import DishSizeCard from "../Cards/DishSizeCard";
import DishExtrasCard from "../Cards/DishExtrasCard";
import { changeFavorites, updateUser } from "../../serverFunctions/user";

const style = {
  position: "absolute",
  bottom: 0,
  top: "auto",
  left: { md: "25%" },
  maxHeight: "80vh",
  overflowY: "scroll",
  width: { xs: "100%", md: "50%" },
  boxShadow: "0 4px 30px rgba(0, 0, 0, 1)",
  borderTopRightRadius: "12px",
  borderTopLeftRadius: "12px",
  boxSizing: "border-box",
  zIndex: 99,
  background: "transparent",
};

const Dish = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [kitchenNotes, setKitchenNotes] = useState("");
  const [inCart, setInCart] = useState(false);
  const [numberIncart, setNumberIncart] = useState(0);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const dispatch = useDispatch();

  const containerRef = React.useRef(null);

  useEffect(() => {
    setNumberIncart(0);
    let numberIn = 0;
    if (props.dish && props.dish.kitchenNotes)
      setKitchenNotes(props.dish.kitchenNotes);

    props.cart &&
      props.cart.dishes &&
      props.cart.dishes.length &&
      props.cart.dishes.map((d, i) => {
        if (props.dish && props.dish._id === d._id) {
          setInCart(true);
          numberIn += props.cart.dishes[i].dishQuantity;
        }
      });
    setNumberIncart(numberIn);
  }, [props.open]);

  useEffect(() => {
    console.log(props.dish);
    calculateTotalAmount(props.dish);
  }, [props.dish]);

  const calculateTotalAmount = async (dish) => {
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

      setTotalAmount(total);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.dish.dishIdInCart) {
      props.cart &&
        props.cart.dishes &&
        props.cart.dishes.map((d, i) => {
          if (d.dishIdInCart === props.dish.dishIdInCart) {
            props.setCart((prevState) => {
              prevState.dishes[i] = {
                ...props.dish,
                kitchenNotes,
              };
              window.localStorage.setItem(
                "wdCart",
                JSON.stringify({ ...prevState })
              );
              return { ...prevState };
            });
          }
        });
      props.setAlertSnackbar({
        open: true,
        text: `Basket updated`,
        severity: "success",
      });
    } else {
      props.setCart((prevState) => {
        prevState.dishes
          ? prevState.dishes.push({
              ...props.dish,
              dishIdInCart: uuid(),
              kitchenNotes,
            })
          : (prevState = {
              dishes: [{ ...props.dish, dishIdInCart: uuid(), kitchenNotes }],
              deliveryMode: "delivery",
            });

        window.localStorage.setItem("wdCart", JSON.stringify({ ...prevState }));
        return { ...prevState };
      });
      props.setAlertSnackbar({
        open: true,
        text: `${props.dish.dishQuantity} "${props.dish.name}" added to basket`,
        severity: "success",
      });
    }

    props.setDish({});
    setKitchenNotes("");

    props.onClose();
  };

  const handleRemoveDish = (dish) => {
    let toDelete = [];
    props.cart &&
      props.cart.dishes &&
      props.cart.dishes.length &&
      props.cart.dishes.map((d, i) => {
        if (d._id === dish._id) toDelete.push(i);
      });

    if (
      props.cart &&
      props.cart.dishes &&
      props.cart.dishes.length &&
      toDelete.length === props.cart.dishes.length
    ) {
      props.setCart({});
      window.localStorage.removeItem("wdCart");
    } else {
      props.setCart((prevState) => {
        for (var i = toDelete.length - 1; i >= 0; i--)
          prevState.dishes.splice(toDelete[i], 1);

        window.localStorage.setItem("wdCart", JSON.stringify({ ...prevState }));

        return { ...prevState };
      });
    }
    props.setAlertSnackbar({
      open: true,
      text: `"${props.dish.name}" removed from basket`,
      severity: "warning",
    });
    props.onClose();
  };

  const handleAddToFavorites = async (e) => {
    setFavoritesLoading(true);
    if (props.user && props.user._id) {
      let favorites = [...props.user.favorites] || [];
      let snackbarText = "";

      if (favorites.includes(props.dish._id) === false && e.target.checked) {
        favorites.push(props.dish._id);
        snackbarText = `"${props.dish.name}" added to favorites`;
      }

      if (favorites.includes(props.dish._id) === true && !e.target.checked) {
        favorites.map((f, i) => {
          if (f === props.dish._id) favorites.splice(i, 1);
        });
        snackbarText = `"${props.dish.name}" removed from favorites`;
      }

      await updateUser(props.user._id, { favorites })
        .then((res) => {
          let userInfo = {
            _id: res.data._id,
            phoneNumber: res.data.phoneNumber,
            name: res.data.name,
            email: res.data.email ? res.data.email : "",
            addresses: res.data.addresses ? res.data.addresses : [],
            role: res.data.role,
            token: props.user.token,
            favorites: res.data.favorites ? res.data.favorites : [],
          };
          props.setUser({ ...userInfo });
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { ...userInfo },
          });
          window.localStorage.setItem(
            "wdUser",
            JSON.stringify({ ...userInfo })
          );
          setFavoritesLoading(false);
          props.setAlertSnackbar({
            open: true,
            text: snackbarText,
            severity: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          setFavoritesLoading(false);
        });
    }
  };
  return (
    <Modal
      closeAfterTransition={true}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slots={{
        backdrop: () => (
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100%",
            }}
            onClick={props.onClose}
          />
        ),
      }}
      ref={containerRef}
      {...props}
      sx={{ width: { md: "60%" }, left: { md: "20%" } }}
    >
      <Slide
        container={containerRef.current}
        appear={true}
        direction="up"
        in={props.open}
        mountOnEnter
        unmountOnExit
        // timeout={300}
      >
        <Box sx={style}>
          <Box sx={{ position: "absolute", top: "3%" }}>
            <Icon
              onClick={props.onClose}
              sx={{
                position: "fixed",
                right: { xs: "3%", md: "37.5%" },
                color: "gray",
                bgcolor: "#fff",
                p: 0,
                borderRadius: "50%",
                zIndex: 4,
                cursor: "pointer",
              }}
            >
              highlight_off
            </Icon>
          </Box>
          <Box
            sx={{
              border: "0.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.9)",
              // backdropFilter: "blur(8.8px)",
              WebkitBackdropFilter: "blur(8.8px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              webkitBackdropFilter: "blur(8.8px)",
            }}
          >
            <Box>
              <img
                style={{
                  borderTopRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  height: "100%",
                }}
                alt={props.dish.name}
                width="100%"
                src={props.dish.image}
              />

              <Box px={2} py={1}>
                <PageTitle
                  mt={0}
                  mb={1}
                  title={props.dish.name}
                  fontWeight={700}
                  rightIcon={
                    // props.user && props.user._id ? (
                    <FormControlLabel
                      onClick={() => {
                        if (props.user && props.user._id) return;
                        props.setAlertSnackbar({
                          open: true,
                          text: (
                            <Typography
                              variant="body2"
                              color="info.main"
                              onClick={() => {
                                props.setAlertSnackbar({ status: false });
                                props.setOpenPhoneNumber(true);
                              }}
                            >
                              Sign in{" "}
                              <Typography
                                variant="body2"
                                component="span"
                                color="text.primary"
                              >
                                to enable add to favorites
                              </Typography>
                            </Typography>
                          ),
                          severity: "error",
                        });
                      }}
                      sx={{ ml: 0 }}
                      control={
                        favoritesLoading ? (
                          <CircularProgress size={20} sx={{ ml: 1 }} />
                        ) : (
                          <Checkbox
                            disabled={
                              props.user && props.user._id ? false : true
                            }
                            checked={
                              props.user &&
                              props.user.favorites &&
                              props.user.favorites.includes(props.dish._id)
                            }
                            onChange={handleAddToFavorites}
                            icon={<Icon>favorite_border</Icon>}
                            checkedIcon={<Icon>favorite</Icon>}
                          />
                        )
                      }
                    />
                    // ) : (
                    //   ""
                    // )
                  }
                />
                {props.discount && props.discount > 0 ? (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      py: 1,
                      mr: 1,
                      textDecoration: "line-through",
                    }}
                    component="span"
                    color="text.secondary"
                  >
                    GHC{props.dish.price}
                  </Typography>
                ) : (
                  ""
                )}

                <Chip
                  label={
                    <Typography fontWeight={600}>
                      GHC
                      {props.dish.price - props.dish.price * props.discount}
                    </Typography>
                  }
                  color="secondary"
                />
                <Typography
                  my={0.5}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="text.secondary"
                >
                  {props.dish.description}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/*/////////////////////// Sizes /////////////////////////*/}
          {props.dish && props.dish.sizes && props.dish.sizes.length > 0 && (
            <Box
              sx={{
                px: 2,
                py: 1,
                my: 1,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                // backdropFilter: "blur(8.8px)",
                WebkitBackdropFilter: "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(8.8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Subtitle
                my={1}
                title="Choose Size"
                fontWeight={700}
                chip={
                  <Chip
                    label="Required"
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: 300 }}
                  />
                }
              />
              <DishSizeCard
                dish={props.dish}
                discount={props.discount}
                setDish={props.setDish}
              />
            </Box>
          )}

          {/*////////////////////// Extras /////////////////////*/}
          {props.dish && props.dish.extras && props.dish.extras.length > 0 && (
            <Box
              sx={{
                px: 2,
                py: 1,
                my: 1,
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                // backdropFilter: "blur(8.8px)",
                WebkitBackdropFilter: "blur(8.8px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(8.8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Subtitle my={1} title="Extras" fontWeight={700} />
              <DishExtrasCard
                dish={props.dish}
                discount={props.discount}
                setDish={props.setDish}
              />
            </Box>
          )}

          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8.8px)",
              WebkitBackdropFilter: "blur(8.8px)",
              px: 2,
              py: 1,
              borderTopRightRadius: "12px",
              borderTopLeftRadius: "12px",
            }}
          >
            <InputBase
              fullWidth
              multiline
              placeholder="Leave a note for the kitchen"
              inputProps={{ "aria-label": "search google maps" }}
              value={kitchenNotes}
              onChange={(e) => setKitchenNotes(e.target.value)}
            />
          </Box>

          <>
            <AppBar
              position="fixed"
              color="inherit"
              sx={{
                top: "auto",
                bottom: 0,
                p: 1,
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8.8px)",
                WebkitBackdropFilter: "blur(8.8px)",
                width: { md: "60%" },
                left: { md: "20%" },
              }}
            >
              {numberIncart && numberIncart > 0 && !props.dish.dishIdInCart ? (
                <Box p={1} display={"flex"} alignItems="center">
                  <Icon
                    fontSize="small"
                    color="error"
                    onClick={() => handleRemoveDish(props.dish)}
                    sx={{ cursor: "pointer" }}
                  >
                    delete_outlined
                  </Icon>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={400}
                    color="error"
                    mr={0.5}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRemoveDish(props.dish)}
                  >
                    Remove
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={400}
                    color="info"
                  >
                    {numberIncart} from basket.
                  </Typography>
                </Box>
              ) : (
                ""
              )}

              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={5}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      borderRadius: "12px",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.3)",
                      height: "100%",
                      borderColor: "rgba(0, 0, 0, 0.4)",
                      px: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid
                        item
                        xs={2}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          if (props.dish.dishQuantity === 1) return;
                          props.setDish((prevState) => {
                            prevState = {
                              ...prevState,
                              dishQuantity: prevState.dishQuantity - 1,
                            };
                            return { ...prevState };
                          });
                        }}
                      >
                        <Box
                          display="flex"
                          boxSizing="border-box"
                          justifyContent="center"
                        >
                          <Icon color="primary">remove</Icon>
                        </Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="h4"
                          textAlign="center"
                          fontWeight={500}
                        >
                          {props.dish.dishQuantity}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          props.setDish((prevState) => {
                            prevState = {
                              ...prevState,
                              dishQuantity: prevState.dishQuantity
                                ? prevState.dishQuantity + 1
                                : 2,
                            };

                            return { ...prevState };
                          })
                        }
                      >
                        <Box
                          display="flex"
                          boxSizing="border-box"
                          justifyContent="center"
                        >
                          <Icon color="primary">add</Icon>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <ActionButton
                    onClick={handleSubmit}
                    py={0.5}
                    my={0}
                    text={
                      <Box>
                        <Typography variant="body1" fontWeight={700} p={0}>
                          {props.dish.dishIdInCart ? "Update" : "Add"}
                        </Typography>
                        <Typography variant="body1" fontWeight={700} p={0}>
                          GHC
                          {totalAmount -
                            (totalAmount * props.discount).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </AppBar>
            <Toolbar
              sx={{ py: numberIncart > 0 && !props.dish.dishIdInCart ? 3 : 1 }}
            />
          </>
        </Box>
      </Slide>
    </Modal>
  );
};

export default Dish;
