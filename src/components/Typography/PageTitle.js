import { Box, Typography } from "@mui/material";
import React from "react";

const PageTitle = (props) => {
  return (
    <Box mt={3} mb={2} textAlign={props.textAlign} {...props}>
      <Typography variant={props.variant} fontWeight={700}>
        {props.title}
        {props.rightIcon}
      </Typography>
    </Box>
  );
};
PageTitle.defaultProps = {
  title: "Page Title",
  variant: "h4",
};

export default PageTitle;
