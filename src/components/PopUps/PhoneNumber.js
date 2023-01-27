import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import firebase from "firebase/app";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import Countdown, { CountdownApi } from "react-countdown";

import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";
import { createOrUpdateUser } from "../../serverFunctions/auth";
import { Slide } from "@mui/material";

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
  const [phoneNumberError, setPhoneNumberError] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState({
    status: false,
    message: "",
  });
  const [appVerifier, setAppVerifier] = useState(null);
  const [count, setCount] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (codeSent) {
      setCount(600000);
      const interval = setInterval(() => {
        setCount((currentCount) => currentCount - 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [codeSent]);

  useEffect(() => {
    count && count < 0 && setCodeSent(false);
  }, [count]);

  const handleGetCode = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 9 || phoneNumber.length > 13) {
      setPhoneNumberError({
        status: true,
        message: "Please enter a valid phone number",
      });
      return;
    }
    const validatedPhoneNumber = `+233${phoneNumber.slice(-9)}`;

    if (appVerifier) {
      appVerifier.clear();
      document.querySelector(
        "#main-container"
      ).innerHTML = `<div id="recaptcha-container"></div>`;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    setLoading(true);
    setAppVerifier(window.recaptchaVerifier);
    signInWithPhoneNumber(auth, validatedPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("Verification code sent to ", phoneNumber);
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setCodeSent(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log("SMS not sent");
        console.log(error);
      });
    return () => {
      window.recaptchaVerifier.clear();
    };
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
        setCodeError({ status: true, message: "Wrong verification code!" });
        console.log(error.message);
      });
    return false;
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
            </Box>{" "}
            {/* <div id="firebaseui-auth-container"></div> */}
            <Box mt={3}>
              <Box display={codeSent && "none"}>
                <Paper
                  component="form"
                  sx={{
                    borderRadius: "20px",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGetCode(e);
                  }}
                >
                  <Typography p={1}>+233</Typography>
                  <InputBase
                    autoFocus
                    disabled={loading}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter phone number"
                    inputProps={{ "aria-label": "enter phone number" }}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumberError({ status: false, message: "" });
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </Paper>
                {phoneNumberError.status ? (
                  <Typography textAlign="center" variant="body2" color="error">
                    {phoneNumberError.message}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Slide appear={true} in={codeSent} direction="left">
                <Box display={codeSent ? "block" : "none"}>
                  <Box mb={2}>
                    <Paper
                      component="form"
                      sx={{
                        borderRadius: "20px",
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                      }}
                    >
                      <InputBase
                        disabled={loading}
                        type="password"
                        autoComplete="one-time-code"
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter verification code"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={code}
                        onChange={(e) => {
                          e.preventDefault();
                          setCode(e.target.value);
                          setCodeError({ status: false, message: "" });
                        }}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(e);
                        }}
                      />
                    </Paper>
                    {codeError.status ? (
                      <Typography
                        textAlign="center"
                        variant="body2"
                        color="error"
                      >
                        {codeError.message}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {" "}
                      Verification code sent to {phoneNumber}
                    </Typography>{" "}
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => {
                        setCodeSent(false);
                      }}
                    >
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                  </Box>
                  <Typography textAlign="center" variant="body2">
                    The code expires in{" "}
                    {count &&
                      `${Math.floor(
                        (count % (1000 * 60 * 60)) / (1000 * 60)
                      )}mins : ${Math.floor((count % (1000 * 60)) / 1000)}secs`}
                  </Typography>
                </Box>
              </Slide>
              <div id="main-container">
                <div id="recaptcha-container"></div>
              </div>

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
                      "Get verification code"
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
