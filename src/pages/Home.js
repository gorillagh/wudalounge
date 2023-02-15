import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import Subtitle from "../components/Typography/Subtitle";
import {
  AppBar,
  Badge,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { addToNotificationList } from "../serverFunctions/user";
import { Container } from "@mui/system";
import Dish from "../components/PopUps/Dish";
import DishCard from "../components/Cards/DishCard";
import LoadingBackdrop from "../components/Feedbacks/LoadingBackdrop";
import CircularLoading from "../components/Feedbacks/CircularLoading";
import DishNavbar from "../components/Navbars/DishNavbar";
import ViewBasket from "../components/Navbars/ViewBasket";
import Basket from "../components/PopUps/Basket";

import Address from "../components/PopUps/Address";
import PhoneNumber from "../components/PopUps/PhoneNumber";
import AlertSnackbar from "../components/Feedbacks/AlertSnackbar";
import Navbar from "../components/Navbars/Navbar";
import Orders from "../components/PopUps/Orders";
import Profile from "../components/PopUps/Profile";
import Favorites from "../components/PopUps/Favorites";
import Account from "../components/PopUps/Account";
import GoogleMap from "../components/PopUps/GoogleMap";
import AboutUs from "../components/PopUps/AboutUs";
import Search from "../components/PopUps/Search";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ActionButton from "../components/Buttons/ActionButton";

var date1 = new Date(2023, 2, 3, 10, 30, 50, 800);

const infoList = [
  {
    text: "25-45min delivery",
    icon: "delivery_dining",
  },
  {
    text: "50% discount on entire menu",
    icon: "discount",
  },
  {
    text: "Pickup available",
    icon: "check",
  },
];

const userWelcome = [
  {
    text: "Hungry?",
    icon: "thumb_up_off_alt",
  },
  {
    text: "We have something for you ...",
    icon: "mood",
  },
  {
    text: "Check out our dishes...",
    icon: "touch_app",
  },
];

const dishes = [
  {
    _id: "wd0001",
    name: "Ribs on Rails",
    category: { _id: "wds0001", name: "pork" },
    description: "Grilled pork ribs | Vegetables | Yam Chips",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0002",
    name: "Pork SandWich",
    category: { _id: "wds0001", name: "pork" },
    description: "Grilled Shredded Pork | toasted Bread | Vegetables ",
    price: 90,
    image:
      "https://plus.unsplash.com/premium_photo-1664476636559-6dbd29f4c31e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled)",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0003",
    name: "Classic Banh Mi",
    category: { _id: "wds0001", name: "pork" },
    description: "Fried Pork | Baked Beans | Vegetables",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1658925111653-2c08083c08ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled)",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  ////////////////Chicken/////////////////////////
  {
    _id: "wd0004",
    name: "Assorted Chicken Fried Rice",
    category: { _id: "wds0002", name: "chicken" },
    description: "Fried Shredded Chicken | Fried Rice | vegetables",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1637759079728-3f900db7a782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },

  {
    _id: "wd0005",
    name: "Chicken Wings",
    category: { _id: "wds0002", name: "chicken" },
    description: "Grilled Chicken Wings | Vegetables",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1592011432621-f7f576f44484?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0006",
    name: "Brown Grounds",
    category: { _id: "wds0002", name: "chicken" },
    description: "Grilled Chicken | Corn | Vegetables | Fried Eggs",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 60, description: "" },
      { size: "family", additionalAmount: 120, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 30,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 25,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 9, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 9, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "regular", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
];

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertSnackbar, setAlertSnackbar] = useState({ open: false });
  const [cartTotalLoading, setCartTotalLoading] = useState(true);
  const [porkDishes, setPorkDishes] = useState(null);
  const [chickenDishes, setChickenDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState({});
  const [openDishModal, setOpenDishModal] = useState(false);
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState();
  const [discount, setDiscount] = useState(0.5);
  const [scrollTabValue, setScrollTabValue] = useState();
  const [openBasket, setOpenBasket] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [openAccount, setOpenAccount] = useState(false);
  const [openGoogleMap, setOpenGoogleMap] = useState(false);

  useEffect(() => {
    setLoading(true);
    let pkDishes = [];
    let ckDishes = [];
    dishes.map((dish, index) => {
      if (dish.category.name === "pork") pkDishes.push(dish);
      if (dish.category.name === "chicken") ckDishes.push(dish);
    });
    setPorkDishes(pkDishes);
    setChickenDishes(ckDishes);
    setLoading(false);
    // axios
    //   .post(
    //     "https://ghanapostgps.sperixlabs.org/get-location",
    //     {
    //       address: "GA-017-4672",
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("wdCart")) {
      setCart(JSON.parse(window.localStorage.getItem("wdCart")));
    }
  }, [openDishModal]);

  useEffect(() => {
    setCartTotalLoading(true);
    calculateCartTotal(JSON.parse(window.localStorage.getItem("wdCart")));
    setCartTotalLoading(false);
  }, [cart]);

  useEffect(() => {
    let favs = [];
    props.user &&
      props.user.favorites &&
      props.user.favorites.map((favorite, index) => {
        for (var i = 0; i < dishes.length; i++) {
          if (dishes[i]._id === favorite) {
            favs.push(dishes[i]);
            break;
          }
        }
      });
    setFavorites(favs);
  }, [props.user]);

  // const handleSendNotification = async () => {
  //   try {
  //     if (
  //       !String(email)
  //         .toLowerCase()
  //         .match(
  //           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //         )
  //     ) {
  //       toast.error("Please enter a valid email");
  //       return;
  //     }
  //     setLoading(true);

  //     const response = await addToNotificationList(email);
  //     if (response.data === "Email exists")
  //       toast.success(
  //         `You are already on the list. We will send an email to ${email} before and on launch day!`
  //       );
  //     if (response.data === "Ok")
  //       toast.success(
  //         `We will send an email to ${email} before and on launch day!`
  //       );
  //     setEmail("");
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error);
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  const handleDishSelect = async (d) => {
    setOpenDishModal(true);
    setSelectedDish({ ...d, dishQuantity: 1 });
  };
  const handleDishClose = (async) => {
    setOpenDishModal(false);
    setSelectedDish({});
  };

  const calculateCartTotal = async (cart) => {
    setCartTotalLoading(true);
    let total = 0;
    cart &&
      cart.dishes &&
      cart.dishes.length &&
      cart.dishes.map((d, index) => {
        let totalExtras = 0;
        for (var i in d.extras) {
          if (d.extras[i].checked)
            totalExtras =
              totalExtras +
              Number(d.extras[i].additionalAmount) *
                Number(d.extras[i].quantity);
        }

        const subTotal =
          Number(d.dishQuantity) *
          (Number(d.price) +
            Number(d.selectedSize.additionalAmount) +
            Number(totalExtras));

        return (total += subTotal);
      });
    setCartTotal(total);
    setCartTotalLoading(false);
  };

  return (
    <Box>
      <Navbar
        setUser={props.setUser}
        user={props.user}
        setOpenPhoneNumber={setOpenPhoneNumber}
        setOpenProfile={setOpenProfile}
        setOpenFavorites={setOpenFavorites}
        setOpenOrders={setOpenOrders}
        setOpenAccount={setOpenAccount}
        setOpenAboutUs={setOpenAboutUs}
        setOpenSearch={setOpenSearch}
      />
      <Search
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        dishes={dishes}
        setOpenDishModal={setOpenDishModal}
        setSelectedDish={setSelectedDish}
        cart={cart}
        setOpenBasket={setOpenBasket}
      />
      <DishNavbar
        scrollTabValue={scrollTabValue}
        setScrollTabValue={setScrollTabValue}
      />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#fff",
          py: 1,
        }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6} onClick={() => setOpenGoogleMap(true)}>
            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              color="primary.main"
            >
              {" "}
              <Icon color="primary" fontSize="small">
                location_on
              </Icon>
              <Typography variant="body2" fontWeight={500}>
                Ring Rd E, Accra
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              display="flex"
              justifyContent="right"
              alignItems="center"
              color="primary.main"
            >
              <ActionButton
                onClick={() => (document.location.href = "tel:+233244410869")}
                text={<Icon fontSize="small">phone</Icon>}
                variant="outlined"
                fullWidth={false}
                my={0}
                size="small"
              />
              {/* <Icon color="primary" fontSize="small">
                phone
              </Icon>
              <Typography variant="body2" fontWeight={500}>
                +233244410869
              </Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Grid
        container
        justifyContent="left"
        sx={{
          position: "relative",
          color: "#fff",
          p: 0,
          backgroundColor: "#000",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: "url(/hero1.webp)",
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          mb: 2,
        }}
      >
        <Grid item xs={12}>
          {/* <Box textAlign="center" p={2}>
            <Subtitle title="Pork, Chicken and fish meals" />
            <PageTitle title={`Accra, be ready!`} />
            <Box>
              <Countdown
                date={date1}
                renderer={({ hours, minutes, seconds, completed, days }) => {
                  if (completed) {
                    // Render a completed state
                    return <Typography color="#fff">Good to go!</Typography>;
                  } else {
                    // Render a countdown
                    return (
                      <Typography color="secondary" my={5}>
                        <PageTitle
                          title={
                            <>
                              <div>
                                {days}
                                <Typography
                                  component="span"
                                  fontWeight="bold"
                                  color="#fff"
                                  variant="body1"
                                >
                                  days
                                </Typography>
                              </div>
                              <div>
                                {hours}
                                <Typography
                                  component="span"
                                  fontWeight="bold"
                                  color="#fff"
                                  variant="body1"
                                >
                                  hrs
                                </Typography>
                                :{minutes}
                                <Typography
                                  component="span"
                                  fontWeight="bold"
                                  color="#fff"
                                  variant="body1"
                                >
                                  mins
                                </Typography>
                                :{seconds}
                                <Typography
                                  component="span"
                                  fontWeight="bold"
                                  color="#fff"
                                  variant="body1"
                                >
                                  secs
                                </Typography>
                              </div>
                            </>
                          }
                          variant="h2"
                        />
                      </Typography>
                    );
                  }
                }}
              />
            </Box>
            <Typography mt={3} mb={2}>
              Be the first to hear on launch day.
            </Typography>
            <Box textAlign="center" bgcolor="#fff" borderRadius={1} p={1}>
              <TextField
                disabled={loading}
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            {loading ? (
              <CircularProgress sx={{ my: 2 }} />
            ) : (
              <ActionButton
                text="Notify me!"
                onClick={handleSendNotification}
              />
            )}
          </Box> */}
          {/* <Container maxWidth="xl"> */}
          <Box>
            <Carousel
              showIndicators={true}
              autoPlay
              centerMode={false}
              infiniteLoop
              interval={4000}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              swipeable
              emulateTouch
            >
              <Box textAlign="left" p={2}>
                <Box display="flex">
                  <Subtitle
                    color="secondary"
                    mt={0}
                    title={`Hello ${
                      props.user && props.user.name ? props.user.name : "there"
                    },`}
                    mr={1}
                  />
                </Box>
                <List sx={{ p: 0 }} disablePadding>
                  {userWelcome.map((info, index) => (
                    <ListItem key={index} disableGutters disablePadding>
                      <Icon color="secondary" fontSize="small" sx={{ mr: 1.5 }}>
                        {info.icon}
                      </Icon>
                      <ListItemText primary={info.text} />
                    </ListItem>
                  ))}
                </List>
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                  <Subtitle title="we have something for you..." mb={0} />
                  <Icon fontSize="large" color="secondary">
                    mood
                  </Icon>
                </Box> */}
              </Box>

              {dishes.map((dish, index) => (
                <Box
                  position="relative"
                  key={index}
                  display="flex"
                  width="100%"
                  height="40vh"
                >
                  <Box position="absolute" top={12} right={12}>
                    {" "}
                    <ActionButton
                      my={0}
                      size="small"
                      fullWidth={false}
                      text={`GHC${(dish.price - dish.price * discount).toFixed(
                        2
                      )}`}
                      rightIcon="add_shopping_cart"
                      onClick={() => handleDishSelect(dish)}
                    />
                  </Box>

                  <img
                    src={dish.image}
                    alt="dish"
                    width="100%"
                    style={{
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                    }}
                  />
                </Box>
              ))}
              <Box p={2}>
                <Subtitle
                  textAlign="left"
                  mt={0}
                  title="Pork, Chicken and Tilapia dishes"
                />
                <List disablePadding>
                  {infoList.map((info, index) => (
                    <ListItem key={index} disableGutters disablePadding>
                      <Icon color="secondary" fontSize="small" sx={{ mr: 1.5 }}>
                        {info.icon}
                      </Icon>
                      <ListItemText primary={info.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Carousel>
          </Box>
          {/* </Container> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          p: 2,
          // cursor: "pointer",
          borderRadius: "12px",
          background: "rgba(255,255,255, 0.6)",

          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          webkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Subtitle id="0" mt={0} mb={3} title="Pork Dishes" fontWeight={700} />
        {porkDishes ? (
          <DishCard
            dishes={porkDishes}
            handleDishSelect={handleDishSelect}
            discount={discount}
            cart={cart}
          />
        ) : (
          ""
        )}
        <Divider sx={{ my: 2 }} />
        <Subtitle
          id="1"
          mt={4}
          mb={3}
          title="Chicken Dishes"
          fontWeight={700}
        />
        {chickenDishes ? (
          <DishCard
            dishes={chickenDishes}
            handleDishSelect={handleDishSelect}
            discount={discount}
            cart={cart}
          />
        ) : (
          ""
        )}
      </Box>

      {selectedDish ? (
        <Dish
          id="#targetElementId"
          open={openDishModal}
          dish={selectedDish}
          setDish={setSelectedDish}
          discount={discount}
          onClose={handleDishClose}
          user={props.user && props.user}
          setLoadUser={props.setLoadUser}
          setUser={props.setUser && props.setUser}
          cart={cart}
          setCart={setCart}
          setAlertSnackbar={setAlertSnackbar}
          setOpenPhoneNumber={setOpenPhoneNumber}
          // ref={targetRef}
        />
      ) : (
        ""
      )}
      {cart && cart.dishes && cart.dishes.length ? (
        <ViewBasket
          cartTotal={cartTotal}
          cartTotalLoading={cartTotalLoading}
          discount={discount}
          onClick={() => setOpenBasket(true)}
          cart={cart}
        />
      ) : (
        ""
      )}
      <Basket
        cart={cart}
        setCart={setCart}
        discount={discount}
        open={openBasket}
        onClose={() => setOpenBasket(false)}
        cartTotal={cartTotal}
        setCartTotal={setCartTotal}
        setOpenDishModal={setOpenDishModal}
        setSelectedDish={setSelectedDish}
        setOpenAddress={setOpenAddress}
        setOpenPhoneNumber={setOpenPhoneNumber}
        user={props.user}
        setAlertSnackbar={setAlertSnackbar}
        setOpenOrders={setOpenOrders}
      />

      <PhoneNumber
        open={openPhoneNumber}
        onClose={() => setOpenPhoneNumber(false)}
        user={props.user}
        setUser={props.setUser}
        setOpenAddress={setOpenAddress}
        setAlertSnackbar={setAlertSnackbar}
      />
      {props.user ? (
        <>
          <Address
            open={openAddress}
            onClose={() => setOpenAddress(false)}
            user={props.user}
            setUser={props.setUser}
            setAlertSnackbar={setAlertSnackbar}
          />
          <Profile
            open={openProfile}
            onClose={() => setOpenProfile(false)}
            user={props.user}
            setUser={props.setUser}
            setAlertSnackbar={setAlertSnackbar}
          />
          <Favorites
            open={openFavorites}
            onClose={() => setOpenFavorites(false)}
            user={props.user}
            favorites={favorites}
            discount={discount}
            setUser={props.setUser}
            setAlertSnackbar={setAlertSnackbar}
            setOpenDishModal={setOpenDishModal}
            setSelectedDish={setSelectedDish}
            cart={cart}
            setCart={setCart}
            setOpenBasket={setOpenBasket}
          />
          <Orders
            open={openOrders}
            onClose={() => setOpenOrders(false)}
            user={props.user}
            setCart={setCart}
            setOpenBasket={setOpenBasket}
            cart={cart}
          />
          <Account
            open={openAccount}
            onClose={() => setOpenAccount(false)}
            user={props.user}
            setOpenAddress={setOpenAddress}
          />
        </>
      ) : (
        ""
      )}
      <AboutUs open={openAboutUs} onClose={() => setOpenAboutUs(false)} />
      <LoadingBackdrop open={loading} />
      <AlertSnackbar
        open={alertSnackbar.open}
        onClose={() =>
          setAlertSnackbar((prevState) => ({ ...prevState, open: false }))
        }
        text={alertSnackbar.text}
        severity={alertSnackbar.severity}
      />
      <GoogleMap open={openGoogleMap} onClose={() => setOpenGoogleMap(false)} />
    </Box>
  );
};

export default Home;
