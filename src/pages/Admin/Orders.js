import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { Box, Chip, Icon, IconButton, Typography } from "@mui/material";
import ActionButton from "../../components/Buttons/ActionButton";
import Subtitle from "../../components/Typography/Subtitle";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import { getAllOrders } from "../../serverFunctions/admin";
import Order from "../../components/PopUps/Admin/Order";

const cardStyle = {
  p: 2,
  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  cursor: "pointer",
};

const Orders = (props) => {
  const [orderStatuses, setOrderStatuses] = useState([
    { label: "waiting", value: "processing", count: 0 },
    { label: "dispatched", value: "dispatched", count: 0 },
    { label: "completed", value: "completed", count: 0 },
    { label: "canceled", value: "canceled", count: 0 },
    { label: "all", value: "all", count: 0 },
  ]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedStatusView, setSelectedStatusView] = useState("processing");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);

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

  const loadOrders = async () => {
    setLoading(true);
    setSelectedStatusView("processing");
    try {
      const res = await getAllOrders(props.user.token);
      setOrders(res.data);

      /////set count/////////
      let newOrderStatuses = [...orderStatuses];
      newOrderStatuses.forEach((status, index) => {
        if (status.value === "all") {
          status.count = res.data.length;
        } else {
          let count = res.data.filter(
            (order) => order.orderStatus === status.value
          ).length;
          newOrderStatuses[index].count = count;
        }
      });
      let filtered = [];
      setOrderStatuses(newOrderStatuses);
      res.data.map((order) => {
        if (order.orderStatus === "processing") filtered.push(order);
      });
      filtered.reverse();
      setFilteredOrders(filtered);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("newOrder");

    channel.bind("order-placed", (data) => {
      console.log("New message received:", data);
      loadOrders();
      // Do something with the new message here
    });

    return () => {
      pusher.unsubscribe("newOrder");
      pusher.disconnect();
    };
  }, []);

  const handleStatusFilter = async (value) => {
    setOrdersLoading(true);
    let filtered = [];
    try {
      if (orders && orders.length) {
        setSelectedStatusView(value);
        if (value === "all") {
          setFilteredOrders(orders);
          setOrdersLoading(false);
          return;
        }
        orders.map((order) => {
          if (order.orderStatus === value) filtered.push(order);
        });
        value === "processing" && filtered.reverse();
        setFilteredOrders(filtered);
        setOrdersLoading(false);
      }
    } catch (error) {
      setOrdersLoading(false);
      console.log(error);
    }
  };

  const handleOrderSelect = async (order) => {
    try {
      console.log("Order---->", order);
      setSelectedOrder(order);
      setOpenOrder(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box px={2}>
        <Box
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Subtitle my={1} title="Orders" />
            <IconButton size="small" onClick={loadOrders}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
          <ActionButton
            text="Add"
            leftIcon="add"
            fullWidth={false}
            my={0}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
        >
          {orderStatuses.map((status, index) => (
            <Box key={index}>
              <ActionButton
                text={`${status.label} (${status.count})`}
                variant=""
                sx={{
                  textTransform: "capitalize",
                  py: 0,
                  fontSize: "0.85rem",
                  boxShadow:
                    "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                  bgcolor:
                    selectedStatusView === status.value ? "#fee5b9" : "#fff",
                  fontWeight: selectedStatusView === status.value ? 700 : "400",
                  color:
                    selectedStatusView === status.value ? "primary.main" : "",
                  my: 1,
                  "&:hover": {
                    bgcolor: "#fee5b9",
                  },
                }}
                fullWidth={false}
                size="small"
                onClick={() => handleStatusFilter(status.value)}
              />
            </Box>
          ))}
        </Box>
        <Box>
          {filteredOrders.length
            ? filteredOrders.map((order, index) => (
                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  id={index}
                >
                  {" "}
                  <Box
                    sx={{
                      ...cardStyle,
                    }}
                    onClick={() => handleOrderSelect(order)}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      Order Id: ...{order.reference.slice(-9)}
                    </Typography>
                    <Typography variant="body2">
                      Total: GHC{order.paymentIntent.amount / 100}
                    </Typography>
                    <Typography variant="body2">
                      Paid with: {order.paymentIntent.channel}{" "}
                      {order.paymentIntent.authorization
                        ? `(${order.paymentIntent.authorization.bank}, ...${order.paymentIntent.authorization.last4})`
                        : ""}
                    </Typography>
                    <Typography variant="body2">
                      Delivery mode: {order.deliveryMode}
                    </Typography>
                    {order.deliveryMode === "delivery" ? (
                      <Typography variant="body2">
                        Address: {order.address.description}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {order.orderedBy && order.orderedBy.name ? (
                      <Typography variant="body2">
                        orderedBy: {order.orderedBy.name}(
                        {order.orderedBy.phoneNumber})
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              ))
            : ""}
        </Box>
      </Box>
      <LoadingBackdrop open={loading} />
      {selectedOrder ? (
        <Order
          loadOrders={loadOrders}
          user={props.user}
          open={openOrder}
          onClose={() => setOpenOrder(false)}
          order={selectedOrder}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Orders;
