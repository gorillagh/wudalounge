import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";

const ViewBasket = (props) => {
  return (
    <Box>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          top: "auto",
          bottom: 0,
          p: 2,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)",
          width: { md: "60%" },
          left: { md: "20%" },
        }}
      >
        <ActionButton
          onClick={props.onClick}
          disabled={props.cartTotalLoading}
          my={0}
          py={1}
          rightIcon="arrow_forward"
          text={
            <>
              {props.cartTotalLoading ? (
                <Typography variant="body2" fontWeight={600}>
                  <CircularLoading size={20} thickness={6} />
                </Typography>
              ) : (
                <Typography textAlign="center" fontWeight="bold">
                  View basket GHC
                  {props.cartTotal -
                    props.cartTotal * props.discount +
                    (props.cart.deliveryMode &&
                    props.cart.deliveryMode === "delivery" &&
                    props.cart.riderTip
                      ? props.cart.riderTip
                      : 0) +
                    (props.cart.deliveryMode &&
                    props.cart.deliveryMode === "delivery" &&
                    props.cart.deliveryFee
                      ? props.cart.deliveryFee
                      : 0)}{" "}
                </Typography>
              )}
            </>
          }
        />
      </AppBar>
      <Toolbar sx={{ py: 1, position: "fixed" }} />
    </Box>
  );
};

export default ViewBasket;
