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
import {
  Chip,
  Grid,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";

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
  //   py: 1,
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
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginRight: theme.spacing(1),
      justifyContent: "space-between",
      alignItems: "flex-end",
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

  const fetchUserOrders = async () => {
    try {
      if (props.open) {
        setLoading(true);
        const res = await getOrders(props.user._id);
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
      date: d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear(),
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
                    // display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      display="block"
                      sx={{
                        ...cardStyle,
                        mb: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      {order.dishes.map((dish, index) => (
                        <Grid key={index} container spacing={1}>
                          <Grid item xs={2.5}>
                            <img
                              style={{ borderRadius: "12px" }}
                              src={dish.image}
                              alt="dish"
                              width="100%"
                            />
                          </Grid>
                          <Grid item xs={9.5}>
                            <Typography variant="body1">
                              {dish.name} ({dish.selectedSize.size} size)
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
                    </Box>
                    <Accordion

                    //   expanded={expanded === "panel1"}
                    //   onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<Icon color="primary">expand_more</Icon>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography variant="body2">
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
                          color="secondary"
                        />
                        <Typography variant="body2" fontWeight={500}>
                          GHC{order.paymentIntent.amount / 100}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container>
                          <Grid item xs={5} px={2}>
                            <Typography my={0.5} variant="body2">
                              Order Id
                            </Typography>
                            <Typography my={0.5} variant="body2">
                              Paid with
                            </Typography>
                            <Typography my={0.5} variant="body2">
                              Delivery mode
                            </Typography>
                            {order.deliveryMode === "delivery" ? (
                              <Typography my={0.5} variant="body2">
                                Address
                              </Typography>
                            ) : (
                              ""
                            )}
                            {order.riderTip &&
                            order.deliveryMode === "delivery" ? (
                              <Typography my={0.5} variant="body2">
                                Courier tip
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid item xs={7}>
                            <Typography my={0.5} variant="body2">
                              {order._id}
                            </Typography>
                            <Typography my={0.5} variant="body2">
                              {order.paymentMethod === "cashless"
                                ? "Card/Mobile money"
                                : "cash"}
                            </Typography>
                            <Typography my={0.5} variant="body2">
                              {order.deliveryMode}
                            </Typography>
                            {order.deliveryMode === "delivery" ? (
                              <Typography my={0.5} variant="body2">
                                {order.address.description}
                              </Typography>
                            ) : (
                              ""
                            )}
                            {order.riderTip &&
                            order.deliveryMode === "delivery" ? (
                              <Typography my={0.5} variant="body2">
                                GHC{order.riderTip}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="right">
                          <ActionButton
                            variant="outlined"
                            size="small"
                            text="Order again"
                            rightIcon="repeat"
                            fullWidth={false}
                            my={0}
                          />
                        </Box>
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
