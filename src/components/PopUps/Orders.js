import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { getOrders } from "../../serverFunctions/user";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Chip } from "@mui/material";

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
  py: 1,
  my: 1,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px !important",
  // '&:not(:last-child)': {
  //   borderBottom: 0,
  // },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(-90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  //   paddingX: theme.spacing(5),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const fetchUserOrders = async () => {
    try {
      if (props.open) {
        setLoading(true);
        const res = await getOrders(props.user._id);
        console.log(res.data[0]);
        setOrders(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserOrders();
  }, [props.open]);

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
      date: d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear(),
      time: strTime,
    };
  };

  const containerRef = React.useRef(null);
  return (
    <>
      <Modal
        hideBackdrop
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
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="My Orders" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              {orders && orders.length ? (
                orders.map((order, index) => (
                  <Box
                    key={index}
                    // sx={{ ...cardStyle }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Accordion
                      sx={{ ...cardStyle, p: 0 }}
                      //   expanded={expanded === "panel1"}
                      //   onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<Icon color="primary">expand_more</Icon>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Box>
                          <Typography sx={{}}>
                            {new Date(order.createdAt).setHours(0, 0, 0, 0) ===
                            new Date().setHours(0, 0, 0, 0)
                              ? "Today"
                              : formatDate(order.createdAt).date}
                          </Typography>
                          <Typography variant="body2" sx={{}}>
                            {formatDate(order.createdAt).time}
                          </Typography>
                        </Box>
                        <Typography fontWeight={500}>
                          GHC{order.paymentIntent.amount / 100}
                        </Typography>
                        <Chip
                          size="small"
                          label={
                            <Typography variant="body2" fontWeight={500}>
                              {order.orderStatus}
                            </Typography>
                          }
                          color="secondary"
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">Id: {order._id}</Typography>
                        <Box my={1}>
                          {order.dishes.map((dish, index) => (
                            <Typography variant="body2">
                              {dish.dishQuantity} x {dish.selectedSize.size}{" "}
                              size {dish.name}
                            </Typography>
                          ))}{" "}
                        </Box>
                        <Typography variant="body2">
                          Paid with:{" "}
                          {order.paymentMethod === "cashless"
                            ? "Card/Mobile money"
                            : "cash"}
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
                        {order.riderTip && order.deliveryMode === "delivery" ? (
                          <Typography variant="body2">
                            Courier tip: GHC{order.riderTip}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))
              ) : (
                <Typography>No orders yet.</Typography>
              )}
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Orders;