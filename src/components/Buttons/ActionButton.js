import React from "react";
import Button from "@mui/material/Button";
import { Icon } from "@mui/material";

const ActionButton = (props) => {
  return (
    <Button
      type={props.type}
      fullWidth
      variant={props.variant}
      color={props.color}
      size={props.size}
      onClick={props.onClick}
      sx={{
        fontWeight: "bold",
        my: props.my,
        py: props.py,
        borderRadius: 5,
        textTransform: "capitalize",
        color: props.variant !== "contained" ? "" : "#fff",
        backgroundColor: props.backgroundColor,
        boxShadow: "0.5px 1px 0px rgba(0, 0, 0, 0.2)",

        // position: "relative",
        // backgroundImage: "linear-gradient(#b64616,#E3581C)",
        // "&:after": {
        //   borderRadius: "12px",
        //   content: '""',
        //   position: "absolute",
        //   top: "2px",
        //   left: "2px",
        //   width: "calc(100% - 4px)",
        //   height: "50%",
        //   background:
        //     "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
        // },
        // "&:hover": {
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        // },
      }}
      {...props}
    >
      {props.leftIcon && props.leftIcon.length && (
        <Icon sx={{ mr: 1 }} fontSize="small">
          {props.leftIcon}
        </Icon>
      )}{" "}
      {props.text}{" "}
      {props.rightIcon && props.rightIcon.length && (
        <Icon sx={{ ml: 1 }} fontSize="small">
          {props.rightIcon}
        </Icon>
      )}
    </Button>
  );
};

ActionButton.defaultProps = {
  my: 3,
  variant: "contained",
  color: "primary",
  size: "large",
  onClick: () => {
    console.log("Button Clicked");
  },
};

export default ActionButton;
