import React, { useEffect, useState, useRef, lazy, Suspense } from "react";

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
import { currentUser } from "./serverFunctions/auth";
import { Helmet } from "react-helmet";
import wudaLounge from "./restaurants/wudaLounge";
import tankos from "./restaurants/tankos";
import papaye from "./restaurants/papaye";
import LoadingBackdrop from "./components/Feedbacks/LoadingBackdrop";
// import Home from "./pages/Home";

const NotFound = lazy(() => import("./pages/NotFound"));

const Footer = lazy(() => import("./components/Footers/Footer"));

const AdminRoute = lazy(() => import("./components/Routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/Admin"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Menu = lazy(() => import("./pages/Admin/Menu"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Reports = lazy(() => import("./pages/Admin/Reports"));
const Company = lazy(() => import("./pages/Admin/Company"));
const StaffRoute = lazy(() => import("./components/Routes/StaffRoute"));
const StaffLogin = lazy(() => import("./pages/Staff"));
const StaffDashboard = lazy(() => import("./pages/Staff/StaffDashboard"));
const StaffOrders = lazy(() => import("./pages/Staff/StaffOrders"));
const StaffReports = lazy(() => import("./pages/Staff/StaffReports"));

const Home = lazy(() => import("./pages/Home"));
// const LoadingBackdrop = lazy(() =>
//   import("./components/Feedbacks/LoadingBackdrop")
// );
const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(wudaLounge);
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
            <Suspense fallback={LoadingBackdrop}>
              <Home
                restaurantDetails={restaurantDetails}
                setRestaurantDetails={setRestaurantDetails}
                user={user}
                setLoadUser={setLoadUser}
                setUser={setUser}
              />
            </Suspense>
          }
        />

        {/* ///////////////////////Staff/////////////////// */}
        <Route
          exact
          path="/staff/login"
          element={
            <Suspense fallback={LoadingBackdrop}>
              <StaffLogin
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </Suspense>
          }
        />
        <Route
          exact
          path="/staff"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/staff/orders"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
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
            <Suspense fallback={LoadingBackdrop}>
              <AdminLogin
                restaurantDetails={restaurantDetails}
                setUser={setUser}
                user={user}
              />
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/menu"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/reports"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin/company"
          element={
            <Suspense fallback={LoadingBackdrop}>
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
            </Suspense>
          }
        />

        <Route
          exact
          path="*"
          element={
            <Suspense fallback={LoadingBackdrop}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Footer restaurantDetails={restaurantDetails} />
      <LoadingBackdrop open={loading} />
    </ThemeProvider>
  );
};

export default App;
