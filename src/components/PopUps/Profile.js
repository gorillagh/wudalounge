import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import ActionButton from "../Buttons/ActionButton";
import {
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
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

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUserProfile = async () => {
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
    setName("");
    setEmail("");
    fetchUserProfile();
    props.user.name && setName(props.user.name);
    props.user.email && setEmail(props.user.email);
  }, [props.open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      let data = { name, email };
      console.log(data);
      setEditOn((prevState) => !prevState);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box my={2} display="flex" justifyContent="space-between">
                <PageTitle my={0} title="Profile" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
              >
                <Avatar
                  alt={props.user.name && props.user.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 56, height: 56 }}
                />

                <ActionButton
                  sx={{ display: editOn && "none" }}
                  fullWidth={false}
                  text="Edit"
                  variant="outlined"
                  rightIcon="edit"
                  onClick={() => setEditOn((prevState) => !prevState)}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
              >
                <Typography fontWeight={500}>Phone:</Typography>
                <TextField
                  disabled
                  value="0240298910"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon fontSize="small">phone</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
              >
                <Typography fontWeight={500}>Name:</Typography>
                <TextField
                  disabled={!editOn}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon fontSize="small">badge</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
              >
                <Typography fontWeight={500}>Email:</Typography>
                <TextField
                  disabled={!editOn}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon fontSize="small">email</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {editOn ? (
                <Box
                  display="flex"
                  justifyContent="right"
                  alignItems="center"
                  my={2}
                >
                  <ActionButton
                    backgroundColor="success"
                    fullWidth={false}
                    text="Save"
                    rightIcon="save"
                    onClick={handleSave}
                  />
                </Box>
              ) : (
                ""
              )}
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Profile;
