import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import ActionButton from "../../components/Buttons/ActionButton";
import Subtitle from "../../components/Typography/Subtitle";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import { getUsers } from "../../serverFunctions/admin";
import User from "../../components/PopUps/Admin/User";

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

const Users = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [userGroups, setUserGroups] = useState([
    { label: "customers", value: "subscriber", count: 0 },
    { label: "staff", value: "staff", count: 0 },
    { label: "admins", value: "admin", count: 0 },
  ]);
  const [selectedUserGroup, setSelectedUserGroup] = useState("subscriber");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUser, setOpenUser] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setSelectedUserGroup("subscriber");
    try {
      const res = await getUsers(props.user.token);
      setUsers(res.data);

      /////set count/////////
      let newUserGroups = [...userGroups];
      newUserGroups.forEach((userGroup, index) => {
        let count = res.data.filter(
          (user) => user.role === userGroup.value
        ).length;
        newUserGroups[index].count = count;
      });
      let filtered = [];
      setUserGroups(newUserGroups);
      res.data.map((user) => {
        if (user.role === "subscriber") filtered.push(user);
      });
      setFilteredUsers(filtered);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserGroupFilter = (value) => {
    let filtered = [];
    if (users && users.length) {
      setSelectedUserGroup(value);

      users.map((user) => {
        if (user.role === value) filtered.push(user);
      });
      setFilteredUsers(filtered);
    }
  };

  const handleUserSelected = (user) => {
    setSelectedUser(user);
    setOpenUser(true);
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
            <Subtitle my={1} title="Users" />
            <IconButton size="small" onClick={loadUsers}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
          <ActionButton
            text="Create"
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
          {userGroups.map((userGroup, index) => (
            <Box key={index}>
              <ActionButton
                text={`${userGroup.label} (${userGroup.count})`}
                variant=""
                sx={{
                  textTransform: "capitalize",
                  py: 0,
                  fontSize: "0.85rem",
                  boxShadow:
                    "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                  bgcolor:
                    selectedUserGroup === userGroup.value ? "#fee5b9" : "#fff",
                  fontWeight:
                    selectedUserGroup === userGroup.value ? 700 : "400",
                  color:
                    selectedUserGroup === userGroup.value ? "primary.main" : "",
                  my: 1,
                  "&:hover": {
                    bgcolor: "#fee5b9",
                  },
                }}
                fullWidth={false}
                size="small"
                onClick={() => handleUserGroupFilter(userGroup.value)}
              />
            </Box>
          ))}
        </Box>
        <Box>
          {filteredUsers.length
            ? filteredUsers.map((user, index) => (
                <Box
                  id={index}
                  sx={{
                    ...cardStyle,
                  }}
                  onClick={() => handleUserSelected(user)}
                >
                  <Box display="flex" columnGap={1} alignItems="center">
                    <Avatar
                      alt={user.name}
                      src={user.image}
                      sx={{ width: 76, height: 76, mr: 1 }}
                    />

                    <Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" fontWeight={500}>
                          {user.name}
                        </Typography>
                        {/* <IconButton
                          sx={{ m: 0, p: 0 }}
                          size="small"
                          color="info"
                        >
                          <Icon fontSize="small">edit</Icon>
                        </IconButton> */}
                      </Box>

                      <Typography variant="body2" fontWeight={500}>
                        ({user.phoneNumber})
                      </Typography>
                      {user.email ? (
                        <Typography variant="body2">
                          Email: {user.email}
                        </Typography>
                      ) : (
                        ""
                      )}
                      {user.addresses.length ? (
                        <Typography variant="body2">
                          Address: {user.addresses[0].description}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Box>
              ))
            : ""}
        </Box>
      </Box>
      <LoadingBackdrop open={loading} />
      {selectedUser ? (
        <User
          open={openUser}
          user={props.user}
          selectedUser={selectedUser}
          onClose={() => setOpenUser(false)}
          loadUsers={loadUsers}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Users;
