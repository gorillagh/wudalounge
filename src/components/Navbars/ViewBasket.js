import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";
import loadingSpinner from "../../images/loadingSpinner.svg";

const ViewBasket = (props) => {
  const [loading, setLoading] = useState(false);
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
          // onClick={props.onClick}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              // Step 5: Update loading state to false
              setLoading(false);

              // Step 7: Display modal content
              props.setOpenBasket(true);
            }, 1000);
          }}
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
                <>
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
                  {loading ? (
                    <img
                      style={{ height: "25px", width: "25px" }}
                      src={loadingSpinner}
                      alt="loading-spinner"
                      width="100%"
                    />
                  ) : (
                    ""
                  )}
                </>
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
