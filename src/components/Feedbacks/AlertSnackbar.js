import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const AlertSnackbar = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.onClose();
  };
  return (
    <Slide direction="down" in={props.open}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        autoHideDuration={props.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.severity}
          sx={{ width: "70%" }}
          variant={props.variant}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </Slide>
  );
};

AlertSnackbar.defaultProps = {
  variant: "standard",
  severity: "info",
  autoHideDuration: 3000,
};

export default AlertSnackbar;
