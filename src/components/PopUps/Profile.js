import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import ActionButton from "../Buttons/ActionButton";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Badge,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import { TransitionGroup } from "react-transition-group";
import { updateUser, uploadImage } from "../../serverFunctions/user";

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

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailBorderError, setEmailBorderError] = useState("");
  const [nameBorderError, setNameBorderError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      //
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    //
  };
  useEffect(() => {
    !props.open && setEditOn(false);
    if (editOn) {
      setName("");
      setEmail("");
      setImage("");
      // setEditOn(false);
      fetchUserProfile();
      props.user.name && setName(props.user.name);
      props.user.email && setEmail(props.user.email);
      props.user.image && setImage(props.user.image);
    }
  }, [props.open, editOn]);

  const handleImageUpload = (e) => {
    let files = e.target.files;
    console.log(files[0]);

    if (files) {
      setImageLoading(true);
      //Edit pics
      Resizer.imageFileResizer(
        files[0],
        640,
        640,
        "JPEG",
        100,
        0,
        (uri) => {
          uploadImage(props.user.token, uri)
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

  const handleSave = async () => {
    try {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailBorderError("3px solid #ff0220");
        setTimeout(() => {
          setEmailBorderError("");
        }, 30000);
        return;
      }
      if (name.length < 2) {
        setNameBorderError("3px solid #ff0220");
        setTimeout(() => {
          setNameBorderError("");
        }, 30000);
        return;
      }
      if (
        props.user.name &&
        props.user.name === name &&
        props.user.email &&
        props.user.email === email &&
        props.user.image === image
      ) {
        setEditOn((prevState) => !prevState);
        return;
      }

      setLoading(true);
      await updateUser(props.user.token, { name, email, image })
        .then((res) => {
          let userInfo = {
            _id: res.data._id,
            phoneNumber: res.data.phoneNumber,
            name: res.data.name,
            email: res.data.email ? res.data.email : "",
            image: res.data.image ? res.data.image : "",
            addresses: res.data.addresses ? res.data.addresses : [],
            role: res.data.role,
            token: props.user.token,
            favorites: res.data.favorites ? res.data.favorites : [],
          };
          props.setUser({ ...userInfo });
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { ...userInfo },
          });
          window.localStorage.setItem(
            "wdUser",
            JSON.stringify({ ...userInfo })
          );
          setLoading(false);
          props.setAlertSnackbar({
            open: true,
            text: "Profile updated",
            severity: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setEditOn((prevState) => !prevState);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        ref={containerRef}
        sx={{ width: { md: "60%" }, left: { md: "20%" } }}
      >
        <Zoom
          container={containerRef.current}
          appear={true}
          in={props.open}
          direction="left"
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
            <Box sx={style}>
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="Profile" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              {/* ////////////////////////Saved data/////////////////////////////////// */}
              {!editOn ? (
                <Box>
                  <Slide
                    // container={containerRef.current}
                    appear={true}
                    in={!editOn}
                    direction="down"
                    mountOnEnter
                    unmountOnExit
                    //   timeout={300}
                  >
                    <Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        my={2}
                      >
                        <Avatar
                          alt={props.user.name && props.user.name}
                          src={props.user.image && props.user.image}
                          sx={{ width: 76, height: 76 }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Subtitle
                          title={`0${props.user.phoneNumber.slice(-9)}`}
                          my={1}
                        />
                        <Typography mb={1}>{props.user.name}</Typography>
                        <Typography color="GrayText">
                          {props.user.email}
                        </Typography>
                        <Chip
                          size="small"
                          label="Verify email"
                          sx={{ bgcolor: "error.light", color: "#fff" }}
                        />
                      </Box>
                    </Box>
                  </Slide>
                </Box>
              ) : (
                /* ////////////////////Edit On///////////////////////////// */

                <Slide
                  // container={containerRef.current}
                  appear={true}
                  in={editOn}
                  direction="left"
                  mountOnEnter
                  unmountOnExit
                  //   timeout={300}
                >
                  <Box mx={2}>
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
                              alt={props.user.name && props.user.name}
                              src={image}
                              sx={{ width: 76, height: 76 }}
                            />

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

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      my={3}
                    >
                      {/* <Typography fontWeight={500}>Phone* :</Typography> */}
                      <TextField
                        fullWidth
                        disabled
                        value={props.user.phoneNumber}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon fontSize="small">phone</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      my={2}
                    >
                      {/* <Typography fontWeight={500}>Name* :</Typography> */}
                      <TextField
                        fullWidth
                        // disabled={!editOn}
                        sx={{ border: nameBorderError }}
                        value={name}
                        onChange={(e) => {
                          if (e.target.value.length >= 2)
                            setNameBorderError("");
                          setName(e.target.value);
                        }}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon fontSize="small">badge</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {nameBorderError ? (
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight={500}
                          textAlign="center"
                        >
                          At least two(2) characters long
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                      justifyContent="center"
                      my={3}
                    >
                      {/* <Typography fontWeight={500}>Email :</Typography> */}
                      <TextField
                        fullWidth
                        sx={{ border: emailBorderError }}
                        // disabled={!editOn}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          if (
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                              e.target.value
                            )
                          )
                            setEmailBorderError("");
                          setEmail(e.target.value);
                        }}
                        size="small"
                        placeholder="Email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon fontSize="small">email</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {emailBorderError ? (
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight={500}
                          textAlign="center"
                        >
                          Please enter a valid email addreass
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Slide>
              )}
              {/* ///////////////////////////////////////////////////////////// */}

              {editOn ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <ActionButton
                    variant="outlined"
                    text="cancel"
                    fullWidth={false}
                    color="error"
                    onClick={() => setEditOn((prevState) => !prevState)}
                  />

                  <ActionButton
                    disabled={loading || imageLoading}
                    backgroundColor="success"
                    fullWidth={false}
                    text="Save"
                    // rightIcon="save"
                    onClick={handleSave}
                  />
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="right"
                  alignItems="center"
                  my={2}
                >
                  <ActionButton
                    // size="small"
                    fullWidth={false}
                    text={<Icon fontSize="small">edit</Icon>}
                    variant="outlined"
                    onClick={() => setEditOn((prevState) => !prevState)}
                  />
                </Box>
              )}
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Profile;
