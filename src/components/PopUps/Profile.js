import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Zoom from "@mui/material/Zoom";
import PageTitle from "../Typography/PageTitle";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";

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
    fetchUserProfile();
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
                <PageTitle my={0} title="Profile" />
                <Icon color="error" fontSize="large" onClick={props.onClose}>
                  close
                </Icon>
              </Box>
            </Box>
            <LoadingBackdrop open={loading} />
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default Profile;
