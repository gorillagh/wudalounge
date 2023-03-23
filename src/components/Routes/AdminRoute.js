import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Pusher from "pusher-js";

import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../serverFunctions/auth";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import AdminNavbar from "../Navbars/AdminNavbar";
import Search from "../PopUps/Search";
// import AdminNavBar from "../Navbars/AdminNavBar";

const AdminRoute = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
          console.log("Current admin -->", res);
        })
        .catch((err) => {
          setOk(false);
          console.log(err);
          toast.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("newOrder");

    channel.bind("order-placed", (data) => {
      console.log("New message received:", data);
      toast.success(`New order received`);
      // Do something with the new message here
    });

    return () => {
      pusher.unsubscribe("newOrder");
      pusher.disconnect();
    };
  }, []);

  return ok ? (
    <Box>
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
      {/* <AdminNavBar /> */}
      {props.children}
    </Box>
  ) : (
    <LoadingToRedirect
      to="/admin/login"
      message="Make sure you have administrative rights."
    />
  );
};

export default AdminRoute;
