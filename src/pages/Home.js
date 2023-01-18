import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ActionButton from "../components/Buttons/ActionButton";
import PageTitle from "../components/Typography/PageTitle";
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
import ShowOnScroll from "../components/Navbars/ShowOnScroll";
import DishNavbar from "../components/Navbars/DishNavbar";
import ViewBasket from "../components/Navbars/ViewBasket";
import Basket from "../components/PopUps/Basket";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

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
      { size: "normal", additionalAmount: 0, description: "" },
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
      { size: "normal", additionalAmount: 0, description: "" },
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
      { size: "normal", additionalAmount: 0, description: "" },
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
      { size: "normal", additionalAmount: 0, description: "" },
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
      { size: "normal", additionalAmount: 0, description: "" },
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
      { size: "normal", additionalAmount: 0, description: "" },
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
  const [targetElement, setTargetElement] = useState(null);
  const targetRef = React.useRef();

  useEffect(() => {
    setTargetElement(document.querySelector("#targetElementId"));
    // setTargetElement(targetRef.current);
    // clearAllBodyScrollLocks();
  }, [openDishModal, targetRef]);

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

  // useEffect(()=>{
  //   calculateCartTotal(JSON.parse(window.localStorage.getItem('wdCart')))
  // },[cart])

  const handleSendNotification = async () => {
    try {
      if (
        !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        toast.error("Please enter a valid email");
        return;
      }
      setLoading(true);

      const response = await addToNotificationList(email);
      if (response.data === "Email exists")
        toast.success(
          `You are already on the list. We will send an email to ${email} before and on launch day!`
        );
      if (response.data === "Ok")
        toast.success(
          `We will send an email to ${email} before and on launch day!`
        );
      setEmail("");
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
      console.log(error);
    }
  };
  const handleDishSelect = async (d) => {
    setSelectedDish({ ...d, dishQuantity: 1 });
    setOpenDishModal(true);
    disableBodyScroll(targetElement);
  };
  const handleDishClose = (async) => {
    setOpenDishModal(false);
    enableBodyScroll(targetElement);
    console.log(targetElement);
  };

  const calculateCartTotal = (cart) => {
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
          close={handleDishClose}
          user={props.user && props.user}
          setLoadUser={props.setLoadUser}
          setUser={props.setUser && props.setUser}
          cart={cart}
          setCart={setCart}
          ref={targetRef}
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
        />
      ) : (
        ""
      )}
      <Basket
        cart={cart}
        setCart={setCart}
        discount={discount}
        open={openBasket}
        close={() => setOpenBasket(false)}
      />
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default Home;
