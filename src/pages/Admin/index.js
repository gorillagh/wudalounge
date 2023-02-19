import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import ForgotPassword from "../../components/PopUps/ForgotPassword";
import { googleLogin, loginUser } from "../../serverFunctions/auth";
import Icon from "@mui/material/Icon";
import googleSignInIcon from "../../images/googleSignin.svg";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import Link from "../../components/Links/Link";
import ActionButton from "../../components/Buttons/ActionButton";
import PageTitle from "../../components/Typography/PageTitle";
import { Card } from "@mui/material";
import Subtitle from "../../components/Typography/Subtitle";

const provider = new GoogleAuthProvider();

const AdminLogin = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [openForgotPasswordModal, setOpenForgotPassworModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const roleBasedRedirect = (user) => {
    console.log(user);
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    if (user && user.token) roleBasedRedirect(user);
    // else navigate("/");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Enter your email!");
      return;
    }
    if (!password) {
      toast.error("Enter your password");
      return;
    }

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      loginUser(idTokenResult.token)
        .then((res) => {
          console.log(res.data);
          let userInfo = {
            _id: res.data._id,
            phoneNumber: res.data.phoneNumber,
            name: res.data.name,
            email: res.data.email ? res.data.email : "",
            addresses: res.data.addresses ? [...res.data.addresses] : [],
            image: res.data.image ? res.data.image : "",
            role: res.data.role,
            token: idTokenResult.token,
            favorites: res.data.favorites ? [...res.data.favorites] : [],
          };
          window.localStorage.setItem(
            "wdUser",
            JSON.stringify({ ...userInfo })
          );
          props.setUser({ ...userInfo });
          // send response data to redux store
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { ...userInfo },
          });
          toast.success(
            `Welcome ${res.data.name.slice(0, res.data.name.indexOf(" "))}`
          );
          roleBasedRedirect(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        toast.error("Email address not registered. Please sign up!");
      } else {
        toast.error(error.message);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Card
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "16px",
            background: " rgba(255, 255, 255, 0.9)",
            webkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
          }}
        >
          <PageTitle title="Log In" />

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ActionButton type="submit" onClick={handleSubmit} text="Log In" />

            {/* <Box align="center" sx={{ mt: 2 }}>
              <Link
                onClick={() => setOpenForgotPassworModal(true)}
                text="Forgot Password"
                textDecoration="underline"
              />
            </Box>
            <Divider sx={{ mt: 3 }} />
            <Box align="center" sx={{ mt: 2 }}>
              <Link to="/signup" text="Sign Up" textDecoration="underline" />
            </Box> */}
          </Box>
        </Card>
        <ForgotPassword
          openForgotPasswordModal={openForgotPasswordModal}
          email={email}
          setEmail={setEmail}
          setOpenForgotPassworModal={setOpenForgotPassworModal}
        />
        <LoadingBackdrop open={loading} />
      </Container>
    </>
  );
};

export default AdminLogin;
