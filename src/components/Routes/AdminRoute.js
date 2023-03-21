import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import Ably from "ably/promises";

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
    // const socket = io("https://wudalounge-server.vercel.app/");

    // socket.on("connect", () => {
    //   console.log("Socket connected: ", socket.id);
    // });

    // socket.on("newOrder", (data) => {
    //   // window.alert("New order received=Web Socket: ", data);
    //   toast.success("new order received");
    //   // getChartData();
    //   // getBriefs();
    // });

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    // });

    // return () => {
    //   socket.disconnect();
    // };
    const ably = new Ably.Realtime(
      "zf8B2g.48jGgQ:srWXyb4--QGlLCKAV3RlVsoJ6D-tHOxxtU4d7c3xXRg"
    );
    const channel = ably.channels.get("newOrder");

    channel.subscribe("newOrder", (data) => {
      console.log("New message received:", data);
      toast.success(`New order received from `);
      // Do something with the new message here
    });

    return () => {
      channel.unsubscribe();
      ably.close();
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
