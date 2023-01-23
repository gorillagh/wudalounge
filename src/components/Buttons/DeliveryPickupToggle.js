import * as React from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
    textTransform: "none",
    padding: 5,

    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected": {
      fontWeight: "bold",

      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      backgroundColor: theme.palette.highlight,
      color: theme.palette.primary.main,
      borderRadius: 50,
      "&:hover": {
        backgroundColor: theme.palette.highlight,
      },
    },
    "&:not(:first-of-type)": {
      margin: 3,
      borderRadius: 50,
    },
    "&:first-of-type": {
      borderRadius: 50,
      margin: 3,
    },
  },
}));

const DeliveryPickupToggle = (props) => {
  const handleDelivery = (event, value) => {
    if (value !== null && value !== props.cart.deliveryMode) {
      props.setCart((prevState) => {
        prevState.deliveryMode = value;
        window.localStorage.setItem("wdCart", JSON.stringify({ ...prevState }));
        return { ...prevState };
      });
    }
  };

  return (
    <Box
      sx={{
        p: 0.2,
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
        borderRadius: "25px",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8.8px)",
        WebkitBackdropFilter: "blur(8.8px)",
        boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
      }}
      {...props}
    >
      <StyledToggleButtonGroup
        fullWidth
        size="large"
        value={props.cart.deliveryMode}
        defaultChecked="delivery"
        exclusive
        onChange={handleDelivery}
        aria-label="delivery mode"
      >
        <ToggleButton value="delivery" aria-label="delivery mode">
          Delivery
        </ToggleButton>

        <ToggleButton value="pickup" aria-label="pick up mode">
          Pickup
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default DeliveryPickupToggle;
