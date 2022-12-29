import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import ActionButton from "../components/Buttons/ActionButton";
import PageTitle from "../components/Typography/PageTitle";
import Subtitle from "../components/Typography/Subtitle";
import { Grid, TextField, Typography } from "@mui/material";
import Countdown from "react-countdown";

const Home = () => {
  const [email, setEmail] = useState("");
  var date1 = new Date(2024, 2, 3, 10, 30, 50, 800);
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        position: "relative",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: "url(hero1.webp)",
        pt: 10,
        pb: 50,
        px: 5,
      }}
    >
      <Box textAlign="center">
        {/* <PageTitle mt={5} mb={0} title="Wuda Lounge" /> */}
        <Subtitle title="Pork, Chicken and fish meals" />
        <PageTitle title={`Accra, be ready!`} />
        <Box>
          <Countdown
            date={date1}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                // Render a completed state
                return <Typography color="#fff">Good to go!</Typography>;
              } else {
                // Render a countdown
                return (
                  <Typography color="secondary" my={5}>
                    <PageTitle
                      title={`${hours}:${minutes}:${seconds}`}
                      variant="h2"
                    />
                  </Typography>
                );
              }
            }}
          />
        </Box>
        {/* <Typography variant="body2">Pork, Chicken and fish meals</Typography> */}
        <Typography mt={3} mb={2}>
          Be the first to hear about the big launch
        </Typography>
        <Box textAlign="center" bgcolor="#fff" borderRadius={1} p={0.7}>
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
  );
};

export default Home;
