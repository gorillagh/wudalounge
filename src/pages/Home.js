import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Subtitle from "../components/Typography/Subtitle";
import {
  AppBar,
  Badge,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Icon,
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

const dbPorkDishes = [
  {
    _id: "wd0001",
    name: "Ribs on Rails",
    description: "Grilled pork ribs | Vegetables | Yam Chips",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0002",
    name: "Pork SandWich",
    description: "Grilled Shredded Pork | toasted Bread | Vegetables ",
    price: 30,
    image:
      "https://plus.unsplash.com/premium_photo-1664476636559-6dbd29f4c31e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0003",
    name: "Classic Banh Mi",
    description: "Fried Pork | Baked Beans | Vegetables",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1658925111653-2c08083c08ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
];

const dbChickenDishes = [
  {
    _id: "wd0004",
    name: "Assorted Chicken Fried Rice",
    description: "Fried Shredded Chicken | Fried Rice | vegetables",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1637759079728-3f900db7a782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },

  {
    _id: "wd0005",
    name: "Chicken Wings",
    description: "Grilled Chicken Wings | Vegetables",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1592011432621-f7f576f44484?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
    dishQuantity: 1,
  },
  {
    _id: "wd0006",
    name: "Brown Grounds",
    description: "Grilled Chicken | Corn | Vegetables | Fried Eggs",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    sizes: [
      { size: "regular", additionalAmount: 0, description: "" },
      { size: "large", additionalAmount: 20, description: "" },
      { size: "family", additionalAmount: 40, description: "" },
    ],
    extras: [
      {
        item: "Pork(Grilled",
        additionalAmount: 5,
        checked: false,
        quantity: 1,
      },
      {
        item: "Chicken(Grilled)",
        additionalAmount: 4,
        checked: false,
        quantity: 1,
      },
      { item: "Kenkey", additionalAmount: 2, checked: false, quantity: 1 },
      { item: "Banku", additionalAmount: 2, checked: false, quantity: 1 },
    ],
    selectedSize: { size: "normal", additionalAmount: 0, description: "" },
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
  const [openAccount, setOpenAccount] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPorkDishes(dbPorkDishes);
    setChickenDishes(dbChickenDishes);
    setLoading(false);
  });

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
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {" "}
              <Icon color="primary" fontSize="small">
                location_on
              </Icon>
              <Typography variant="body2">Ring Rd E, Accra</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Icon color="primary" fontSize="small">
                phone
              </Icon>
              <Typography variant="body2">+233244410869</Typography>
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
          py: 3,
          backgroundColor: "#000",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: "url(/hero1.webp)",
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          mb: 1.5,
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
          <Container maxWidth="xl">
            <Subtitle mt={0} title="Pork, Chicken and Tilapia dishes" />
            <List sx={{ p: 0 }} disablePadding>
              {infoList.map((info, index) => (
                <ListItem key={index} disableGutters disablePadding>
                  <Icon color="secondary" fontSize="small" sx={{ mr: 1.5 }}>
                    {info.icon}
                  </Icon>
                  <ListItemText primary={info.text} />
                </ListItem>
              ))}
            </List>
          </Container>
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
          />
          <Favorites
            open={openFavorites}
            onClose={() => setOpenFavorites(false)}
            user={props.user}
          />
          <Orders
            open={openOrders}
            onClose={() => setOpenOrders(false)}
            user={props.user}
          />
          <Account
            open={openAccount}
            onClose={() => setOpenAccount(false)}
            user={props.user}
          />
        </>
      ) : (
        ""
      )}

      <LoadingBackdrop open={loading} />
      <AlertSnackbar
        open={alertSnackbar.open}
        onClose={() =>
          setAlertSnackbar((prevState) => ({ ...prevState, open: false }))
        }
        text={alertSnackbar.text}
        severity={alertSnackbar.severity}
      />
    </Box>
  );
};

export default Home;
