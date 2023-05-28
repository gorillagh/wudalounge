import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { getUserOrders } from "../../serverFunctions/user";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  AppBar,
  Chip,
  Divider,
  Grid,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import IssueBox from "./IssueBox";
import trackingRipple from "../../images/trackingRipple.svg";

const style = {
  position: "absolute",
  bottom: 0,
  height: "100%",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "#EFF3F6",
  boxShadow: 24,
  boxSizing: "border-box",
  px: 2,
  background: "transparent",
};
const cardStyle = {
  px: 2,
  pt: 2,
  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  //   border: "1px solid rgba(255, 255, 255, 0.3)",
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  width: "100%",
  boxShadow: "0.5px 1px 0px rgba(0, 0, 0, 0.2)",
  //   border: `1px solid ${theme.palette.divider}`,
  //   borderRadius: "12px !important",
  // '&:not(:last-child)': {
  //   borderBottom: 0,
  // },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    // flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(180deg)",
    },
    "& .MuiAccordionSummary-content": {
      // marginRight: theme.spacing(4),
      // justifyContent: "space-between",
      // alignItems: "flex-end",
      display: "none",
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  //   paddingX: theme.spacing(5),
  // paddingLeft: "48px",
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [openIssueBox, setOpenIssueBox] = useState(false);
  const [beepColor, setBeepColor] = useState("#000");

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrders(props.user.token);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (props.open === true) fetchUserOrders();
  }, [props.open]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("orderUpdate");

    channel.bind("order-updated", async (data) => {
      if (data.orderedBy === props.user._id) {
        console.log("New message received:", data);
        if (orders && orders.length) {
          setOrders((prevState) => {
            const index = prevState.findIndex(
              (order) => order._id === data._id
            );
            console.log("index--->", index);
            console.log(prevState[index]);
            prevState[index] = data;
            console.log("preve--->", prevState);
            return { ...prevState };
          });
        }
      }
      // Do something with the new message here
    });

    return () => {
      pusher.unsubscribe("orderUpdate");
      // pusher.disconnect();
    };
  }, [orders]);

  const formatDate = (date) => {
    const d = new Date(date);
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return {
      date: d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear(),
      time: strTime,
    };
  };

  const handleOrderAgain = (order) => {
    setLoading(true);
    console.log(order);
    let cart = {
      deliveryMode: order.deliveryMode,
      dishes: order.dishes,
      notes: order.notes,
      paymentMethod: order.paymentMethod,
      riderTip: order.riderTip,
    };
    if (props.cart && props.cart.dishes) {
      if (window.confirm("Clear basket and order for this one?")) {
        props.setCart({ ...cart });
        window.localStorage.setItem("wdCart", JSON.stringify({ ...cart }));
        props.setOpenBasket(true);
        setLoading(false);
      } else {
        return;
      }
    } else {
      props.setCart({ ...cart });
      window.localStorage.setItem("wdCart", JSON.stringify({ ...cart }));
      props.setOpenBasket(true);
      setLoading(false);
    }
  };

  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        // hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        ref={containerRef}
        sx={{ width: { md: "60%" }, left: { md: "20%" } }}
      >
        <Zoom
          container={containerRef.current}
          appear={true}
          in={props.open}
          direction="left"
          mountOnEnter
          unmountOnExit
          //   timeout={300}
        >
          <Box
            onClick={(e) => {
              if (e.currentTarget !== e.target) return;
              props.close();
            }}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box>
                <AppBar
                  elevation={1}
                  position="fixed"
                  color="inherit"
                  sx={{
                    top: "0",
                    px: 2,
                    background: "rgba(0, 0, 0, 0.1)",

                    backdropFilter: "blur(8.8px)",
                    WebkitBackdropFilter: "blur(8.8px)",
                  }}
                >
                  <Box my={2} display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <PageTitle my={0} title="My Orders" />
                      <IconButton size="small" onClick={fetchUserOrders}>
                        <Icon color="primary" fontSize="small">
                          refresh
                        </Icon>
                      </IconButton>
                    </Box>
                    <Icon
                      color="error"
                      fontSize="large"
                      onClick={props.onClose}
                    >
                      close
                    </Icon>
                  </Box>
                </AppBar>
                <Toolbar sx={{ backgroundColor: "transparent" }} />
              </Box>

              {orders && orders.length ? (
                orders.map((order, index) => (
                  <Box
                    key={index}
                    // sx={{ ...cardStyle }}
                    // display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        ...cardStyle,
                        mb: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {new Date(order.createdAt).setHours(0, 0, 0, 0) ===
                          new Date().setHours(0, 0, 0, 0)
                            ? "Today"
                            : new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                          {formatDate(order.createdAt).time}
                        </Typography>
                        {order.orderStatus === "dispatched" ? (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              color="info.main"
                              variant="body2"
                              fontWeight="bold"
                            >
                              Track
                            </Typography>
                            <img
                              src={trackingRipple}
                              alt="tracking"
                              style={{ height: "25px", width: "25px" }}
                            />
                          </Box>
                        ) : (
                          <Chip
                            size="small"
                            label={
                              <Typography variant="body2" fontWeight={500}>
                                {order.orderStatus}
                              </Typography>
                            }
                            sx={{
                              color: "#fff",
                              backgroundColor:
                                order.orderStatus === "processing"
                                  ? "secondary.light"
                                  : order.orderStatus === "dispatched"
                                  ? "primary.light"
                                  : order.orderStatus === "completed"
                                  ? "success.light"
                                  : "error.light",
                            }}
                          />
                        )}
                      </Box>
                      {order.dishes.map((dish, index) => (
                        <Grid key={index} container my={1} columnSpacing={1}>
                          <Grid item xs={2.5}>
                            <img
                              style={{ borderRadius: "12px" }}
                              src={dish.image}
                              alt="dish"
                              width="100%"
                            />
                          </Grid>
                          <Grid item xs={9.5}>
                            <Typography variant="body2" fontWeight={500}>
                              {dish.name} ({dish.selectedSize.size} size) x{" "}
                              {dish.dishQuantity}
                            </Typography>
                            {dish.extras.map((e, i) => {
                              if (e.checked) {
                                return (
                                  <Typography key={i} variant="body2">
                                    +{e.quantity} {e.item}
                                  </Typography>
                                );
                              }
                            })}
                          </Grid>
                        </Grid>
                      ))}{" "}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Typography variant="body2" fontWeight={500}>
                          Total: GHC{order.paymentIntent.amount / 100}
                        </Typography>
                        <ActionButton
                          variant="outlined"
                          size="small"
                          text="Order again"
                          rightIcon="repeat"
                          fullWidth={false}
                          my={0}
                          onClick={() => handleOrderAgain(order)}
                        />
                      </Box>
                    </Box>
                    <Accordion

                    //   expanded={expanded === "panel1"}
                    //   onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<Icon color="primary">expand_more</Icon>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      ></AccordionSummary>
                      <AccordionDetails>
                        <Grid container my={0.5}>
                          <Grid item xs={5}>
                            <Typography variant="body2" fontWeight={500}>
                              Order Id
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="body2">
                              ...
                              {order.reference.slice(-9)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container my={0.5}>
                          <Grid item xs={5}>
                            <Typography variant="body2" fontWeight={500}>
                              Paid with
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="body2">
                              {order.paymentIntent.channel}{" "}
                              {order.paymentIntent.authorization
                                ? `(${order.paymentIntent.authorization.bank}, ...${order.paymentIntent.authorization.last4})`
                                : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container my={0.5}>
                          <Grid item xs={5}>
                            <Typography variant="body2" fontWeight={500}>
                              Delivery mode
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="body2">
                              {order.deliveryMode}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container my={0.5}>
                          <Grid item xs={5}>
                            {order.deliveryMode === "delivery" ? (
                              <Typography variant="body2" fontWeight={500}>
                                Address
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid item xs={7}>
                            {order.deliveryMode === "delivery" ? (
                              <Typography variant="body2">
                                {order.address.description}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </Grid>
                        <Grid container my={0.5}>
                          <Grid item xs={5}>
                            {order.riderTip &&
                            order.deliveryMode === "delivery" ? (
                              <Typography variant="body2" fontWeight={500}>
                                Courier tip
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid item xs={7}>
                            {order.riderTip &&
                            order.deliveryMode === "delivery" ? (
                              <Typography variant="body2">
                                GHC{order.riderTip}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </Grid>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            fontWeight={500}
                            textAlign="right"
                            variant="body2"
                            color="error.dark"
                            mt={1}
                            onClick={() => setOpenIssueBox(true)}
                          >
                            Report an issue
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary" textAlign="center" my={3}>
                  No orders yet.
                </Typography>
              )}
            </Box>
            <IssueBox
              open={openIssueBox}
              onClose={() => setOpenIssueBox(false)}
            />
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Orders;
