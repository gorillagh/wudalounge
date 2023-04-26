import React, { useEffect, useState, useRef } from "react";
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
import { signOut } from "firebase/auth";
import Home from "./pages/Home";

import NotFound from "./pages/NotFound";

import Footer from "./components/Footers/Footer";

import { currentUser } from "./serverFunctions/auth";
import LoadingBackdrop from "./components/Feedbacks/LoadingBackdrop";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { getUser } from "./serverFunctions/user";
import AdminLogin from "./pages/Admin";
import Orders from "./pages/Admin/Orders";
import Menu from "./pages/Admin/Menu";
import Users from "./pages/Admin/Users";
import Reports from "./pages/Admin/Reports";
import Company from "./pages/Admin/Company";
import StaffRoute from "./components/Routes/StaffRoute";
import StaffLogin from "./pages/Staff";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffOrders from "./pages/Staff/StaffOrders";
import StaffReports from "./pages/Staff/StaffReports";
import { Helmet } from "react-helmet";
import wudaLounge from "./restaurants/wudaLounge";
import tankos from "./restaurants/tankos";
import papaye from "./restaurants/papaye";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(papaye);
  let theme = createTheme({
    ...restaurantDetails.theme,
  });
  theme = responsiveFontSizes(theme);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In user", user);
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            let userInfo = null;
            if (res.data) {
              userInfo = {
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
            }

            setUser(userInfo);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: userInfo,
            });
            window.localStorage.setItem("wdUser", JSON.stringify(userInfo));
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log("Error----->", error);
            // if (window.localStorage.getItem("wdUser")) {
            //   setUser(JSON.parse(window.localStorage.getItem("wdUser")));
            //   dispatch({
            //     type: "LOGGED_IN_USER",
            //     payload: JSON.parse(window.localStorage.getItem("wdUser")),
            //   });
            // }
          });
      }
      // else if (window.localStorage.getItem("wdUser")) {
      //   const data = JSON.parse(window.localStorage.getItem("wdUser"));
      //   const response = await getUser(data._id);
      //   if (response.data) {
      //     setUser(JSON.parse(window.localStorage.getItem("wdUser")));
      //     dispatch({
      //       type: "LOGGED_IN_USER",
      //       payload: JSON.parse(window.localStorage.getItem("wdUser")),
      //     });
      //     setLoading(false);
      //   } else {
      //     window.localStorage.removeItem("wdUser");
      //   }
      // }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch, loadUser]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer style={{ fontSize: "12px", fontWeight: "bold" }} />
      <Helmet>
        <title>{restaurantDetails.name}</title>
        <link
          rel="icon"
          type="image/png"
          href={`/${restaurantDetails.path}/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/${restaurantDetails.path}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/${restaurantDetails.path}/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`/${restaurantDetails.path}/site.webmanifest`}
        />
        <link rel="icon" href={`/${restaurantDetails.path}/favicon.ico`} />
      </Helmet>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              restaurantDetails={restaurantDetails}
              setRestaurantDetails={setRestaurantDetails}
              user={user}
              setLoadUser={setLoadUser}
              setUser={setUser}
            />
          }
        />

        {/* ///////////////////////Staff/////////////////// */}
        <Route
          exact
          path="/staff/login"
          element={
            <StaffLogin
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            />
          }
        />
        <Route
          exact
          path="/staff"
          element={
            <StaffRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <StaffDashboard
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </StaffRoute>
          }
        />
        <Route
          exact
          path="/staff/orders"
          element={
            <StaffRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <StaffOrders
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </StaffRoute>
          }
        />
        <Route
          exact
          path="/staff/reports"
          element={
            <StaffRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <StaffReports
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </StaffRoute>
          }
        />

        {/* ///////////////Adim////////////////////////// */}
        <Route
          exact
          path="/admin/login"
          element={
            <AdminLogin
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            />
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <AdminDashboard
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <Orders
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/menu"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <Menu
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <Users
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/reports"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <Reports
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/company"
          element={
            <AdminRoute
              restaurantDetails={restaurantDetails}
              setUser={setUser}
              user={user}
            >
              <Company
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </AdminRoute>
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer restaurantDetails={restaurantDetails} />
      <LoadingBackdrop open={loading} />
    </ThemeProvider>
  );
};

export default App;
