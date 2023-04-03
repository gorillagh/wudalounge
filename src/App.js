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

const wudaLounge = {
  name: "Wuda Lounge",
  shortName: "Wuda",
  nameExtension: "Lounge",
  orderDuration: 20,
  contact: {
    email: "support@wudalounge.com",
    phoneNumber: "+233244885739",
    socials: {
      facebook: {
        url: "https://www.facebook.com/chanchoman1",
        webUrl: "fb://profile/chanchoman1",
      },
      instagram: {
        webUrl: "instagram://user?username=governor_narh",
        url: "https://www.instagram.com/governor_narh",
      },
      twitter: {
        webUrl: "twitter://user?screen_name=governornarh",
        url: "https://www.twitter.com/governornarh",
      },
      snapchat: {
        webUrl: "snapchat://add/wudalounge",
        url: "https://www.snapchat.com/add/chancho",
      },
      whatsapp: { number: "+233244885739" },
    },
  },
  about: {
    texts: [
      "Welcome to Wuda Lounge, a family-owned and operated restauran that offers delicious and fresh meals for dine-in and delivery. We believe in using only the finest ingredients and preparing each dish to perfection, ensuring that every bite is memorable. From classic comfort foods to contemporary cuisine, we have something for everyone.",
      "Let us bring our passion for food to your door, and experience the taste of Wuda Lounge in the comfort of your own home.",
    ],
    photos: [
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1675981586/IMG-0735_g5fyvp.jpg",
    ],
  },
  address: {
    googleAddress: { lng: -0.18671566160150527, lat: 5.569976708828936 },
    description: "Opposite Police Headquaters Gate 1, Ring Rd E, Accra",
    shortDescription: "Ring Rd E, Accra",
  },
  workingHours: [
    { day: "Monday", start: "11:00", close: "23:00" },
    { day: "Tuesday", start: "11:00", close: "23:00" },
    { day: "Wednesday", start: "11:00", close: "23:00" },
    { day: "Thursday", start: "11:00", close: "23:00" },
    { day: "Friday", start: "11:00", close: "23:00" },
    { day: "Saturday", start: "11:00", close: "23:00" },
    { day: "Sunday", start: "13:00", close: "23:00" },
  ],
  theme: {
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
  },
};
const tankos = {
  name: "Tanko's Kitchen",
  shortName: "Tanko's",
  nameExtension: "Kitchen",
  orderDuration: 20,
  address: {
    description:
      "Dansoman High Street, Accra, near Kojoshoes and adjacent Ensu Nyame Ye",
    shortDescription: "Dansoman, Sakaman",
    googleAddress: {
      lng: -0.2706717944753955,
      lat: 5.569252300035966,
      description:
        "Tanko’s Kitchen Dansoman, Dansoman High Street, Accra, Ghana",
      matched_substrings: [
        {
          length: 5,
          offset: 0,
        },
      ],
      place_id: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
      reference: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
      structured_formatting: {
        main_text: "Tanko’s Kitchen Dansoman",
        main_text_matched_substrings: [
          {
            length: 5,
            offset: 0,
          },
        ],
        secondary_text: "Dansoman High Street, Accra, Ghana",
      },
      terms: [
        {
          offset: 0,
          value: "Tanko’s Kitchen Dansoman",
        },
        {
          offset: 26,
          value: "Dansoman High Street",
        },
        {
          offset: 48,
          value: "Accra",
        },
        {
          offset: 55,
          value: "Ghana",
        },
      ],
      types: ["restaurant", "point_of_interest", "food", "establishment"],
    },
    url: "https://www.wudalounge.com",
  },
  contact: {
    email: "support@tankoskitchen.com",
    phoneNumber: "+233547315747",
    socials: {
      facebook: {
        url: "https://web.facebook.com/talatatankoskitchen",
        webUrl: "fb://profile/talatatankoskitchen",
      },
      instagram: {
        url: "https://www.instagram.com/tankos_kitchen",
        webUrl: "instagram://user?username=tankos_kitchen",
      },
      twitter: { url: "", webUrl: "" },
      snapchat: { url: "", webUrl: "" },
      whatsapp: { number: "+233547315747" },
      boltFood: { url: "https://food.bolt.eu/en-US/137/p/38734-veggie-box" },
    },
  },
  about: {
    texts: [
      "Welcome to Tanko's Kitchen, a restaurant that is dedicated to providing delicious food, excellent service, and a memorable dining experience",
      "Our restaurant is named after our founder, Tanko, who has a passion for food and a love for sharing it with others. Tanko's Kitchen is a family-owned and operated business, and we have been serving our customers since 1994",
      "We believe that food is not just about sustenance, but also about bringing people together. That's why we strive to create a warm and welcoming atmosphere in our restaurant, where everyone can come together to enjoy great food and good company.",
      "At Tanko's Kitchen, we take pride in using only the freshest and highest quality ingredients in all of our dishes. Our menu features a variety of dishes inspired by traditional and modern cuisine, including our signature [insert popular dish]. We also offer a selection of vegetarian and gluten-free options, so that everyone can find something to enjoy",
      "Our staff is dedicated to providing excellent service and making sure that every customer leaves happy and satisfied. Whether you're coming in for a quick lunch or a special occasion dinner, we are here to make your experience at Tanko's Kitchen a memorable one.",
      "Thank you for choosing Tanko's Kitchen. We look forward to serving you soon.",
    ],
    photos: [
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1680432058/tk_about0_odcij8.jpg",
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1680432058/tk_about2_s9eao6.jpg",
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1680432058/tk_about3_epo3um.jpg",
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1680432057/tk_about1_ag8jxj.jpg",
    ],
  },
  workingHours: [
    { day: "Monday", start: "11:00", close: "23:00" },
    { day: "Tuesday", start: "11:00", close: "23:00" },
    { day: "Wednesday", start: "11:00", close: "23:00" },
    { day: "Thursday", start: "11:00", close: "23:00" },
    { day: "Friday", start: "11:00", close: "23:00" },
    { day: "Saturday", start: "11:00", close: "23:00" },
    { day: "Sunday", start: "13:00", close: "23:00" },
  ],

  theme: {
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
  },
};
const restaurantDetails = tankos;

let theme = createTheme({
  ...restaurantDetails.theme,
});
theme = responsiveFontSizes(theme);

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              restaurantDetails={restaurantDetails}
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
          element={<StaffLogin setUser={setUser} user={user} />}
        />
        <Route
          exact
          path="/staff"
          element={
            <StaffRoute setUser={setUser} user={user}>
              <StaffDashboard setUser={setUser} user={user} />
            </StaffRoute>
          }
        />
        <Route
          exact
          path="/staff/orders"
          element={
            <StaffRoute setUser={setUser} user={user}>
              <StaffOrders setUser={setUser} user={user} />
            </StaffRoute>
          }
        />
        <Route
          exact
          path="/staff/reports"
          element={
            <StaffRoute setUser={setUser} user={user}>
              <StaffReports setUser={setUser} user={user} />
            </StaffRoute>
          }
        />

        {/* ///////////////Adim////////////////////////// */}
        <Route
          exact
          path="/admin/login"
          element={<AdminLogin setUser={setUser} user={user} />}
        />
        <Route
          exact
          path="/admin"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <AdminDashboard setUser={setUser} user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <Orders setUser={setUser} user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/menu"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <Menu setUser={setUser} user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <Users setUser={setUser} user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/reports"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <Reports setUser={setUser} user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/company"
          element={
            <AdminRoute setUser={setUser} user={user}>
              <Company setUser={setUser} user={user} />
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
