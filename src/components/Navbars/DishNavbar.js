import React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShowOnScroll from "./ShowOnScroll";
import { Container } from "@mui/material";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    padding: 0,
    margin: 0,
    maxWidth: 60,
    width: "100%",
    backgroundColor: "#E3581C",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1),

    color: "#000",
    "&.Mui-selected": {
      color: "#E3581C",
    },
    // "&.Mui-focusVisible": {
    //   backgroundColor: "rgba(100, 95, 228, 0.32)",
    // },
  })
);

const DishNavbar = (props) => {
  return (
    <ShowOnScroll {...props}>
      <Container
        maxWidth="xl"
        sx={{
          position: "fixed",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8.8px)",
          "-webkit-backdrop-filter": "blur(8.8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          // backdropFilter: "blur(7.8px)",
          //   "-webkit-backdrop-filter": "blur(8.8px)",
          zIndex: 5,
          width: { md: "60%" },
        }}
      >
        <StyledTabs
          textColor="inherit"
          value={props.scrollTabValue}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          onChange={(e, v) => {
            props.setScrollTabValue(v);
            var scrollDiv = window.document.getElementById(v).offsetTop;
            window.scrollTo({ top: scrollDiv - 130, behavior: "smooth" });
          }}
        >
          <StyledTab label="Pork" />
          <StyledTab label="Chicken" />
          <StyledTab label="Tilapia" />
          <StyledTab label="Drinks" />
          <StyledTab label="Special Picks" />
        </StyledTabs>
      </Container>
    </ShowOnScroll>
  );
};

export default DishNavbar;
