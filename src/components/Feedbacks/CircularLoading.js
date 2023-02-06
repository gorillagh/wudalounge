import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const CircularLoading = (props) => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* <CircularProgress
        variant="determinate"
        sx={{
          color: "#f6a60b",
        }}
        size={40}
        thickness={6}
        {...props}
        value={100}
      /> */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#E3581C",
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
};

export default CircularLoading;
