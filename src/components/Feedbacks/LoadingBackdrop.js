import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={6}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode = "#E3581C"),
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={6}
        {...props}
      />
    </Box>
  );
}

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
          backgroundColor: "rgba(0,0,0,0.9)",
          color: "primary.dark",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.open}
        // onClick={handleClose}
      >
        <Box sx={{ width: "20%" }}>
          <FacebookCircularProgress color="inherit" />
        </Box>
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
    </div>
  );
};

export default LoadingBackdrop;
