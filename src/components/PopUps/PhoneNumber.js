import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import Countdown, { CountdownApi } from "react-countdown";
import PageTitle from "../Typography/PageTitle";
import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";
import { createOrUpdateUser } from "../../serverFunctions/auth";
import { Fade, Slide } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import { updateUser } from "../../serverFunctions/user";

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
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState({
    status: false,
    message: "",
  });

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState({
    status: false,
    message: "",
  });
  const [appVerifier, setAppVerifier] = useState(null);
  const [count, setCount] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (codeSent) {
  //     setCount(600000);
  //     const interval = setInterval(() => {
  //       setCount((currentCount) => currentCount - 1000);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [codeSent]);

  // useEffect(() => {
  //   count && count < 0 && setCodeSent(false);
  // }, [count]);

  useEffect(() => {
    if (
      props.user &&
      props.user.phoneNumber &&
      props.user.name &&
      props.user.name !== "Wd User"
    ) {
      setPhoneNumber(props.user.phoneNumber.slice(-9));
      setUserName(props.user.name);
    }
  }, [props.user]);

  const handleGetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (phoneNumber.length < 9 || phoneNumber.length > 13) {
      setPhoneNumberError({
        status: true,
        message: "Please enter a valid phone number",
      });
      return;
    }
    if (
      props.user &&
      props.user.phoneNumber &&
      phoneNumber === props.user.phoneNumber
    ) {
      setPhoneNumberVerified(true);
      setLoading(false);
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
        if (
          error.message === "Firebase: Error (auth/network-request-failed)."
        ) {
          props.setAlertSnackbar({
            open: true,
            text: "Check your internet connection and try again",
            severity: "error",
          });
        }
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
            props.setAlertSnackbar({
              open: true,
              text: `Verified (${userInfo.phoneNumber})`,
              severity: "success",
            });
            setPhoneNumberVerified(true);
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

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (userName.length < 3) {
      setUserNameError({
        status: true,
        message: "User name should be more 3 letters",
      });
      return;
    }
    if (userName === props.user.name) {
      setPhoneNumberVerified(false);
      props.onClose();
      return;
    }
    await updateUser(props.user._id, { name: userName })
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
        setPhoneNumberVerified(false);
        props.setAlertSnackbar({
          open: true,
          text: `Added Name (${userInfo.name})`,
          severity: "success",
        });
        props.onClose();
        setPhoneNumberVerified(false);
        if (!props.user.address || !props.user.address.length) {
          props.setOpenAddress(true);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setAlertSnackbar({
          open: true,
          text: `An error occured while adding name. Please try again.`,
          severity: "error",
        });
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
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(5.8px)",
            WebkitBackdropFilter: "blur(5.8px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box sx={style}>
            <Box my={2} display="flex" justifyContent="space-between">
              <PageTitle my={0} title="Contact Info" />
              <Icon color="error" fontSize="large" onClick={props.onClose}>
                close
              </Icon>
            </Box>{" "}
            {/* <div id="firebaseui-auth-container"></div> */}
            <Box mt={3}>
              {/* ////////////////Phone Number section////////////////////// */}
              <Box display={!phoneNumberVerified ? "block" : "none"}>
                <Box display={codeSent && "none"}>
                  <Typography fontWeight="bold">Phone number</Typography>
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
                      type="number"
                      autoFocus
                      disabled={loading}
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Enter phone number"
                      inputProps={{ "aria-label": "enter phone number" }}
                      value={phoneNumber}
                      // value="240298910"
                      onChange={(e) => {
                        setPhoneNumberError({ status: false, message: "" });
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Paper>
                  {phoneNumberError.status ? (
                    <Typography
                      textAlign="center"
                      variant="body2"
                      color="error"
                    >
                      {phoneNumberError.message}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                <Fade appear={true} in={codeSent} direction="left">
                  <Box display={codeSent ? "block" : "none"}>
                    <Box mb={2}>
                      <Typography fontWeight="bold">
                        Verification code
                      </Typography>
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
                    {/* <Typography textAlign="center" variant="body2">
                      The code expires in{" "}
                      {count &&
                        `${Math.floor(
                          (count % (1000 * 60 * 60)) / (1000 * 60)
                        )}mins : ${Math.floor(
                          (count % (1000 * 60)) / 1000
                        )}secs`}
                    </Typography> */}
                  </Box>
                </Fade>
                <div id="main-container">
                  <div id="recaptcha-container"></div>
                </div>

                <Box>
                  <ActionButton
                    disabled={loading}
                    id="sign-in-button"
                    text={
                      loading ? (
                        <Typography variant="body2" fontWeight={600}>
                          <CircularLoading size={20} thickness={6} />
                        </Typography>
                      ) : codeSent ? (
                        "Submit"
                      ) : props.user &&
                        props.user.phoneNumber &&
                        props.user.phoneNumber.slice(-9) ===
                          phoneNumber.slice(-9) ? (
                        "Next"
                      ) : (
                        "Get verification code"
                      )
                    }
                    onClick={
                      codeSent
                        ? handleSubmit
                        : props.user &&
                          props.user.phoneNumber &&
                          props.user.phoneNumber.slice(-9) ===
                            phoneNumber.slice(-9)
                        ? () => setPhoneNumberVerified(true)
                        : handleGetCode
                    }
                  />
                </Box>
              </Box>

              {/* ////////////////Name Section/////////////////////////// */}
              <Slide direction="left" in={phoneNumberVerified}>
                <Box display={phoneNumberVerified ? "block" : "none"}>
                  <Typography fontWeight="bold">Name</Typography>
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
                      handleUpdateName(e);
                    }}
                  >
                    <Typography p={1}>
                      <Icon>badge</Icon>
                    </Typography>
                    <InputBase
                      autoFocus
                      disabled={loading}
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Enter your name"
                      inputProps={{ "aria-label": "enter name" }}
                      value={userName}
                      onChange={(e) => {
                        setUserNameError({ status: false, message: "" });
                        setUserName(e.target.value);
                      }}
                    />
                  </Paper>
                  {userNameError.status ? (
                    <Typography
                      textAlign="center"
                      variant="body2"
                      color="error"
                    >
                      {userNameError.message}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Box>
                    <ActionButton
                      disabled={loading}
                      id="sign-in-button"
                      text={
                        loading ? (
                          <Typography variant="body2" fontWeight={600}>
                            <CircularLoading size={20} thickness={6} />
                          </Typography>
                        ) : (
                          "Finish"
                        )
                      }
                      onClick={handleUpdateName}
                    />
                  </Box>
                </Box>
              </Slide>
            </Box>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default PhoneNumber;
