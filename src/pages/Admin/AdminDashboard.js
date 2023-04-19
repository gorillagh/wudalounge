import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Box,
  Grid,
  Icon,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Search from "../../components/PopUps/Search";
import PageTitle from "../../components/Typography/PageTitle";
import Subtitle from "../../components/Typography/Subtitle";
import {
  getDashboardBriefs,
  getRevenueChartData,
} from "../../serverFunctions/admin";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import OrderStatisticsChart from "../../components/Charts/OrderStatisticsChart";
import { QRCodeSVG } from "qrcode.react";
import ActionButton from "../../components/Buttons/ActionButton";

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

const briefSkeletons = [1, 2, 3, 4];

const AdminDashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [briefsLoading, setBriefsLoading] = useState(false);
  const [revenueChartLoading, setRevenueChartLoading] = useState(false);
  const [dashboardBriefs, setdashboardBriefs] = useState(null);
  const [revenueChartData, setRevenueChartData] = useState(null);
  const [revenueChartFilter, setRevenueChartFilter] = useState("7days");

  const [room, setRoom] = useState(null);
  const [roomValue, setRoomValue] = useState(null);
  const handleRoomSet = () => {
    if (roomValue !== null) {
      setRoom(roomValue);
      setRoomValue("");
    }
  };

  const navigate = useNavigate();

  const getBriefs = async () => {
    try {
      setBriefsLoading(true);
      const res = await getDashboardBriefs(props.user.token);
      setdashboardBriefs(res.data);
      setBriefsLoading(false);
      console.log("Briefs==>", res.data);
    } catch (error) {
      setBriefsLoading(false);
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      setRevenueChartLoading(true);
      const res = await getRevenueChartData(props.user.token, {
        filter: revenueChartFilter,
      });
      setRevenueChartData(res.data);
      setRevenueChartLoading(false);
    } catch (error) {
      setRevenueChartLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(props.restaurantDetails);
    getBriefs();
  }, []);
  useEffect(() => {
    getChartData();
  }, [revenueChartFilter]);

  const handleRevenueChartFilter = (e) => {
    setRevenueChartFilter(e.target.value);
  };

  return (
    <div>
      <Subtitle
        title={`Hello ${props.user.name.split(" ")[0]},`}
        my={1}
        mx={1}
      />

      {briefsLoading ? (
        <Grid container justifyContent="space-between" spacing={1} px={1}>
          {briefSkeletons.map((skeleton, index) => (
            <Grid item xs={6} md={3}>
              <Box
                sx={{ ...cardStyle, height: 80 }}
                onClick={() => navigate("/admin/orders")}
              >
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height="100%"
                  // sx={{ ...cardStyle }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
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
                <Typography sx={{ ...cardHeader }}>Orders</Typography>
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
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }}>Menu</Typography>
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
                    dashboardBriefs ? dashboardBriefs.menuInfo.drinksTotal : 0
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
                <Typography sx={{ ...cardHeader }}>Users</Typography>
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
                <Typography sx={{ ...cardHeader }}>Reports</Typography>
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
      {revenueChartLoading ? (
        <Box
          sx={{
            ...cardStyle,
            boxSizing: "border-box",
            height: 200,
            // width: "100%",
            my: 4,
          }}
        >
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            // sx={{ ...cardStyle }}
          />
        </Box>
      ) : revenueChartData ? (
        <Grid container spacing={1} px={1} my={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                ...cardStyle,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={2}
                sx={{
                  justifyContent: { xs: "space-between", md: "flex-start" },
                }}
              >
                <Typography sx={{ ...cardHeader }} mr={1}>
                  Revenue
                </Typography>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={revenueChartFilter}
                  onChange={handleRevenueChartFilter}
                >
                  <MenuItem value="7days">Last 7 days</MenuItem>
                  <MenuItem value="1month">Last 4 weeks</MenuItem>
                  <MenuItem value="custom">Custom range</MenuItem>
                  <MenuItem value="1year">Past year</MenuItem>
                  <MenuItem value="alltime">All time</MenuItem>
                </Select>
              </Box>
              {/* {revenueChartLoading ? ( */}

              {/* ) : ( */}
              <Box
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: "100%",
                  // border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  overflowX: "scroll",
                  display: { xs: "block", md: "flex" },
                  justifyContent: "center",
                }}
              >
                <OrderStatisticsChart revenueChartData={revenueChartData} />
              </Box>
              {/* )} */}
            </Box>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        {room ? (
          <Grid item xs={12} md={6} justifyContent="center">
            <Subtitle title={room} textAlign="center" />
            <Box>
              <QRCodeSVG
                value={`https://www.wudalounge.com?location=dansoman&room=${room}`}
                renderAs="canvas"
                bgColor="#fee5b9"
                fgColor="#b64616"
                level="L"
                size={300}
                includeMargin={true}
              />
            </Box>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column">
            <TextField
              fullWidth={false}
              size="small"
              placeholder="Table number"
              onChange={(e) => setRoomValue(e.target.value)}
              value={roomValue}
            />

            <ActionButton
              fullWidth={false}
              text="Generate QRcode"
              my={2}
              onClick={handleRoomSet}
            />
          </Box>
        </Grid>
      </Grid>
      <LoadingBackdrop open={loading} />
    </div>
  );
};

export default AdminDashboard;
