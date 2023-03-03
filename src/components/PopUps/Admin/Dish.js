import React, { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Checkbox,
  CircularProgress,
  fabClasses,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Icon,
  InputAdornment,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PageTitle from "../../Typography/PageTitle";
import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import {
  createMenu,
  getDishSubs,
  uploadDishImage,
} from "../../../serverFunctions/admin";
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

const Dish = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [dish, setDish] = useState({});
  const [dishSubs, setDishSubs] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "select",
    _id: "select-101",
  });
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [sizes, setSizes] = useState([
    { size: "regular", description: "", additionalAmount: 0 },
  ]);

  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const loadSubs = async () => {
    setLoading(true);
    let dishsubs = [];
    const res = await getDishSubs(props.user.token);

    res.data.subcategories.map((sub) => {
      if (sub.type !== "drink") dishsubs.push(sub);
    });
    setSubcategories(dishsubs);
    setDishSubs(res.data);
    console.log("Categories--->", res.data);
    setLoading(false);
  };

  useEffect(() => {
    setDish((prevState) => ({ ...prevState, sizes }));
    loadSubs();
  }, [props.open]);

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
              setDish((prevState) => ({ ...prevState, image: res.data.url }));
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

  const handleSizeChange = (e, size) => {
    const largeIndex = sizes.findIndex((item) => item.size === size);
    setSizes((prevState) => {
      const newState = [...prevState];
      newState[largeIndex] = {
        ...prevState[largeIndex],
        additionalAmount: e.target.value,
      };
      // console.log(newState);
      setDish((prevState) => ({ ...prevState, sizes: newState }));
      return newState;
    });
  };

  const handleSizeSelect = (e, size) => {
    if (e.target.checked) {
      setSizes((prevState) => {
        const newState = [
          ...prevState,
          {
            size,
            description: "",
            additionalAmount: 0,
          },
        ];
        setDish((prevState) => ({ ...prevState, sizes: newState }));
        return newState;
      });
    } else {
      setSizes((prevState) => {
        const index = prevState.findIndex((size) => size.size === size);
        const updatedSizes = [
          ...prevState.slice(0, index),
          // ...prevState.slice(index + 1),
        ];
        setDish((prevState) => ({ ...prevState, sizes: updatedSizes }));
        return updatedSizes;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(dish);
    try {
      const res = await createMenu(props.user.token, "dish", dish);
      if (res.data === "ok") {
        setSizes([{ size: "regular", description: "", additionalAmount: 0 }]);
        setDish((prevState) => {
          const newState = { sizes };
          return newState;
        });
        setSelectedCategory({ name: "select", _id: "select-101" });
        setSelectedSubcategories([]);
        setSelectedExtras([]);

        toast.success("Dish created");
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
                        dish.image ? (
                          <Icon fontSize="small" color="primary">
                            edit
                          </Icon>
                        ) : (
                          <Icon fontSize="small" color="primary">
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
                        src={dish.image}
                        sx={{ width: 150, height: 100 }}
                      >
                        {!dish.image && (
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
                <Autocomplete
                  sx={{ mb: 1, mt: 4 }}
                  size="small"
                  fullWidth
                  onChange={(event, newValue) => {
                    newValue &&
                      newValue._id &&
                      setDish((prevState) => ({
                        ...prevState,
                        category: newValue._id,
                      }));
                    setSelectedCategory(newValue);
                  }}
                  value={selectedCategory}
                  id="controllable-states-demo"
                  options={dishSubs && dishSubs.categories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField required {...params} label="Category" />
                  )}
                />
                <TextField
                  spellCheck={false}
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="dish-name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  value={dish.name || ""}
                  onChange={(e) =>
                    setDish((prevState) => ({
                      ...prevState,
                      name: e.target.value.toLowerCase(),
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
                  value={dish.description || ""}
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
                  value={dish.price || ""}
                  onChange={(e) =>
                    setDish((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">GHC</InputAdornment>
                    ),
                  }}
                />

                <Autocomplete
                  sx={{ mt: 3 }}
                  size="small"
                  fullWidth
                  multiple
                  id="tags-outlined"
                  options={dishSubs && dishSubs.items}
                  getOptionLabel={(option) => option.name}
                  // defaultValue={[top100Films[13]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField label="Extras" {...params} placeholder="Items" />
                  )}
                  onChange={(event, newValue) => {
                    let selected = [];
                    newValue.map((v, i) => selected.push(v._id));
                    console.log(newValue);
                    setDish((prevState) => ({
                      ...prevState,
                      extras: selected,
                    }));
                    setSelectedExtras(newValue);
                  }}
                  value={selectedExtras}
                />
                <Autocomplete
                  sx={{ mt: 3 }}
                  size="small"
                  fullWidth
                  multiple
                  id="tags-outlined"
                  options={subcategories && subcategories}
                  getOptionLabel={(option) => option.name}
                  // defaultValue={[top100Films[13]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Subcategories" />
                  )}
                  onChange={(event, newValue) => {
                    let selected = [];
                    newValue.map((v, i) => selected.push(v._id));
                    console.log(newValue);
                    setDish((prevState) => ({
                      ...prevState,
                      subcategories: selected,
                    }));
                    setSelectedSubcategories(newValue);
                  }}
                  value={selectedSubcategories}
                />
                <TextField
                  sx={{ mt: 3 }}
                  spellCheck={false}
                  size="small"
                  margin="normal"
                  fullWidth
                  id="dish-ingredients"
                  label="Ingredients"
                  name="ingredients"
                  autoComplete="ingredients"
                  value={dish.ingredients || ""}
                  multiline
                  rows={2}
                  onChange={(e) => {
                    setDish((prevState) => ({
                      ...prevState,
                      ingredients: e.target.value.split(/[\s,]+/),
                    }));
                  }}
                />
                <Box>
                  <FormControl
                    sx={{
                      border: "1px solid #BDBDBD",
                      borderRadius: "12px",
                      boxSizing: "border-box",
                      px: 2,
                      pb: 1,
                      mt: 1,
                    }}
                    required
                    fullWidth
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Sizes</FormLabel>
                    <FormGroup>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              // onChange={handleChange}
                              size="small"
                              name="regular"
                            />
                          }
                          label="Regular:"
                        />
                        <TextField
                          disabled
                          spellCheck={false}
                          size="small"
                          fullWidth
                          margin="normal"
                          label="Additional amount"
                          name="regular"
                          autoComplete="regular"
                          type="number"
                          value={0}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                GHC
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={
                                sizes.find((item) => item.size === "large")
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleSizeSelect(e, "large")}
                              name="large"
                            />
                          }
                          label="Large:"
                        />
                        {sizes.find((item) => item.size === "large") ? (
                          <TextField
                            spellCheck={false}
                            size="small"
                            fullWidth
                            margin="normal"
                            label="Additional amount"
                            name="large"
                            autoComplete="large"
                            type="number"
                            value={
                              sizes.find((item) => item.size === "large")
                                .additionalAmount
                            }
                            onChange={(e) => handleSizeChange(e, "large")}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  GHC
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={
                                sizes.find((item) => item.size === "family")
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleSizeSelect(e, "family")}
                              name="family"
                            />
                          }
                          label="Family: "
                        />
                        {sizes.find((item) => item.size === "family") ? (
                          <TextField
                            spellCheck={false}
                            size="small"
                            fullWidth
                            margin="normal"
                            label="Additional amount"
                            name="family"
                            autoComplete="family"
                            type="number"
                            value={
                              sizes.find((item) => item.size === "family")
                                .additionalAmount
                            }
                            onChange={(e) => handleSizeChange(e, "family")}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  GHC
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    </FormGroup>
                  </FormControl>
                </Box>

                <ActionButton
                  text="submit"
                  type="submit"
                  // disabled={!dish.name}
                  onClick={handleSubmit}
                />
              </Box>
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default Dish;
