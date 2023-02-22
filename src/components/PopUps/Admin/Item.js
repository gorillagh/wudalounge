import React, { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  AppBar,
  Avatar,
  Badge,
  CircularProgress,
  Icon,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PageTitle from "../../Typography/PageTitle";
import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import { uploadDishImage } from "../../../serverFunctions/admin";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  px: 1,
  background: "transparent",
};
const cardStyle = {
  px: 2,
  py: 1,
  my: 1.5,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  // border: "1px solid rgba(255, 255, 255, 0.3)",
};

const Item = (props) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      // hideBackdrop
      closeAfterTransition={true}
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      ref={containerRef}
      sx={{ width: { md: "60%" }, left: { md: "20%" } }}
    >
      <Slide
        container={containerRef.current}
        appear={true}
        in={props.open}
        direction="left"
        mountOnEnter
        unmountOnExit
      >
        <Box
          onClick={(e) => {
            if (e.currentTarget !== e.target) return;
            props.onClose();
          }}
          sx={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(5.8px)",
            WebkitBackdropFilter: "blur(5.8px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box ref={scrollRef} sx={style}>
            <Box>
              <AppBar
                elevation={1}
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
                <Box my={2} display="flex" justifyContent="space-between">
                  <PageTitle my={0} title="Create Item" />
                  <Icon color="error" fontSize="large" onClick={props.onClose}>
                    close
                  </Icon>
                </Box>
              </AppBar>
              <Toolbar sx={{ backgroundColor: "transparent", my: 1 }} />
            </Box>
            <Typography>name</Typography>
            <Typography>additionalAmount</Typography>
            <Typography>checked</Typography>
            <Typography>quantity</Typography>
          </Box>
          <LoadingBackdrop open={loading} />
        </Box>
      </Slide>
    </Modal>
  );
};

export default Item;
