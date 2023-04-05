import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Container from "@mui/material/Container";
import ActionButton from "../Buttons/ActionButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../images/wuda/logo-32x32.png";
import Link from "../Links/Link";
import { Avatar, Icon, ListItemIcon } from "@mui/material";
import Subtitle from "../Typography/Subtitle";

function Navbar(props) {
  const pages = [
    // { text: "Dishes", icon: "dinner_dining", to: "/meals" },
    { text: "About Us", icon: "info", to: () => props.setOpenAboutUs(true) },
  ];
  const userPages = [
    // { text: "Profile", icon: "person", to: () => props.setOpenProfile(true) },
    {
      text: "Favorites",
      icon: "favorite",
      to: () => props.setOpenFavorites(true),
    },
    { text: "Orders", icon: "list", to: () => props.setOpenOrders(true) },
    {
      text: "Account",
      icon: "manage_accounts",
      to: () => props.setOpenAccount(true),
    },

    // { text: "Logout", icon: "logout", to: "logout" },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const { window } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const drawerWidth = 240;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      // props.setUser((prevState) => {
      //   prevState = {};
      //   window.localStorage.setItem("wdUser", JSON.stringify({ ...prevState }));
      //   return { ...prevState };
      // });
      window.localStorage.removeItem("wdUser");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = async (to) => {
    if (to !== "" && to !== "logout") navigate(to);

    to === "logout" && handleSignOut();
  };

  const openSocialMedia = (platform) => {
    let url,
      webUrl = "";
    switch (platform) {
      case "facebook":
        url = props.restaurantDetails.contact.socials.facebook.url;
        webUrl = props.restaurantDetails.contact.socials.facebook.webUrl;
        break;
      case "instagram":
        url = props.restaurantDetails.contact.socials.instagram.url;
        webUrl = props.restaurantDetails.contact.socials.instagram.webUrl;
        break;
      case "twitter":
        url = props.restaurantDetails.contact.socials.twitter.url;
        webUrl = props.restaurantDetails.contact.socials.twitter.webUrl;
        break;
      case "snapchat":
        url = props.restaurantDetails.contact.socials.snapchat.url;
        webUrl = props.restaurantDetails.contact.socials.snapchat.webUrl;
        break;
      case "whatsapp":
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          const isWhatsAppInstalled = /WhatsApp/i.test(navigator.userAgent);
          if (isWhatsAppInstalled) {
            url = `whatsapp://send?text=Hello%20Wuda%20Lounge!&phone=${props.restaurantDetails.contact.socials.whatsapp.number}`;
          } else {
            const platform = /(android)/i.test(navigator.userAgent)
              ? "android"
              : "ios";
            url = `https://wa.me/?text=Hello%20Wuda%20Lounge!&phone=${
              props.restaurantDetails.contact.socials.whatsapp.number
            }&app_absent=1${platform === "android" ? "&fallback_url=" : ""}${
              platform === "android"
                ? "market://details?id=com.whatsapp"
                : "https://apps.apple.com/app/id310633997"
            }`;
          }
        } else {
          url = `https://web.whatsapp.com/send?phone=+${props.restaurantDetails.contact.socials.whatsapp.number}`;
        }
        break;
      default:
        return;
    }

    // Open the URL in the app or web app, depending on the device and app availability
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const appUrl = url;
      // const webUrl = webUrl;
      const appWindow = window.open(appUrl, "_blank");
      setTimeout(() => {
        if (!appWindow || appWindow.closed || appWindow.closed === undefined) {
          window.location.href = webUrl;
        }
      }, 500);
    } else {
      window.open(webUrl, "_blank");
    }
  };

  const boltFoodButton = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const platform = /(android)/i.test(navigator.userAgent)
        ? "android"
        : "ios";
      // window.location.href = `boltfood://${
      //   platform === "android" ? "com.taxify.client" : "com.taxify.boltfood"
      // }?restaurant=${encodeURIComponent("afrik-gardens")}`;
      window.open(
        props.restaurantDetails.contact.socials.boltFood.url,
        "_blank"
      );
      // window.location.href =
      //   "https://food.bolt.eu/en-US/137/p/38734-veggie-box";
    } else {
      alert("Please open this app on a mobile device to use Bolt Food.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const file = await fetch(
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        ).then((response) => response.blob());
        const fileObj = new File([file], "image.jpg", { type: file.type });
        await navigator.share({
          title: props.restaurantDetails.name,
          text: `Check out amazing dishes at ${props.restaurantDetails.name}`,
          url: props.restaurantDetails.address.url,
          files: [fileObj],
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      console.log("Share not supported, using fallback method");
      // Use another share method here, such as a third-party share dialog or clipboard copy
      const fallbackUrl = "https://www.wudalounge.com";
      try {
        await navigator.clipboard.writeText(fallbackUrl);
        console.log("URL copied to clipboard");
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Clipboard write failed:", error);
        // Use a share dialog here if clipboard write fails
        window.open(
          `mailto:?subject=Check out ${props.restaurantDetails.name}&body=${fallbackUrl}`
        );
      }
    }
  };

  ////////////drawer///////////////////
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const splitName = (name) => {
    let names = name.split(" ");
    names.splice(0, 1);
    return names.map((n, index) => {
      return (
        <Typography key={index} component="span" overflow="hidden">
          {n}{" "}
        </Typography>
      );
    });
  };
  const drawer = (
    <Box
      // onClick={handleDrawerToggle}
      sx={{
        textAlign: "left",
        pt: "4px",
      }}
    >
      <Box my={1} px={2}>
        {props.user && props.user._id ? (
          <Box
            sx={{ cursor: "pointer" }}
            display="flex"
            justifyContent="left"
            alignItems="center"
            onClick={() => props.setOpenProfile(true)}
          >
            <Avatar
              alt={props.user.name && props.user.name}
              src={props.user.image}
              // sx={{ width: 56, height: 56 }}
            />
            {/* <Avatar>{props.user.name.slice(0)[0]}</Avatar> */}
            <Box ml={2} boxSizing="border-box" overflow="hidden">
              {/* <Typography
                variant="h5"
                noWrap
                sx={{
                  // fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                {props.user.name}
              </Typography> */}
              <Subtitle title={props.user.name.split(" ")[0]} my={0} />
              {/* {splitName(props.user.name)} */}

              <Typography fontWeight={500}>{`0${props.user.phoneNumber.slice(
                -9
              )}`}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Typography component="a" href="/" sx={{ mr: 1 }}>
              <img
                src={logo}
                alt={`${props.restaurantDetails.name} logo`}
                width="30"
                height="30"
                style={{ borderRadius: "50%" }}
              />
            </Typography>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="h5"
                // noWrap
                sx={{
                  // fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                <Link
                  text={`${props.restaurantDetails.shortName}`}
                  to="/"
                  color="#000"
                />
              </Typography>
              <Typography
                variant="body2"
                // noWrap
                sx={{
                  // fontFamily: "monospace",
                  ml: 1,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                {props.restaurantDetails.nameExtension}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <List sx={{ height: "100%" }}>
        {props.user
          ? userPages.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => item.to()}
                  key={index}
                  sx={{ textAlign: "left" }}
                >
                  <ListItemIcon>
                    <Icon sx={{ color: "primary.light" }}>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText key={index} primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))
          : ""}
        {props.user ? (
          ""
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left" }}
                onClick={() => props.setOpenPhoneNumber(true)}
              >
                <ListItemIcon>
                  <Icon sx={{ color: "primary.light" }}>person</Icon>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Divider sx={{ my: 3 }} />
          {pages.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => item.to()}
                key={index}
                sx={{ textAlign: "left" }}
              >
                <ListItemIcon>
                  <Icon sx={{ color: "#ea8255" }}>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText key={index} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        {props.user ? (
          <Box mt={4}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSignOut}
                sx={{ textAlign: "left" }}
              >
                <ListItemIcon>
                  <Icon color="error">logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </Box>
        ) : (
          ""
        )}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box position="absolute" sx={{ top: "auto", bottom: 0 }}>
          <Box display="flex" justifyContent="center">
            <ActionButton
              text="Find us on Bolt Food"
              backgroundColor="#34D186"
              fullWidth={false}
              size="small"
              my={1}
              onClick={boltFoodButton}
              hoverColor="#34D186"
            />
          </Box>
          <IconButton
            onClick={() => openSocialMedia("facebook")}
            size="large"
            color="#3b5998"
          >
            <Facebook sx={{ color: "#3b5998" }} />
          </IconButton>
          <IconButton
            size="large"
            color="#3b5998"
            onClick={() => openSocialMedia("instagram")}
          >
            <Instagram sx={{ color: "#c13584" }} />
          </IconButton>
          {props.restaurantDetails.contact.socials.twitter.url.length ? (
            <IconButton
              size="large"
              color="#1da1f2"
              onClick={() => openSocialMedia("twitter")}
            >
              <Twitter sx={{ color: "#1da1f2" }} />
            </IconButton>
          ) : (
            ""
          )}
          <IconButton
            size="large"
            color="#25D366"
            onClick={() => openSocialMedia("whatsapp")}
          >
            <WhatsApp sx={{ color: "#25D366" }} />
          </IconButton>
          {/* <IconButton
          size="large"
          sx={{
            borderRadius: "50%",
            bgcolor: "#000",
            p: 0.5,
            "&:hover": {
              bgcolor: "#000",
            },
          }}
          onClick={() => openSocialMedia("snapchat")}
        >
          <Icon sx={{ color: "#FFFC00" }}>snapchat</Icon>
        </IconButton> */}
        </Box>
      </Box>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  // ////////drawer end///////////////////////////////

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          // background: "rgba(0,0,0, 1)",
          pb: 0.4,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)",
          width: { md: "60%" },
          left: { md: "20%" },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              component="a"
              href="/"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            >
              <img
                src={logo}
                alt={`${props.restaurantDetails.name} logo`}
                width="40"
                height="30"
                style={{ borderRadius: "50%" }}
              />
            </Typography>

            <Box display="flex" flexDirection="column">
              <Typography
                variant="h5"
                // noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                <Link
                  text={`${props.restaurantDetails.shortName}`}
                  to="/"
                  color="#000"
                />
              </Typography>
              <Typography
                variant="body2"
                // noWrap
                sx={{
                  display: { xs: "none", md: "flex" },
                  // fontFamily: "monospace",
                  ml: 1,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                {props.restaurantDetails.nameExtension}
              </Typography>
            </Box>

            <Typography
              component="a"
              href="/"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <img
                src={logo}
                alt={`${props.restaurantDetails.name} logo`}
                width="30"
                height="30"
                style={{ borderRadius: "50%" }}
              />
            </Typography>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="h5"
                // noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                <Link
                  text={`${props.restaurantDetails.shortName}`}
                  to="/"
                  color="#000"
                />
              </Typography>
              <Typography
                variant="body2"
                // noWrap
                sx={{
                  ml: 1,
                  display: { xs: "flex", md: "none" },
                  // fontFamily: "",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                {props.restaurantDetails.nameExtension}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="small"
                aria-label="search"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ mx: 1, color: "info.light" }}
                onClick={handleShare}
                color="info"
              >
                <Icon fontSize="small">
                  {/iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !window.MSStream
                    ? "ios_share"
                    : "share"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                aria-label="search"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => props.setOpenSearch(true)}
                color="primary"
              >
                <SearchIcon />
              </IconButton>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => item.to()}
                    sx={{
                      mx: 1,
                    }}
                  >
                    <Link text={item.text} />
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  // flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "right",
                  ml: 1,
                }}
              >
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
                <Box
                // component="nav"
                >
                  <Drawer
                    anchor="right"
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    slots={{
                      backdrop: () => (
                        <Box
                          sx={{
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(5.8px)",
                            WebkitBackdropFilter: "blur(5.8px)",
                            width: "100%",
                            height: "100%",
                          }}
                          onClick={handleDrawerToggle}
                        />
                      ),
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      // display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": {
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(8.8px)",
                        WebkitBackdropFilter: "blur(8.8px)",

                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Box>
              </Box>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "primary.main",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  p: 0,
                  ml: 2,
                  "&:hover": {
                    color: "#686E26",
                  },
                }}
              >
                <PersonIcon fontSize="medium" />
              </IconButton>
              {/* {props.user === null && (
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <NavbarButton
                    href="/login"
                    variant="contained"
                    text="Login"
                  />
                </Box>
              )} */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar
        sx={{
          background: "rgba(255, 255, 255, 0.85)",
        }}
      />
    </>
  );
}
export default Navbar;
