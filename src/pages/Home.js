import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import ActionButton from "../components/Buttons/ActionButton";
import PageTitle from "../components/Typography/PageTitle";
import Subtitle from "../components/Typography/Subtitle";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { addToNotificationList } from "../serverFunctions/user";

var date1 = new Date(2023, 2, 3, 10, 30, 50, 800);

const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendNotification = async () => {
    try {
      if (
        !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        toast.error("Please enter a valid email");
        return;
      }
      setLoading(true);

      const response = await addToNotificationList(email);
      if (response.data === "Email exists")
        toast.success(
          `You are already on the list. We will send an email to ${email} before and on launch day!`
        );
      if (response.data === "Ok")
        toast.success(
          `We will send an email to ${email} before and on launch day!`
        );
      setEmail("");
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        position: "relative",
        color: "#fff",
        mb: 4,
        // pt: 10,
        // pb: 50,
        px: 5,
      }}
    >
      <Grid item xs={12} md={4}>
        <Box textAlign="center">
          <Subtitle title="Pork, Chicken and fish meals" />
          <PageTitle title={`Accra, be ready!`} />
          <Box>
            <Countdown
              date={date1}
              renderer={({ hours, minutes, seconds, completed, days }) => {
                if (completed) {
                  // Render a completed state
                  return <Typography color="#fff">Good to go!</Typography>;
                } else {
                  // Render a countdown
                  return (
                    <Typography color="secondary" my={5}>
                      <PageTitle
                        title={
                          <>
                            <div>
                              {days}
                              <Typography
                                component="span"
                                fontWeight="bold"
                                color="#fff"
                                variant="body1"
                              >
                                days
                              </Typography>
                            </div>
                            <div>
                              {hours}:{minutes}:{seconds}
                            </div>
                          </>
                        }
                        variant="h2"
                      />
                    </Typography>
                  );
                }
              }}
            />
          </Box>
          <Typography mt={3} mb={2}>
            Be the first to hear on launch day.
          </Typography>
          <Box textAlign="center" bgcolor="#fff" borderRadius={1} p={1}>
            <TextField
              disabled={loading}
              required
              fullWidth
              size="small"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          {loading ? (
            <CircularProgress sx={{ my: 2 }} />
          ) : (
            <ActionButton text="Notify me!" onClick={handleSendNotification} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
