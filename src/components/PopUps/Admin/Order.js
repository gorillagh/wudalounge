import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import {
  Icon,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Zoom,
} from "@mui/material";
import Subtitle from "../../Typography/Subtitle";
import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import ActionButton from "../../Buttons/ActionButton";
import { updateOrder } from "../../../serverFunctions/order";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 250,
  maxHeight: "80vh",
  overflowY: "scroll",
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 2,
};

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

const Order = (props) => {
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("processing");

  useEffect(() => {
    props.order && setOrderStatus(props.order.orderStatus);
  }, []);

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleOrderUpdate = async (order) => {
    if (orderStatus === props.order.orderStatus) {
      props.onClose();
      return;
    }
    setLoading(true);
    try {
      const res = await updateOrder(props.user.token, order._id, {
        orderStatus,
      });
      if (res.data === "ok") {
        toast.success("Order updated");
        props.loadOrders();
        props.onClose();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const containerRef = React.useRef(null);

  return (
    <div>
      <Modal
        // hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            sx={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Subtitle
                  title={`...${props.order.reference.slice(-9)}`}
                  my={0}
                />
                <IconButton
                  // fontSize="large"
                  color="error"
                  onClick={() => props.onClose()}
                >
                  <Icon color="error">close</Icon>
                </IconButton>
              </Box>
              <Box>
                <Typography>
                  {new Date(props.order.createdAt).setHours(0, 0, 0, 0) ===
                  new Date().setHours(0, 0, 0, 0)
                    ? "Today"
                    : new Date(props.order.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}{" "}
                  {formatDate(props.order.createdAt).time}
                </Typography>
                {props.order.notes ? (
                  <Typography my={1} variant="body2" fontWeight={500}>
                    NB: {props.order.notes}
                  </Typography>
                ) : (
                  ""
                )}
                {props.order.dishes.map((dish, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: "12px",
                      border: "1px solid #BDBDBD",
                      my: 2,
                      p: 1,
                    }}
                  >
                    <Typography>
                      {dish.name} ({dish.selectedSize.size} size) x
                      {dish.dishQuantity}
                    </Typography>
                    {dish.extras.map(
                      (e, i) =>
                        e.checked && (
                          <Typography key={i} variant="body2">
                            +{e.quantity} {e.name}
                          </Typography>
                        )
                    )}

                    {dish.kitchenNotes ? (
                      <Typography my={1} fontWeight={500} variant="body2">
                        NB: {dish.kitchenNotes}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                ))}

                <Typography variant="body2">
                  Delivery mode: {props.order.deliveryMode}
                </Typography>
                {props.order.deliveryMode === "delivery" ? (
                  <Typography variant="body2">
                    Address: {props.order.address.description}
                  </Typography>
                ) : (
                  ""
                )}
                {props.order.riderTip ? (
                  <Typography variant="body2">
                    Rider tip: GHC{props.order.riderTip}
                  </Typography>
                ) : (
                  ""
                )}
                <Typography variant="body2">
                  Total: GHC{props.order.paymentIntent.amount / 100}
                </Typography>
                <Typography variant="body2">
                  Paid with: {props.order.paymentIntent.channel}{" "}
                  {props.order.paymentIntent.authorization
                    ? `(${props.order.paymentIntent.authorization.bank}, ...${props.order.paymentIntent.authorization.last4})`
                    : ""}
                </Typography>
                {props.order.orderedBy && props.order.orderedBy.name ? (
                  <Typography variant="body2">
                    Ordered by: {props.order.orderedBy.name}(
                    {props.order.orderedBy.phoneNumber})
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Box my={2} display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={500} mr={1}>
                  Order Status:{" "}
                </Typography>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderStatus}
                  onChange={handleStatusChange}
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    bgcolor:
                      orderStatus === "processing"
                        ? "secondary.light"
                        : orderStatus === "dispatched"
                        ? "primary.light"
                        : orderStatus === "completed"
                        ? "success.light"
                        : "error.light",
                  }}
                >
                  <MenuItem value="processing">processing</MenuItem>
                  <MenuItem value="dispatched">dispatched</MenuItem>
                  <MenuItem value="completed">completed</MenuItem>
                  <MenuItem value="canceled">canceled</MenuItem>
                </Select>
              </Box>
              <ActionButton
                text="done"
                disabled={loading}
                my={2}
                onClick={() => handleOrderUpdate(props.order)}
              />
              <LoadingBackdrop open={loading} />
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default Order;
