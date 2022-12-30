import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import ActionButton from "../components/Buttons/ActionButton";
import PageTitle from "../components/Typography/PageTitle";
import Subtitle from "../components/Typography/Subtitle";
import { Grid, TextField, Typography } from "@mui/material";
import Countdown from "react-countdown";

const Home = () => {
  const [email, setEmail] = useState("");
  var date1 = new Date(2023, 2, 3, 10, 30, 50, 800);
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

          <ActionButton text="Notify me!" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
