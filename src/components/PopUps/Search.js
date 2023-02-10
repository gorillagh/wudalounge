import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import PageTitle from "../Typography/PageTitle";
import Fade from "@mui/material/Fade";

import { debounce } from "@mui/material/utils";
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  px: 2,
  background: "transparent",
};

const autocompleteService = { current: null };

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetch = debounce((input) => {
    let active = true;
    let results = [];
    props.dishes.map((dish, index) => {
      if (
        dish.name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        dish.category.name.toLowerCase().indexOf(input.toLowerCase()) > -1
      ) {
        results = [...results, dish];
        if (active) {
          let newOptions = [];

          if (props.value) {
            newOptions = [props.value];
          }

          if (results.length > 0) {
            newOptions = [...newOptions, ...results];
          }

          setSearchResults(newOptions);
        }
      }
    });
    return () => {
      active = false;
    };
  }, 400);

  React.useEffect(() => {
    // let active = true;

    if (inputValue === "") {
      setSearchResults([]);
      return undefined;
    }

    fetch(inputValue);

    // return () => {
    //   active = false;
    // };
  }, [props.value, inputValue]);

  const handleDishSelect = (dish) => {
    props.setSelectedDish({ ...dish, dishQuantity: 1 });
    props.setOpenDishModal(true);
  };
  const scrollRef = React.useRef(null);
  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        // hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        ref={containerRef}
        sx={{ width: { md: "60%" }, left: { md: "20%" } }}
      >
        <Fade
          container={containerRef.current}
          appear={true}
          in={props.open}
          mountOnEnter
          unmountOnExit
          //   timeout={300}
        >
          <Box
            onClick={(e) => {
              if (e.currentTarget !== e.target) return;
              props.close();
            }}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style} ref={scrollRef}>
              <Box>
                <AppBar
                  //   elevation={0}
                  position="fixed"
                  color="inherit"
                  sx={{
                    top: "0",
                    px: 2,
                    background: "rgba(0, 0, 0, 0.1)",

                    backdropFilter: "blur(8.8px)",
                    WebkitBackdropFilter: "blur(8.8px)",
                  }}
                >
                  <Box
                    my={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Paper
                      component="form"
                      sx={{
                        borderRadius: "20px",
                        p: "4px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <InputBase
                        autoFocus
                        value={inputValue}
                        onChange={(e) => {
                          scrollRef.current.scrollTo(0, 0);
                          setInputValue(e.target.value);
                        }}
                        size="large"
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Dishes/Categories"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                      {/* {inputValue && inputValue.length ? (
                        <IconButton
                          onClick={() => setInputValue("")}
                          color="error"
                          aria-label="directions"
                        >
                          <Icon>clear</Icon>
                        </IconButton>
                      ) : (
                        ""
                      )} */}
                    </Paper>
                    <IconButton
                      sx={{ ml: 2 }}
                      size="medium"
                      onClick={() => {
                        setInputValue("");
                        props.onClose();
                      }}
                    >
                      <Icon color="error" fontSize="meduim">
                        close
                      </Icon>
                    </IconButton>
                  </Box>
                </AppBar>
                <Toolbar sx={{ backgroundColor: "transparent" }} />
              </Box>
              <Box my={2} minHeight="800px">
                {searchResults.length > 0
                  ? searchResults.map((dish, index) => (
                      <Grid
                        key={index}
                        container
                        spacing={1}
                        my={1}
                        onClick={() => handleDishSelect(dish)}
                      >
                        <Grid item xs={3}>
                          <img
                            width="100%"
                            style={{ borderRadius: "12px" }}
                            alt={`${dish.category.name} dish`}
                            src={dish.image}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{dish.name}</Typography>
                          <Typography variant="body2">
                            {dish.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))
                  : ""}
              </Box>
            </Box>
            {/* <LoadingBackdrop open={loading} /> */}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Search;
