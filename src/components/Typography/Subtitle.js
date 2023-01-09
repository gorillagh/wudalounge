import { Box, Typography } from "@mui/material";
import React from "react";

const Subtitle = (props) => {
  return (
    <Box mt={3} mb={2} textAlign={props.textAlign} {...props}>
      <Typography variant="h5" fontWeight={props.fontWeight} {...props}>
        {props.title} {props.chip}
      </Typography>
    </Box>
  );
};
Subtitle.defaultProps = {
  title: "Sub Title",
  fontWeight: 500,
};

export default Subtitle;
