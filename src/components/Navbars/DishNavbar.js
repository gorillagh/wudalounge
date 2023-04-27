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
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(13.5),
    marginRight: theme.spacing(0),
    color: "#000",
    "&.Mui-selected": {
      color: theme.palette.primary.main,
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
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          // backdropFilter: "blur(7.8px)",
          zIndex: 5,
          width: { md: "60%" },
        }}
      >
        <StyledTabs
          textColor="inherit"
          value={props.scrollTabValue ? props.scrollTabValue : 0}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          onChange={(e, v) => {
            console.log(e.target.innerText.toLowerCase());
            console.log(v);
            props.setScrollTabValue(v);
            var scrollDiv = window.document.getElementById(
              e.target.innerText.toLowerCase()
            ).offsetTop;
            window.scrollTo({ top: scrollDiv - 180, behavior: "smooth" });
          }}
        >
          {props.restaurantDetails.menu.categories.map((category, index) => (
            <StyledTab label={category.name} />
          ))}
          {/* <StyledTab label="Pork" />
          <StyledTab label="Chicken" />
          <StyledTab label="Tilapia" />
          <StyledTab label="Drinks" />
          <StyledTab label="Special Picks" /> */}
        </StyledTabs>
      </Container>
    </ShowOnScroll>
  );
};

export default DishNavbar;
