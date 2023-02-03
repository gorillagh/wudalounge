import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { getOrders } from "../../serverFunctions/user";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

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
                        expandIcon={<Icon>expand_more</Icon>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{}}>{order.createdAt}</Typography>
                        <Typography>
                          {order.paymentIntent.amount / 100}
                        </Typography>
                        <Typography>{order.orderStatus}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam
                          mattis feugiat. Aliquam eget maximus est, id dignissim
                          quam.
                        </Typography>
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
