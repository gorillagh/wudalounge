import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Subtitle from "../components/Typography/Subtitle";
import {
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { getDishes } from "../serverFunctions/dish";
import { Container } from "@mui/system";
import Dish from "../components/PopUps/Dish";
import DishCard from "../components/Cards/DishCard";
import LoadingBackdrop from "../components/Feedbacks/LoadingBackdrop";
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

const Home = (props) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const [pinAddress, setPinAddress] = useState(null);

  const [openAccount, setOpenAccount] = useState(false);
  const [openGoogleMap, setOpenGoogleMap] = useState(false);

  const [room, setRoom] = useState(null);

  const loadDishes = async () => {
    try {
      setLoading(true);
      let pkDishes = [];
      let ckDishes = [];

      const dbDishes = await getDishes();
      setDishes(dbDishes.data.dishes);
      setCategories(dbDishes.data.categories);
      dbDishes.data.dishes.map((dish, index) => {
        dish.name = dish.name.charAt(0).toUpperCase() + dish.name.slice(1);
        if (dish.category.name === "pork") pkDishes.push(dish);
        if (dish.category.name === "chicken") ckDishes.push(dish);
      });
      setPorkDishes(pkDishes);
      setChickenDishes(ckDishes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const openTime = new Date().setHours(11, 0, 0); // set opening time to 10:00am
    const closeTime = new Date().setHours(23, 0, 0); // set closing time to 11:00pm

    const currentTime = new Date(); // get the current time

    if (
      currentTime.getTime() >= openTime &&
      currentTime.getTime() <= closeTime
    ) {
      setAlertSnackbar({
        open: true,
        text: "We are open now!",
        severity: "success",
        variant: "filled",
        autoHideDuration: 3000,
      });
    } else {
      setAlertSnackbar({
        open: true,
        text: "Pickups and deliveries start at 11:30am .",
        severity: "warning",
        variant: "filled",
        autoHideDuration: 10000,
      });
    }
  }, []);
  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    window.alert(latitude, longitude);
    // Use the latitude and longitude data to verify the customer's location
  }
  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //   console.log("Geolocation is not supported by this browser");
    // }

    // const query = new URLSearchParams(window.location.search);
    // const data = Object.fromEntries(query.entries());
    // setRoom(data.room);
    loadDishes();
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
    dishes &&
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

  const handleDishSelect = async (d) => {
    setOpenDishModal(true);
    setSelectedDish({
      ...d,
      dishQuantity: 1,
      selectedSize: d.sizes.find((item) => item.size === "regular"),
    });
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

        let selectedSizeAdditionalAmount;
        if (d.selectedSize && d.selectedSize.additionalAmount)
          selectedSizeAdditionalAmount = Number(
            d.selectedSize.additionalAmount
          );
        else selectedSizeAdditionalAmount = 0;
        const subTotal =
          Number(d.dishQuantity) *
          (Number(d.price) +
            selectedSizeAdditionalAmount +
            Number(totalExtras));

        return (total += subTotal);
      });
    setCartTotal(total);
    setCartTotalLoading(false);
  };

  return (
    <Box>
      <Navbar
        restaurantDetails={props.restaurantDetails}
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
          py: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            onClick={() => setOpenGoogleMap(true)}
            display="flex"
            justifyContent="left"
            alignItems="center"
            color="primary.main"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {" "}
            <Icon color="primary" fontSize="small">
              location_on
            </Icon>
            <Typography variant="" fontWeight={500}>
              {props.restaurantDetails.address.shortDescription}
            </Typography>
            <Icon color="info">arrow_drop_down</Icon>
            {room ? (
              <>
                <Typography variant="body2" fontWeight={500}>
                  room:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {room}
                </Typography>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box color="primary.main">
            <ActionButton
              onClick={() =>
                (document.location.href = `tel:${props.restaurantDetails.contact.phoneNumber}`)
              }
              text={<Icon fontSize="small">phone</Icon>}
              variant="outlined"
              fullWidth={false}
              my={0}
              size="small"
            />
          </Box>
        </Box>
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
              </Box>

              {dishes &&
                dishes.map((dish, index) => (
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
                        text={`GHC${(
                          dish.price -
                          dish.price * discount
                        ).toFixed(2)}`}
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
        </Grid>
      </Grid>

      {/* <Box
        display="flex"
        justifyContent="left"
        alignItems="center"
        color="primary.main"
        p={2}
        pt={0}
      >
        {" "}
        <Icon color="primary" fontSize="small">
          location_on
        </Icon>
        <Typography variant="body2" fontWeight={500}>
          Enter your location to see delivery time
        </Typography>
      </Box> */}
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
        restaurantDetails={props.restaurantDetails}
        pinAddress={pinAddress}
        setPinAddress={setPinAddress}
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
            setPinAddress={setPinAddress}
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
      <AboutUs
        restaurantDetails={props.restaurantDetails}
        open={openAboutUs}
        onClose={() => setOpenAboutUs(false)}
      />
      <LoadingBackdrop open={loading} />
      <AlertSnackbar
        open={alertSnackbar.open}
        onClose={() =>
          setAlertSnackbar((prevState) => ({ ...prevState, open: false }))
        }
        text={alertSnackbar.text}
        severity={alertSnackbar.severity}
        variant={alertSnackbar.variant}
        autoHideDuration={alertSnackbar.autoHideDuration}
      />
      <GoogleMap
        restaurantDetails={props.restaurantDetails}
        setRestaurantDetails={props.setRestaurantDetails}
        restaurants={props.restaurants}
        open={openGoogleMap}
        onClose={() => setOpenGoogleMap(false)}
      />
    </Box>
  );
};

export default Home;
