import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PageTitle from "../Typography/PageTitle";
import { PaystackButton } from "react-paystack";
import { filledInputClasses, Icon, Typography } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import { verifyTransactionAndCreateOrder } from "../../serverFunctions/payment";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 250,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

const PaymentConfirmation = (props) => {
  const [loading, setLoading] = useState(false);
  const handlePaymentComplete = async (response) => {
    try {
      setLoading(true);
      console.log(response);
      await verifyTransactionAndCreateOrder(
        props.user._id,
        response,
        props.cart
      );
      props.onClose();
      window.localStorage.removeItem("wdCart");
      props.setCart({});
      props.closeBasket();
      setLoading(false);
    } catch (error) {
      setLoading(filledInputClasses);
      console.log(error);
    }
  };

  const paystackButtonProps = {
    email: props.user.email ? props.user.email : "tsekowudalounge@gmail.com",
    amount: props.finalTotalAfterDiscount * 100,
    currency: "GHS",
    metadata: {
      name: props.user.name,
      phone: props.user.phoneNumber,
    },
    customer: {
      first_name: props.user.name,
    },
    label: props.user.name,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_TEST_KEY,
    text: `Pay GHC${props.finalTotalAfterDiscount}`,
    onSuccess: (response) => handlePaymentComplete(response),
    onClose: () =>
      window.confirm("Are you sure you want to cancel this transaction?"),
  };
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              <Subtitle title="Order Confirmation" my={0} />
              <Icon
                fontSize="large"
                color="error"
                onClick={() => props.onClose()}
              >
                close
              </Icon>
            </Box>
            <Typography variant="body2" my={2}>
              Your payment will be completed with Paystack
            </Typography>
            <PaystackButton
              {...paystackButtonProps}
              className="paystack-button"
            />
          </Box>
          <LoadingBackdrop open={loading} />
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentConfirmation;
