import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Container from "@mui/material/Container";
import NavbarButton from "../Buttons/NavbarButton";
import ActionButton from "../Buttons/ActionButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../images/logo-32x32.png";
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
    console.log(platform);
    let url;
    switch (platform) {
      case "facebook":
        url = "https://www.facebook.com/chanchoman1";
        break;
      case "instagram":
        url = "https://www.instagram.com/governor_narh";
        break;
      case "twitter":
        url = "https://www.twitter.com/governornarh";
        break;
      case "whatsapp":
        url = "https://api.whatsapp.com/send?phone=+233240298910";
        break;
      case "snapchat":
        url = "https://www.snapchat.com/add/wudalounge";
        break;
      default:
        return;
    }

    window.open(url, "_blank");
  };

  const boltFoodButton = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "https://apps.apple.com/app/id310633997";
    } else if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.bolt.food&hl=en";
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
              <img src={logo} alt="wuda lounge logo" width="30" height="30" />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              sx={{
                // fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              <Link text="Wuda Lounge" to="/" color="#000" />
            </Typography>
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
          <Box position="absolute" sx={{ top: "auto", bottom: 0 }}>
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

      <Box position="absolute" sx={{ top: "auto", bottom: 0 }}>
        {/* <Box px={2}>
          <ActionButton
            text="Find us on Bolt Food"
            backgroundColor="#34D186"
            fullWidth={false}
            size="small"
            my={1}
            onClick={boltFoodButton}
          />
        </Box> */}
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
        <IconButton
          size="large"
          color="#1da1f2"
          onClick={() => openSocialMedia("twitter")}
        >
          <Twitter sx={{ color: "#1da1f2" }} />
        </IconButton>
        <IconButton
          size="large"
          color="#25D366"
          onClick={() => openSocialMedia("whatsapp")}
        >
          <WhatsApp sx={{ color: "#25D366" }} />
        </IconButton>
        <IconButton
          size="large"
          sx={{ borderRadius: "50%", bgcolor: "#000", p: 0.5 }}
          onClick={() => openSocialMedia("snapchat")}
        >
          <Icon sx={{ color: "#FFFC00" }}>snapchat</Icon>
        </IconButton>
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
              <img src={logo} alt="Wuda Lounge logo" width="40" height="30" />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              <Link text="Wuda Lounge" to="/" color="#000" />
            </Typography>

            <Typography
              component="a"
              href="/"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <img src={logo} alt="wuda lounge logo" width="30" height="30" />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              <Link text="Wuda Lounge" to="/" color="#000" />
            </Typography>
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
