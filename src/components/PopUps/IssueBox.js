import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import Subtitle from "../Typography/Subtitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 250,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "12px",
  p: 2,
};

const IssueBox = (props) => {
  const [issue, setIssue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(issue);
    ///
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Subtitle title="Report Issue" my={0} />
              <IconButton
                // fontSize="large"
                color="error"
                onClick={() => props.onClose()}
              >
                <Icon color="error">close</Icon>
              </IconButton>
            </Box>
            {/* <Subtitle title="Add Link" /> */}
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Please enter your issue here..."
              fullWidth
              multiline
              rows={3}
              onChange={(e) => setIssue(e.target.value)}
            />
            <Typography variant="body2">
              We'll get back to you within 6hrs
            </Typography>
            <ActionButton type="submit" text="Submit" />

            <Divider>
              <Chip
                label={
                  <Typography variant="body2" fontWeight={500}>
                    OR
                  </Typography>
                }
              />
            </Divider>
            <ActionButton
              variant="outlined"
              text="Call us"
              onClick={() => (document.location.href = "tel:+233244410869")}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default IssueBox;
