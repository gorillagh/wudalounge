import React, { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  AppBar,
  Avatar,
  Badge,
  CircularProgress,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PageTitle from "../../Typography/PageTitle";
import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import { createMenu, uploadDishImage } from "../../../serverFunctions/admin";
import ActionButton from "../../Buttons/ActionButton";

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

const Subcategory = (props) => {
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createMenu(
        props.user.token,
        "subcategory",
        subcategory
      );
      if (res.data === "ok") {
        setSubcategory((prevState) => ({
          ...prevState,
          name: "",
          type: "",
        }));
        setSelectedType("");
        toast.success("Subcategory created");
        setLoading(false);
        return;
      }
      toast.error(res.data.error.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
                  <PageTitle my={0} title="Create Subcategory" />
                  <Icon color="error" fontSize="large" onClick={props.onClose}>
                    close
                  </Icon>
                </Box>
              </AppBar>
              <Toolbar sx={{ backgroundColor: "transparent", my: 1 }} />
            </Box>
            <Box component="form" px={2} onSubmit={handleSubmit} noValidate>
              <FormControl required fullWidth sx={{ my: 2 }} size="small">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedType}
                  label="Type"
                  onChange={(e) => {
                    setSubcategory((prevState) => ({
                      ...prevState,
                      type: e.target.value,
                    }));
                    setSelectedType(e.target.value);
                  }}
                >
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="drink">Drink</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="item-name"
                label="name"
                name="name"
                autoComplete="name"
                value={subcategory.name}
                onChange={(e) =>
                  setSubcategory((prevState) => ({
                    ...prevState,
                    name: e.target.value.toLowerCase(),
                  }))
                }
              />

              <ActionButton
                text="submit"
                type="submit"
                disabled={!subcategory.name || !subcategory.type}
                onClick={handleSubmit}
              />
            </Box>
          </Box>
          <LoadingBackdrop open={loading} />
        </Box>
      </Slide>
    </Modal>
  );
};

export default Subcategory;
