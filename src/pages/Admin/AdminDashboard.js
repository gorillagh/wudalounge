import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Search from "../../components/PopUps/Search";
import PageTitle from "../../components/Typography/PageTitle";
import Subtitle from "../../components/Typography/Subtitle";

const cardStyle = {
  px: 2,
  py: 1,
  my: 1.5,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  width: "100%",
  boxSizing: "border-box",
  height: "100%",
  // border: "1px solid rgba(255, 255, 255, 0.3)",
};
const cardHeader = {
  fontWeight: 500,
  my: 1,
};

const AdminDashboard = (props) => {
  const [openSearch, setOpenSearch] = useState(false);
  // const getOrders;
  // const getUsers;
  // const getMenu;
  // const issues;

  return (
    <div>
      <AdminNavbar
        setUser={props.setUser}
        user={props.user}
        setOpenSearch={setOpenSearch}
      />
      <Search
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        // dishes={dishes}
        // setOpenDishModal={setOpenDishModal}
        // setSelectedDish={setSelectedDish}
        // cart={cart}
        // setOpenBasket={setOpenBasket}
      />

      {/* <Subtitle title="Dashboard" my={1} mx={1} /> */}
      <Grid container justifyContent="space-between" spacing={1} px={1}>
        <Grid item xs={6} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography sx={{ ...cardHeader }} variant="body2">
              Orders
            </Typography>
            <Box display="flex" my={1} alignItems="flex-start">
              <Typography variant="body2" mr={1}>
                Today:{" "}
              </Typography>
              <Box>
                <Subtitle title="50" my={0} />
                {/* <Subtitle title="(GHC2500)" my={0} /> */}
                <Typography>(GHC2500)</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography sx={{ ...cardHeader }} variant="body2">
              Menu
            </Typography>
            <Box
              display="flex"
              my={1}
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography variant="body2" mr={1}>
                Dishes:
              </Typography>
              <Subtitle title="54" my={0} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography sx={{ ...cardHeader }} variant="body2">
              Customers
            </Typography>
            <Box
              display="flex"
              my={1}
              alignItems="flex-start"
              justifyContent="center"
            >
              <Subtitle title="94" my={0} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography sx={{ ...cardHeader }} variant="body2">
              Issues
            </Typography>

            <Box
              display="flex"
              my={1}
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography variant="body2" mr={1}>
                Today:{" "}
              </Typography>
              <Subtitle title="4" my={0} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
