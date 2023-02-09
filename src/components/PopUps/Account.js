import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import { IconButton, MenuItem, Select, Typography } from "@mui/material";
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

const Account = (props) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cashless");
  const fetchUserAccount = async () => {
    try {
      setLoading(true);
      //
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    //
  };
  useEffect(() => {
    fetchUserAccount();
  }, []);
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
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="My Account" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              <Box my={5} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  my={2}
                >
                  <Box display="flex">
                    <Typography mr={2} fontWeight={500}>
                      Phone :
                    </Typography>
                    <Typography color="text.secondary">
                      {props.user.phoneNumber}
                    </Typography>
                  </Box>
                  <IconButton disabled size="small">
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  my={2}
                >
                  <Box display="flex">
                    <Typography mr={2} fontWeight={500}>
                      Address*:
                    </Typography>
                    <Typography mr={2} color="text.secondary">
                      {props.user.addresses
                        ? props.user.addresses[0].description
                        : ""}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => props.setOpenAddress(true)}
                    size="small"
                  >
                    <Icon fontSize="small" color="info">
                      {props.user.addresses ? "edit" : "add"}
                    </Icon>
                  </IconButton>
                </Box>{" "}
                <Box mt={3}>
                  <Typography fontWeight={500}>Payment method :</Typography>
                  <Select
                    id="demo-simple-select-standard"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    size="small"
                    fullWidth
                    sx={{ borderRadius: 5 }}
                  >
                    <MenuItem value="cashless">
                      <Box display="flex" alignItems="center">
                        <Icon sx={{ mr: 1 }} fontSize="small">
                          payments
                        </Icon>
                        <Typography>Card/Mobile money</Typography>
                      </Box>
                    </MenuItem>
                    {/* <MenuItem value="">
                            <Icon sx={{ mr: 1 }} fontSize="small">
                              send_to_mobile
                            </Icon>{" "}
                            Mobile money
                          </MenuItem> */}
                    <MenuItem value="cash">
                      <Box display="flex" alignItems="center">
                        <Icon sx={{ mr: 1 }} fontSize="small">
                          money
                        </Icon>
                        <Typography>Cash</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </Box>
              </Box>

              <ActionButton
                disabled
                variant="outlined"
                color="error"
                text="Delete account"
                fullWidth={false}
              />
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Account;
