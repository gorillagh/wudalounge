import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import { updateUser } from "../../serverFunctions/user";

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
const cardStyle = {
  p: 2,

  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  // boxShadow: "0.5px 1px 0px rgba(0, 0, 0, 0.2)",

  webkitBackdropFilter: "blur(5px)",
  //   border: "1px solid rgba(255, 255, 255, 0.3)",
};

const Favorites = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleDishSelect = (favoriteDish) => {
    props.setSelectedDish({ ...favoriteDish, dishQuantity: 1 });
    props.setOpenDishModal(true);
  };

  const handleOrderNow = (favoriteDish) => {
    let cart = {
      dishes: [favoriteDish],
      deliveryMode: "delivery",
      riderTip: 0,
      notes: "",
      paymentMethod: "cashless",
    };
    if (props.cart && props.cart.dishes) {
      if (window.confirm("Clear basket and order for this one?")) {
        props.setCart({ ...cart });
        window.localStorage.setItem("wdCart", JSON.stringify({ ...cart }));
        props.setOpenBasket(true);
      } else {
        return;
      }
    } else {
      props.setCart({ ...cart });
      window.localStorage.setItem("wdCart", JSON.stringify({ ...cart }));
      props.setOpenBasket(true);
    }
  };

  const handleRemoveFromFavorites = async (favoriteDish, favoriteDishIndex) => {
    setLoading(true);
    let favorites = props.favorites.map((f, i) => f._id);
    if (favoriteDishIndex > -1) {
      // only splice array when item is found
      favorites.splice(favoriteDishIndex, 1);
    }
    await updateUser(props.user._id, { favorites })
      .then((res) => {
        let userInfo = {
          _id: res.data._id,
          phoneNumber: res.data.phoneNumber,
          name: res.data.name,
          email: res.data.email ? res.data.email : "",
          addresses: res.data.addresses ? res.data.addresses : [],
          image: res.data.image ? res.data.image : "",
          role: res.data.role,
          token: props.user.token,
          favorites: res.data.favorites ? res.data.favorites : [],
        };
        props.setUser({ ...userInfo });
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { ...userInfo },
        });
        window.localStorage.setItem("wdUser", JSON.stringify({ ...userInfo }));
        setLoading(false);
        props.setAlertSnackbar({
          open: true,
          text: `${favoriteDish.name} removed from favorites`,
          severity: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // const fetchUserFavorites = async () => {
  //   try {
  //     setLoading(true);
  //     props.user.favorites && props.user.favorites.map((favorite, index)=>{

  //     })
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  //   //
  // };
  // useEffect(() => {
  //   fetchUserFavorites();
  // }, []);
  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        // hideBackdrop
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
          //   timeout={300}
        >
          <Box
            onClick={(e) => {
              if (e.currentTarget !== e.target) return;
              props.close();
            }}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="My Favorites" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              {props.favorites && props.favorites.length ? (
                props.favorites.map((favorite, index) => (
                  <Box key={index} sx={{ ...cardStyle }}>
                    <Grid container>
                      <Grid
                        item
                        xs={5}
                        onClick={() => handleDishSelect(favorite)}
                      >
                        {/* <Box
                          display="flex"
                          // width="100%"
                          alignItems="center"
                          sx={{
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        > */}
                        <img
                          src={favorite.image}
                          alt="favorite"
                          width="100%"
                          // height="100%"
                          style={{
                            borderRadius: "12px",
                          }}
                        />
                        {/* </Box> */}
                      </Grid>
                      <Grid item xs={7}>
                        <Box
                          display="flex"
                          justifyContent="left"
                          flexDirection="column"
                          // alignItems="center"
                          ml={1}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Typography
                              fontWeight={500}
                              onClick={() => handleDishSelect(favorite)}
                            >
                              {favorite.name}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleRemoveFromFavorites(favorite, index)
                              }
                            >
                              <Icon sx={{ fontSize: "1rem" }} color="error">
                                delete_outlined
                              </Icon>
                            </IconButton>
                          </Box>
                          <Typography
                            variant="body2"
                            my={1}
                            mr={2}
                            onClick={() => handleDishSelect(favorite)}
                          >
                            {favorite.description}
                          </Typography>
                          <Box
                            display="flex"
                            onClick={() => handleDishSelect(favorite)}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                // py: 1,
                                // mr: 1,
                                textDecoration:
                                  props.discount &&
                                  props.discount > 0 &&
                                  "line-through",
                              }}
                              variant="body2"
                              component="span"
                              color="text.secondary"
                            >
                              GHC{favorite.price}
                            </Typography>

                            <Typography ml={1} variant="body2" fontWeight={600}>
                              GHC
                              {favorite.price - favorite.price * props.discount}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box display="flex" mt={2} justifyContent="space-between">
                      <ActionButton
                        text="Add to basket"
                        variant="outlined"
                        fullWidth={false}
                        size="small"
                        my={0}
                        onClick={() => handleDishSelect(favorite)}
                      />
                      <ActionButton
                        size="small"
                        fullWidth={false}
                        text="Order now"
                        my={0}
                        onClick={() => handleOrderNow(favorite)}
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary" textAlign="center" my={3}>
                  Empty
                </Typography>
              )}
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Favorites;
