import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import UserRoute from "./components/Routes/UserRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SignupComplete from "./pages/auth/SignupComplete";

import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbars/Navbar";
import { Container } from "@mui/system";
import Footer from "./components/Footers/Footer";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { currentUser } from "./serverFunctions/auth";
import AdminRoute from "./components/Routes/AdminRoute";
import Account from "./pages/user/Account";
import Profile from "./pages/user/Profile";
import EmailChange from "./pages/user/EmailChange";

import AdminAccount from "./pages/admin/AdminAccount";
import AdminProfile from "./pages/admin/AdminProfile";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // light: "#f8bd49",
      // dark: "#c68507",
      // main: "#f6a60b",
      light: "#ea8255",
      main: "#E3581C",
      dark: "#b64616",
      contrastText: "#fff",
    },
    secondary: {
      // light: "#f88054",
      // main: "#f65114",
      // dark:'#cd3d08',
      light: "#f8bd49",
      main: "#f6a60b",
      dark: "c68507",
      contrastText: "#fff",
    },
    highlight: "#fee5b9",
    error: {
      main: "#ce0018",
      light: "#ff0220",
      dark: "#a50013",
      contrastText: "#fff",
    },
    info: {
      main: "#784af4",
      light: "#b095f9",
      dark: "#4c0ff0",
      contrastText: "#fff",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },

  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: [
      // "Ubuntu",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontFamily: "Ubuntu",
    },
    h4: {
      fontFamily: "Ubuntu",
    },
    body1: { fontSize: "0.9rem" },
    body2: {
      fontSize: "0.8rem",
      color: "text.secondary",
      fontWeight: "300",
    },
  },
});
theme = responsiveFontSizes(theme);

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    let userInfo = {
      _id: "wdlu00001",
      role: "subscriber",
      name: "Wuda Lounge",
      email: "tsekowudalounge@gmail.com",
      number: "+233244410689",
      favorites: ["wd0001", "wd0002", "wd0003", "wd0004", "wd0005"],
    };
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In user", user);
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            setUser({
              email: res.data.email,
              role: res.data.role,
              name: res.data.name,
              token: idTokenResult.token,
              phoneNumber: res.data.phoneNumber ? res.data.phoneNumber : "",
              _id: res.data._id,
              favorites: [],
            });
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.email,
                role: res.data.role,
                name: res.data.name,
                token: idTokenResult.token,
                phoneNumber: res.data.phoneNumber ? res.data.phoneNumber : "",
                _id: res.data._id,
                favorites: [],
              },
            });
            window.localStorage.setItem(
              "wdUser",
              JSON.stringify({
                email: res.data.email,
                role: res.data.role,
                name: res.data.name,
                token: idTokenResult.token,
                phoneNumber: res.data.phoneNumber ? res.data.phoneNumber : "",
                _id: res.data._id,
                favorites: [],
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (window.localStorage.getItem("wdUser")) {
        setUser(JSON.parse(window.localStorage.getItem("wdUser")));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: JSON.parse(window.localStorage.getItem("wdUser")),
        });
      }
      // else {
      //   dispatch({
      //     type: "LOGGED_IN_USER",
      //     payload: userInfo,
      //   });
      //   window.localStorage.setItem("wdUser", JSON.stringify(userInfo));
      //   setUser(userInfo);
      // }
    });

    return () => unsubscribe();
  }, [dispatch, loadUser]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <ToastContainer style={{ fontSize: "12px", fontWeight: "bold" }} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home user={user} setLoadUser={setLoadUser} setUser={setUser} />
          }
        />

        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup/complete" element={<SignupComplete />} />

        <Route
          exact
          path="/my/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />

        <Route
          exact
          path="/my/account"
          element={
            <UserRoute>
              <Account />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/my/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/email/change"
          element={
            <UserRoute>
              <EmailChange />
            </UserRoute>
          }
        />

        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/account"
          element={
            <AdminRoute>
              <AdminAccount />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
