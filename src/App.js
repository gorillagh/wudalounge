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

import Home from "./pages/Home";

import NotFound from "./pages/NotFound";

import Footer from "./components/Footers/Footer";

import { currentUser } from "./serverFunctions/auth";

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
    // body1: { fontSize: "0.9rem" },
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
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In user", user);
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            let userInfo = {
              _id: res.data._id,
              phoneNumber: res.data.phoneNumber,
              name: res.data.name,
              email: res.data.email ? res.data.email : "",
              addresses: res.data.addresses ? res.data.addresses : [],
              image: res.data.image ? res.data.image : "",
              role: res.data.role,
              token: idTokenResult.token,
              favorites: res.data.favorites ? res.data.favorites : [],
            };
            setUser(userInfo);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: userInfo,
            });
            window.localStorage.setItem("wdUser", JSON.stringify(userInfo));
          })
          .catch((error) => {
            console.log(error);
            if (window.localStorage.getItem("wdUser")) {
              setUser(JSON.parse(window.localStorage.getItem("wdUser")));
              dispatch({
                type: "LOGGED_IN_USER",
                payload: JSON.parse(window.localStorage.getItem("wdUser")),
              });
            }
          });
      } else if (window.localStorage.getItem("wdUser")) {
        setUser(JSON.parse(window.localStorage.getItem("wdUser")));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: JSON.parse(window.localStorage.getItem("wdUser")),
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, loadUser]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer style={{ fontSize: "12px", fontWeight: "bold" }} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home user={user} setLoadUser={setLoadUser} setUser={setUser} />
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
