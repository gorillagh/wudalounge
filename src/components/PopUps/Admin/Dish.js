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

const Dish = (props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [dish, setDish] = useState({});
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {}, []);

  const handleImageUpload = (e) => {
    let files = e.target.files;
    console.log(files[0]);

    if (files) {
      setImageLoading(true);
      //Edit pics
      Resizer.imageFileResizer(
        files[0],
        900,
        900,
        "JPEG",
        100,
        0,
        (uri) => {
          uploadDishImage(props.user.token, uri)
            .then((res) => {
              // console.log('Image Upload Res Data', res)
              console.log(res.data);
              setImage(res.data.url);
              setImageLoading(false);
            })
            .catch((error) => {
              setImageLoading(false);
              console.log("Image upload error", error);
            });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(dish);
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
                  <PageTitle my={0} title="Create Dish" />
                  <Icon color="error" fontSize="large" onClick={props.onClose}>
                    close
                  </Icon>
                </Box>
              </AppBar>
              <Toolbar sx={{ backgroundColor: "transparent", my: 1 }} />
            </Box>
            <Box>
              {/* //////////////////////////Image/////////////////////////////////////// */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={2}
              >
                {imageLoading ? (
                  <CircularProgress thickness={4} size={40} />
                ) : (
                  <label>
                    <Badge
                      badgeContent={
                        image ? (
                          <Icon fontSize="small" color="primary">
                            edit
                          </Icon>
                        ) : (
                          <Icon fontSize="small" color="secondary">
                            add_a_photo
                          </Icon>
                        )
                      }
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        // alt={props.user.name && props.user.name}
                        src={image}
                        sx={{ width: 100, height: 100 }}
                      >
                        {!image && (
                          <Icon fontSize="large">restaurant_menu</Icon>
                        )}
                      </Avatar>

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={imageLoading}
                      />
                    </Badge>
                  </label>
                )}
              </Box>
              <Box px={2} component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="dish-name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  value={dish.name}
                  onChange={(e) =>
                    setDish((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="dish-description"
                  label="description"
                  name="description"
                  autoComplete="description"
                  value={dish.description}
                  multiline
                  rows={2}
                  onChange={(e) =>
                    setDish((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
                <TextField
                  type="number"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="dish-price"
                  label="price"
                  name="price"
                  autoComplete="price"
                  value={dish.price}
                  onChange={(e) =>
                    setDish((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }))
                  }
                />
              </Box>
              <Typography>subcategories</Typography>
              <Typography>ingredients</Typography>

              <Typography>category</Typography>
              <Typography>Sizes</Typography>
              <Typography>Extras</Typography>
              <Typography>dishQuantity</Typography>
              <Typography>selectedSize</Typography>
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default Dish;
