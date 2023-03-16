import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import {
  Avatar,
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
import { updateUser } from "../../../serverFunctions/admin";
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

const User = (props) => {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("subscriber");

  useEffect(() => {
    setUserRole(props.selectedUser.role);
  }, [props.open]);

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleUserUpdate = async () => {
    if (userRole === props.selectedUser.role) {
      props.onClose();
      return;
    }
    setLoading(true);
    try {
      const res = await updateUser(props.user.token, props.selectedUser._id, {
        role: userRole,
      });
      if (res.data === "ok") {
        toast.success("User updated");
        props.loadUsers();
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
                justifyContent="flex-end"
                alignItems="center"
                mb={2}
              >
                <IconButton
                  // fontSize="large"
                  color="error"
                  onClick={() => props.onClose()}
                >
                  <Icon color="error">close</Icon>
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  alt={props.selectedUser.name}
                  src={props.selectedUser.image}
                  sx={{ width: 100, height: 100, mr: 1 }}
                />
                <Typography fontWeight={500}>
                  {props.selectedUser.name}
                </Typography>
                <Typography fontWeight={500}>
                  {props.selectedUser.phoneNumber}
                </Typography>{" "}
              </Box>
              {props.selectedUser.email ? (
                <Box display="flex" my={1} alignItems="flext-start">
                  <Typography variant="body2" mr={1} fontWeight={500}>
                    Email:
                  </Typography>
                  <Typography variant="body2">
                    {props.selectedUser.email}
                  </Typography>
                </Box>
              ) : (
                ""
              )}

              {props.selectedUser.addresses.length ? (
                <Box display="flex" my={1} alignItems="flext-start">
                  <Typography variant="body2" mr={1} fontWeight={500}>
                    Address:
                  </Typography>
                  <Typography variant="body2">
                    {props.selectedUser.addresses[0].description}
                  </Typography>
                </Box>
              ) : (
                ""
              )}
              {props.selectedUser.favorites &&
              props.selectedUser.favorites.length ? (
                <Box my={1} display="flex" alignItems="flext-start">
                  <Typography variant="body2" mr={1} fontWeight={500}>
                    Favorites:{" "}
                  </Typography>
                  <Box>
                    {props.selectedUser.favorites.map((favorite, index) => (
                      <Typography variant="body2">{favorite.name}</Typography>
                    ))}
                  </Box>
                </Box>
              ) : (
                ""
              )}
              <Box display="flex" alignItems="flext-start">
                <Typography variant="body2" mr={1} fontWeight={500}>
                  Created:{" "}
                </Typography>
                <Typography variant="body2">
                  {new Date(props.selectedUser.createdAt).setHours(
                    0,
                    0,
                    0,
                    0
                  ) === new Date().setHours(0, 0, 0, 0)
                    ? "Today"
                    : new Date(props.selectedUser.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}{" "}
                  {formatDate(props.selectedUser.createdAt).time}
                </Typography>
              </Box>
              <Box my={2} display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={500} mr={1}>
                  Role:{" "}
                </Typography>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userRole}
                  onChange={handleRoleChange}
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  <MenuItem value="subscriber">Customer</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Box>
              <ActionButton
                text="done"
                disabled={loading}
                my={2}
                onClick={() => handleUserUpdate()}
              />
              <LoadingBackdrop open={loading} />
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default User;
