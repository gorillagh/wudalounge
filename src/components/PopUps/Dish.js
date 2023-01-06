import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import {
  AppBar,
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  Icon,
  Toolbar,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";

const style = {
  position: "absolute",
  bottom: 0,
  maxHeight: "80vh",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  // bgcolor: "background.paper",
  boxShadow: 24,
  borderTopRightRadius: "12px",
  borderTopLeftRadius: "12px",
};

const Dish = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Modal
        onClose={props.close}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted={true}
      >
        <Box sx={style}>
          <Box
            sx={{
              borderRadius: "12px",
              background: "rgba(255,255,255, 0.6)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              webkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              position: "relative",
            }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box position="absolute" sx={{ position: "absolute", top: "3%" }}>
              <Icon
                onClick={props.close}
                sx={{
                  position: "fixed",
                  right: "3%",
                  // top: "22%",
                  color: "gray",
                  zIndex: 4,
                }}
              >
                {" "}
                highlight_off
              </Icon>
            </Box>
            <Box sx={{ position: "relative" }}>
              <img
                style={{
                  borderTopRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  height: "100%",
                }}
                alt={props.dish.name}
                // height="100%"
                width="100%"
                src={props.dish.image}
              />

              <Box p={2}>
                <PageTitle
                  mt={0}
                  mb={1}
                  title={props.dish.name}
                  fontWeight={700}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    py: 1,
                    mr: 1,
                    textDecoration: "line-through",
                  }}
                  // variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  GHC{props.dish.price}
                </Typography>
                <Chip
                  label={
                    <Typography fontWeight={600}>
                      GHC{props.dish.discountedPrice}
                    </Typography>
                  }
                  color="secondary"
                />
                <Typography
                  my={0.5}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  // whiteSpace="nowrap"
                  // variant="body2"
                  color="text.secondary"
                >
                  {props.dish.description}
                </Typography>
              </Box>

              {/* <Subtitle title={props.dish.name} fontWeight={700} /> */}
            </Box>
          </Box>
          <Box
            sx={{
              p: 2,
              my: 1,
              borderRadius: "12px",
              background: "rgba(255,255,255, 0.6)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              webkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Subtitle my={1} title="Additions" fontWeight={700} />
            <Typography>coming soon...!</Typography>
          </Box>
          <>
            <AppBar
              position="fixed"
              color="inherit"
              sx={{ top: "auto", bottom: 0, p: 1 }}
            >
              <Grid
                container
                spacing={1}
                justifyContent="center"
                // sx={{ position: "fixed" }}
              >
                <Grid item xs={5}>
                  {/* <Chip
                    variant="outlined"
                    avatar={<Avatar>+</Avatar>}
                    // icon={<Icon>cancel</Icon>}
                    label="1"
                    label={ */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      borderRadius: "12px",
                      alignItems: "center",
                      justifyContent: "center",
                      border: 1,
                      height: "100%",
                      borderColor: "rgba(0, 0, 0, 0.4)",
                      px: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <Grid container justifyContent="space-evenly">
                      <Grid item xs={2}>
                        <Typography
                          variant="h4"
                          textAlign="center"
                          fontWeight={400}
                        >
                          -
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="h4"
                          textAlign="center"
                          fontWeight={500}
                        >
                          1
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          variant="h4"
                          textAlign="center"
                          fontWeight={400}
                        >
                          +
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <ActionButton
                    py={0.5}
                    my={0}
                    text={
                      <Box>
                        <Typography variant="body1" fontWeight={700} p={0}>
                          Add
                        </Typography>
                        <Typography variant="body1" fontWeight={700} p={0}>
                          GHC{props.dish.discountedPrice}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </AppBar>
            <Toolbar sx={{ py: 1 }} />
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default Dish;
