import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ActionButton from "../components/Buttons/ActionButton";
import PageTitle from "../components/Typography/PageTitle";
import Subtitle from "../components/Typography/Subtitle";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { addToNotificationList } from "../serverFunctions/user";
import { Container } from "@mui/system";
import Dish from "../components/PopUps/Dish";

var date1 = new Date(2023, 2, 3, 10, 30, 50, 800);

const contactInfo = [
  {
    text: "Ring Rd E, Accra",
    icon: "location_on",
  },
  {
    text: "+233244410869",
    icon: "phone",
  },
];
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

const porkDishes = [
  {
    name: "Baked Pork Chops",
    description: "Grilled Chopped Pork | vegetables",
    price: 40,
    discountedPrice: 20,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    name: "Pork SandWich",
    description: "Grilled Shredded Pork | toasted Bread | Vegetables ",
    price: 30,
    discountedPrice: 15,
    image:
      "https://plus.unsplash.com/premium_photo-1664476636559-6dbd29f4c31e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },
  {
    name: "Classic Banh Mi",
    description: "Fried Pork | Baked Beans | Vegetables",
    price: 40,
    discountedPrice: 20,
    image:
      "https://images.unsplash.com/photo-1658925111653-2c08083c08ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Ribs on Rails",
    description: "Grilled pork ribs | Vegetables | Yam Chips",
    price: 30,
    discountedPrice: 15,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
  },
];

const chickenDishes = [
  {
    name: "Assorted Chicken Fried Rice",
    description: "Fried Shredded Chicken | Fried Rice | vegetables",
    price: 30,
    discountedPrice: 15,
    image:
      "https://images.unsplash.com/photo-1637759079728-3f900db7a782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
  },
  {
    name: "Chicken Wings",
    description: "Grilled Chicken Wings | Vegetables",
    price: 35,
    discountedPrice: 18,
    image:
      "https://images.unsplash.com/photo-1592011432621-f7f576f44484?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Brown Grounds",
    description: "Grilled Chicken | Corn | Vegetables | Fried Eggs",
    price: 60,
    discountedPrice: 30,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Wuda Special",
    description: "Fried Chopped Chicken | Roasted Vegetables | Sauce",
    price: 70,
    discountedPrice: 35,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80",
  },
];

const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState({});
  const [openDishModal, setOpenDishModal] = useState(false);
  const [overflowStyle, setOverflowStyle] = useState("inital");

  useEffect(() => {
    if (openDishModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [openDishModal]);

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
    setSelectedDish(d);
    setOpenDishModal(true);
  };
  const handleDishModalClose = async () => {
    setSelectedDish({});
    setOpenDishModal(false);
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container my={1} justifyContent="center">
          {contactInfo.map((info, index) => (
            <>
              <Grid item xs={1} md={0.4}>
                <Icon color="secondary" fontSize="small">
                  {info.icon}
                </Icon>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">{info.text}</Typography>
              </Grid>
            </>
          ))}
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
          // borderRadius: 1,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          mb: 1.5,
          // pb: 50,
          // px: 2,
        }}
      >
        <Grid item xs={12}>
          {/* <Box textAlign="center">
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
            <ActionButton text="Notify me!" onClick={handleSendNotification} />
          )}
        </Box> */}
          <Container maxWidth="xl">
            <Subtitle mt={0} title="Pork, Chicken and Tilapia dishes" />
            <List sx={{ p: 0 }} disablePadding>
              {infoList.map((info, index) => (
                <ListItem disableGutters disablePadding>
                  <Icon color="primary" fontSize="small" sx={{ mr: 1.5 }}>
                    {info.icon}
                  </Icon>
                  <ListItemText primary={info.text} />
                  {/* <Icon color="primary">info</Icon> */}
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
        <Subtitle mt={0} mb={3} title="Pork Dishes" fontWeight={700} />
        <Box>
          {porkDishes.map((d, i) => (
            <Box key={i}>
              <Grid
                sx={{ cursor: "pointer" }}
                container
                spacing={1}
                onClick={() => handleDishSelect(d)}
              >
                <Grid item xs={7} md={4}>
                  <Typography fontWeight={600}>{d.name}</Typography>

                  <Typography
                    maxHeight="36.60px"
                    my={0.5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    // whiteSpace="nowrap"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      py: 1,
                      mr: 1,
                      textDecoration: "line-through",
                    }}
                    variant="body2"
                    component="span"
                    color="text.secondary"
                  >
                    GHC{d.price}
                  </Typography>
                  <Chip
                    label={
                      <Typography variant="body2" fontWeight={600}>
                        GHC{d.discountedPrice}
                      </Typography>
                    }
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={5} md={2}>
                  <Box height={{ xs: "100px", md: "120px" }}>
                    <img
                      style={{ borderRadius: "12px", height: "100%" }}
                      alt="pork dish"
                      src={d.image}
                      width="100%"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Box>
        <Subtitle mt={4} mb={3} title="Chicken Dishes" fontWeight={700} />
        <Box>
          {chickenDishes.map((d, i) => (
            <Box key={i}>
              <Grid
                sx={{ cursor: "pointer" }}
                container
                spacing={1}
                onClick={() => handleDishSelect(d)}
              >
                <Grid item xs={7} md={4}>
                  <Typography fontWeight={600}>{d.name}</Typography>

                  <Typography
                    maxHeight="36.60px"
                    my={0.5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    // whiteSpace="nowrap"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      py: 1,
                      mr: 1,
                      textDecoration: "line-through",
                    }}
                    variant="body2"
                    component="span"
                    color="text.secondary"
                  >
                    GHC{d.price}
                  </Typography>
                  <Chip
                    label={
                      <Typography variant="body2" fontWeight={600}>
                        GHC{d.discountedPrice}
                      </Typography>
                    }
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={5} md={2}>
                  <Box height={{ xs: "100px", md: "120px" }}>
                    <img
                      style={{ borderRadius: "12px", height: "100%" }}
                      alt="chicken dish"
                      src={d.image}
                      width="100%"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Box>
      </Box>
      <Dish
        open={openDishModal}
        dish={selectedDish}
        close={handleDishModalClose}
      />
    </Box>
  );
};

export default Home;
