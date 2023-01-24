import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";

import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";
import { createOrUpdateUser } from "../../serverFunctions/auth";

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

// auth.languageCode = "it";

const PhoneNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const handleGetCode = async (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("Verification code sent to ", phoneNumber);
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        // history.push('/login/phone/complete')
        setCodeSent(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log("SMS not sent");
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        const idTokenResult = await user.getIdTokenResult();

        //Sent token to backend

        createOrUpdateUser(idTokenResult.token, { phoneNumber })
          .then((res) => {
            console.log(res.data);
            let userInfo = {
              _id: res.data._id,
              phoneNumber: res.data.phoneNumber,
              name: res.data.name,
              email: res.data.email ? res.data.email : "",
              role: res.data.role,
              token: idTokenResult.token,
              favorites: res.data.favorites ? res.data.favorites : [],
            };
            window.localStorage.setItem("wdUser", JSON.stringify(userInfo));
            props.setUser(userInfo);
            // send response data to redux store
            dispatch({
              type: "LOGGED_IN_USER",
              payload: userInfo,
            });
            setPhoneNumber("");
            setCode("");
            setCodeSent(false);
            setLoading(false);
            if (!userInfo.addresses) {
              props.setOpenAddress(true);
            }
            props.onClose();
            //Show a welcome notification here
          })
          .catch((err) => {
            if (err.status === 401) {
              console.log("Your session has expired. Please try log in again!");
            } else console.log("Error: ", err);
          });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("Wrong verification code!");
        setLoading(false);
        console.log(error);
      });
  };

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
      >
        <Box
          onClick={(e) => {
            if (e.currentTarget !== e.target) return;
            props.onClose();
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
              <PageTitle my={0} title="Phone Number" />
              <Icon color="error" fontSize="large" onClick={props.onClose}>
                close
              </Icon>
            </Box>
            <Box mt="50%">
              <Paper
                sx={{
                  borderRadius: "20px",
                  p: "2px 4px",
                  display: codeSent ? "none" : "flex",
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  {/* <Typography>+233</Typography> */}
                  <Icon>phone</Icon>
                </IconButton>
                <InputBase
                  autoFocus
                  disabled={loading}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Enter phone number"
                  inputProps={{ "aria-label": "enter phone number" }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Paper>
              <Box display={codeSent ? "block" : "none"}>
                <Paper
                  sx={{
                    borderRadius: "20px",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <InputBase
                    disabled={loading}
                    type="password"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter verification code"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Paper>
                {/* <Typography textAlign="center" variant="body2" fontWeight={500}>
                  Enter the verification code sent to {phoneNumber}
                </Typography> */}
              </Box>
              <div
                className="form-group pt-0 mt-4"
                id="recaptcha-container"
              ></div>
              <Box>
                <ActionButton
                  id="sign-in-button"
                  text={
                    loading ? (
                      <Typography variant="body2" fontWeight={600}>
                        <CircularLoading size={20} thickness={6} />
                      </Typography>
                    ) : codeSent ? (
                      "Submit"
                    ) : (
                      "Send verification code"
                    )
                  }
                  onClick={codeSent ? handleSubmit : handleGetCode}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default PhoneNumber;
