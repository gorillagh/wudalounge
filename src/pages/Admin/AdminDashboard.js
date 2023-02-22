import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Icon, Typography } from "@mui/material";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Search from "../../components/PopUps/Search";
import PageTitle from "../../components/Typography/PageTitle";
import Subtitle from "../../components/Typography/Subtitle";
import { getDashboardBriefs } from "../../serverFunctions/admin";

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
  cursor: "pointer",
};
const cardHeader = {
  fontWeight: 500,
  my: 1,
};

const AdminDashboard = (props) => {
  const [briefsLoading, setBriefsLoading] = useState(false);
  const [dashboardBriefs, setdashboardBriefs] = useState(null);

  const navigate = useNavigate();

  const getBriefs = async () => {
    try {
      setBriefsLoading(true);
      const res = await getDashboardBriefs(props.user.token);
      setdashboardBriefs(res.data);
      setBriefsLoading(false);
      console.log(res.data);
    } catch (error) {
      setBriefsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getBriefs();
  }, []);

  return (
    <div>
      <Subtitle
        title={`Hello ${props.user.name.split(" ")[0]},`}
        my={1}
        mx={1}
      />
      {briefsLoading ? (
        ""
      ) : (
        <Grid container justifyContent="space-between" spacing={1} px={1}>
          {/* ///////////////////ORDERS SECTION////////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box
              sx={{ ...cardStyle }}
              onClick={() => navigate("/admin/orders")}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }} variant="body2">
                  Orders
                </Typography>
                <Icon fontSize="small" color="primary">
                  assignment
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Waiting:{" "}
                </Typography>
                <Box display="flex">
                  <Subtitle
                    color={
                      dashboardBriefs &&
                      dashboardBriefs.ordersInfo.uncompletedNumber > 0
                        ? "secondary"
                        : ""
                    }
                    title={
                      dashboardBriefs
                        ? dashboardBriefs.ordersInfo.uncompletedNumber
                        : 0
                    }
                    my={0}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Today:{" "}
                </Typography>
                <Box display="flex">
                  <Typography variant="body2">
                    (GHC
                    {dashboardBriefs
                      ? dashboardBriefs.ordersInfo.todayTotal
                      : 0}
                    )
                  </Typography>
                  <Subtitle
                    title={
                      dashboardBriefs
                        ? dashboardBriefs.ordersInfo.todayOrdersNumber
                        : 0
                    }
                    my={0}
                  />
                  {/* <Subtitle title="(GHC2500)" my={0} /> */}
                </Box>
              </Box>

              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  All:{" "}
                </Typography>
                <Box display="flex">
                  <Typography variant="body2">
                    (GHC
                    {dashboardBriefs
                      ? dashboardBriefs.ordersInfo.allTimeTotal
                      : 0}
                    )
                  </Typography>
                  <Subtitle
                    title={
                      dashboardBriefs
                        ? dashboardBriefs.ordersInfo.allTimeOrdersNumber
                        : 0
                    }
                    my={0}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ////////////////////MENU SECTION//////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box sx={{ ...cardStyle }} onClick={() => navigate("/admin/menu")}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography sx={{ ...cardHeader }} variant="body2">
                  Menu
                </Typography>
                <Icon fontSize="small" color="primary">
                  restaurant_menu
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Dishes:
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs ? dashboardBriefs.menuInfo.dishesTotal : 0
                  }
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Drinks:
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs ? dashboardBriefs.menuInfo.dishesTotal : 0
                  }
                  my={0}
                />
              </Box>
            </Box>
          </Grid>

          {/* /////////////USERS SECTION////////////////////////////////          */}
          <Grid item xs={6} md={3}>
            <Box sx={{ ...cardStyle }} onClick={() => navigate("/admin/users")}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }} variant="body2">
                  Users
                </Typography>
                <Icon fontSize="small" color="primary">
                  people
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Customers:
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs
                      ? dashboardBriefs.usersInfo.customersTotal
                      : 0
                  }
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Staff:
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs ? dashboardBriefs.usersInfo.staffTotal : 0
                  }
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Admins:
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs ? dashboardBriefs.usersInfo.adminsTotal : 0
                  }
                  my={0}
                />
              </Box>
            </Box>
          </Grid>

          {/* ////////////REPORTS SECTION///////////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box
              sx={{ ...cardStyle }}
              onClick={() => navigate("/admin/reports")}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }} variant="body2">
                  Reports
                </Typography>
                <Icon fontSize="small" color="primary">
                  bug_report
                </Icon>
              </Box>

              <Box
                display="flex"
                my={1}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Today:{" "}
                </Typography>
                <Subtitle
                  title={
                    dashboardBriefs && dashboardBriefs.reportsInfo
                      ? dashboardBriefs.reportsInfo.todayReports
                      : 0
                  }
                  my={0}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AdminDashboard;
