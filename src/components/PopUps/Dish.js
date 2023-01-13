import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import { AppBar, Chip, Grid, Icon, InputBase, Toolbar } from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import DishSizeCard from "../Cards/DishSizeCard";
import DishExtrasCard from "../Cards/DishExtrasCard";

const style = {
  position: "absolute",
  bottom: 0,
  maxHeight: "80vh",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  borderTopRightRadius: "12px",
  borderTopLeftRadius: "12px",
};

const Dish = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [kitchenNotes, setKitchenNotes] = useState("");

  useEffect(() => {
    if (props.dish && props.dish.kitchenNotes)
      setKitchenNotes(props.dish.kitchenNotes);
  });

  useEffect(() => {
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
    let data;
    let extras = [];
    props.dish.extras.map((e, i) => {
      if (e.checked) {
        extras.push({ item: e.item, quantity: e.quantity });
      }
    });
    data = {
      dish: "", //id
      extras,
      size: props.dish.selectedSize.size,
      quantity: props.dish.dishQuantity,
      kitchenNotes,
    };
    console.log(data);
    props.setCart((prevState) => {
      prevState.push({ ...props.dish, kitchenNotes });
      window.localStorage.setItem("wdCart", JSON.stringify([...prevState]));
    });

    props.setDish({});
    setKitchenNotes("");
    props.close();
  };
  return (
    <div>
      {props.dish && (
        <Modal
          onClose={props.close}
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slots={{
            backdrop: () => (
              <div
                style={{
                  backgroundColor: "#000",
                  opacity: 0.8,
                  width: "100%",
                  height: "100%",
                }}
                onClick={props.close}
              />
            ),
          }}
        >
          <Box sx={style}>
            <Box
              sx={{
                borderRadius: "12px",
                background: "rgba(255,255,255, 0.6)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                webkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
              }}
              component="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <Box sx={{ position: "absolute", top: "3%" }}>
                <Icon
                  onClick={props.close}
                  sx={{
                    position: "fixed",
                    right: "3%",
                    color: "gray",
                    bgcolor: "#fff",
                    p: 0,
                    borderRadius: "50%",
                    zIndex: 4,
                  }}
                >
                  {" "}
                  highlight_off
                </Icon>
              </Box>
              <Box sx={{ position: "relative" }}>
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
                  background: "rgba(255,255,255, 0.6)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                  webkitBackdropFilter: "blur(5px)",
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
            {props.dish &&
              props.dish.extras &&
              props.dish.extras.length > 0 && (
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    my: 1,
                    borderRadius: "12px",
                    background: "rgba(255,255,255, 0.6)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                    webkitBackdropFilter: "blur(5px)",
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
                background: "rgba(255,255,255, 0.6)",
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
                sx={{ top: "auto", bottom: 0, p: 1 }}
              >
                <Box
                  px={2}
                  py={1}
                  display={props.cart ? "flex" : "none"}
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={400}
                    color="error"
                    mr={0.5}
                  >
                    Remove Dish
                  </Typography>
                  <Icon fontSize="small" color="error">
                    delete_outlined
                  </Icon>
                </Box>

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
                      <Grid container justifyContent="space-evenly">
                        <Grid
                          item
                          xs={2}
                          onClick={() => {
                            if (props.dish.dishQuantity === 1) return;
                            props.setDish((prevState) => {
                              prevState = {
                                ...prevState,
                                dishQuantity: prevState.dishQuantity - 1,
                              };
                              console.log(prevState.dishQuantity);
                              return { ...prevState };
                            });
                          }}
                        >
                          <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight={400}
                            color="primary"
                          >
                            -
                          </Typography>
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
                          <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight={400}
                            color="primary"
                          >
                            +
                          </Typography>
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
                            Add
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
              <Toolbar sx={{ py: props.cart ? 3 : 1 }} />
            </>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Dish;
