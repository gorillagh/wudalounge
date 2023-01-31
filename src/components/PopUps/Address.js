import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Icon, InputBase, Paper, Zoom } from "@mui/material";
import PageTitle from "../Typography/PageTitle";
import GooglePlacesAutoComplete from "../Inputs/GooglePlacesAutoComplete";
import Autocomplete from "react-google-autocomplete";
import { updateUser } from "../../serverFunctions/user";
import { useDispatch } from "react-redux";

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

const Address = (props) => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserAddress = async () => {
      if (props.user && props.user._id && value) {
        await updateUser(props.user._id, { addresses: [value] })
          .then((res) => {
            console.log(res.data);
            let userInfo = {
              _id: res.data._id,
              phoneNumber: res.data.phoneNumber,
              name: res.data.name,
              email: res.data.email ? res.data.email : "",
              addresses: res.data.addresses ? res.data.addresses : [],
              role: res.data.role,
              token: props.user.token,
              favorites: res.data.favorites ? res.data.favorites : [],
            };
            props.setUser(userInfo);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: userInfo,
            });
            window.localStorage.setItem("wdUser", JSON.stringify(userInfo));

            props.setAlertSnackbar({
              open: true,
              text: "Address added",
              severity: "success",
            });
            props.onClose();
            setValue(null);
          })
          .catch((error) => {
            console.log(error);
            props.setAlertSnackbar({
              open: true,
              text: `An error occured while adding address. Please try again.`,
              severity: "error",
            });
          });
      }
    };
    updateUserAddress();
  }, [value]);

  const containerRef = React.useRef(null);
  return (
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
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5.8px)",
            WebkitBackdropFilter: "blur(5.8px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box sx={style}>
            <Box my={2} display="flex" justifyContent="space-between">
              <PageTitle my={0} title="Delivery Address" />
              <Icon color="error" fontSize="large" onClick={props.onClose}>
                close
              </Icon>
            </Box>
            <GooglePlacesAutoComplete value={value} setValue={setValue} />
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default Address;
