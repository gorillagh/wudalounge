import React, { useState, useEffect } from "react";

import { Box, Chip, Icon, IconButton, Typography } from "@mui/material";
import ActionButton from "../../components/Buttons/ActionButton";
import Subtitle from "../../components/Typography/Subtitle";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import { getAllReports } from "../../serverFunctions/staff";

const cardStyle = {
  p: 2,
  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  cursor: "pointer",
};

const StaffReports = (props) => {
  const [reportStatuses, setReportStatuses] = useState([
    { label: "Pending", value: "pending", count: 0 },
    { label: "Resolved", value: "resolved", count: 0 },
    { label: "All", value: "All", count: 0 },
  ]);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [selectedStatusView, setSelectedStatusView] = useState("pending");
  const [selectedReport, setSelectedReport] = useState(null);
  const [openReport, setOpenReport] = useState(false);

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

  const loadReports = async () => {
    setLoading(true);
    setSelectedStatusView("pending");
    try {
      const res = await getAllReports(props.user.token);
      setReports(res.data);

      /////set count/////////
      let newReportStatuses = [...reportStatuses];
      newReportStatuses.forEach((status, index) => {
        if (status.value === "all") {
          status.count = res.data.length;
        } else {
          let count = res.data.filter(
            (report) => report.reportStatus === status.value
          ).length;
          newReportStatuses[index].count = count;
        }
      });
      let filtered = [];
      setReportStatuses(newReportStatuses);
      res.data.map((report) => {
        if (report.reportStatus === "pending") filtered.push(report);
      });
      filtered.reverse();
      setFilteredReports(filtered);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleStatusFilter = async (value) => {
    setReportsLoading(true);
    let filtered = [];
    try {
      if (reports && reports.length) {
        setSelectedStatusView(value);
        if (value === "all") {
          setFilteredReports(reports);
          setReportsLoading(false);
          return;
        }
        reports.map((report) => {
          if (report.reportStatus === value) filtered.push(report);
        });
        value === "processing" && filtered.reverse();
        setFilteredReports(filtered);
        setReportsLoading(false);
      }
    } catch (error) {
      setReportsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Box px={2}>
        <Box
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Subtitle my={1} title="Reports" />
            <IconButton size="small" onClick={loadReports}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
          <ActionButton
            text="Add"
            leftIcon="add"
            fullWidth={false}
            my={0}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
        >
          {reportStatuses.map((status, index) => (
            <Box key={index}>
              <ActionButton
                text={`${status.label} (${status.count})`}
                variant=""
                sx={{
                  textTransform: "capitalize",
                  py: 0,
                  fontSize: "0.85rem",
                  boxShadow:
                    "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                  bgcolor:
                    selectedStatusView === status.value ? "#fee5b9" : "#fff",
                  fontWeight: selectedStatusView === status.value ? 700 : "400",
                  color:
                    selectedStatusView === status.value ? "primary.main" : "",
                  my: 1,
                  "&:hover": {
                    bgcolor: "#fee5b9",
                  },
                }}
                fullWidth={false}
                size="small"
                onClick={() => handleStatusFilter(status.value)}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <LoadingBackdrop open={loading} />
    </div>
  );
};

export default StaffReports;
