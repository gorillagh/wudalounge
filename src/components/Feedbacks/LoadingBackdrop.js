import React from "react";
import Backdrop from "@mui/material/Backdrop";

import { Box } from "@mui/material";
import CircularLoading from "./CircularLoading";

const LoadingBackdrop = (props) => {
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleToggle = () => {
  //     setOpen(!open);
  //   };

  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "primary.dark",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.open}
      >
        <Box sx={{ width: "11%" }}>
          <CircularLoading color="inherit" />
        </Box>
      </Backdrop>
    </div>
  );
};

export default LoadingBackdrop;
