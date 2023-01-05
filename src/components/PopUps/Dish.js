import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Subtitle from "../Typography/Subtitle";
import PageTitle from "../Typography/PageTitle";
import { AppBar, Chip, Container, Grid } from "@mui/material";
import ActionButton from "../Buttons/ActionButton";

const style = {
  position: "absolute",
  bottom: 0,
  maxHeight: "93vh",
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
      >
        <Box sx={style}>
          <Box
            sx={{
              borderRadius: "12px",
              background: "rgba(255,255,255, 0.6)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              webkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box>
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
                <PageTitle my={1} title={props.dish.name} fontWeight={700} />
                <Subtitle my={0} title={props.dish.description} />

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
          </Box>
          {/* <Box
            sx={{
              p: 1,
              mt: 1,
              background: "rgba(255,255,255, 0.6)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              webkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          > */}
          {/* <AppBar  position="fixed" color="inherit">
            <Grid
              container
              spacing={1}
              justifyContent="center"
              // sx={{ position: "fixed" }}
            >
              <Grid item xs={5}>
                <Chip
                  label={<Typography fontWeight={600}>- 1 +</Typography>}
                  sx={{ width: "100%", height: "100%" }}
                  // color="secondary"
                />
              </Grid>
              <Grid item xs={7}>
                <ActionButton my={0} text="Add" />
              </Grid>
            </Grid>
          </AppBar>
        </Box> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Dish;
