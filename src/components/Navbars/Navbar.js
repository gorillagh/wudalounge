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
import Container from "@mui/material/Container";
import NavbarButton from "../Buttons/NavbarButton";

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
import { Icon, ListItemIcon } from "@mui/material";

const pages = [{ text: "About Us", icon: "info" }];
const userPages = [
  { text: "Profile", icon: "" },
  { text: "My Orders", icon: "" },
  { text: "Account", icon: "" },
  { text: "Logout", icon: "" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const drawerWidth = 240;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleOpenUserMenu = (event) => {
    if (anchorElUser !== event.currentTarget) {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (e) => {
    setAnchorElUser(null);
    if (e.target.id !== "" && e.target.id !== "Logout")
      navigate(`/my/${e.target.id.toLowerCase()}`);

    e.target.id === "Logout" && handleSignOut();
  };

  ////////////drawer///////////////////
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", pt: "4px" }}>
      <Box sx={{ display: "flex", my: 1, pl: 2 }}>
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
      <Divider />

      <List>
        {user
          ? userPages.map((item, index) => (
              <>
                <ListItem key={index} disablePadding>
                  <ListItemButton key={index} sx={{ textAlign: "left" }}>
                    <ListItemIcon>
                      <Icon>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText key={index} primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </>
            ))
          : ""}
        {user ? (
          ""
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left" }}
                onClick={handleOpenUserMenu}
              >
                <ListItemIcon>
                  <Icon>person</Icon>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <hr />
          </>
        )}

        {pages.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton key={index} sx={{ textAlign: "left" }}>
              <ListItemIcon>
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText key={index} primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // ////////drawer end///////////////////////////////

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          background: "rgba(0,0,0, 0.4)",
        }}
      >
        <Container maxWidth="lg">
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
              <Link text="Wuda Lounge" to="/" color="#fff" />
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
              <Link text="Wuda Lounge" to="/" color="#fff" />
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={() => handleCloseNavMenu(page.text)}
                    sx={{
                      mx: 1,
                    }}
                  >
                    <Link text={page.text} to={`/${page.text}`} />
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "right",
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
                <Box component="nav">
                  <Drawer
                    anchor="right"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": {
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
                onClick={handleOpenUserMenu}
                sx={{
                  color: "primary.main",
                  display: {
                    xs: "none",
                    md: user !== null ? "block" : "none",
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

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user === null && (
                  <Box
                    sx={{
                      display: {
                        xs: user !== null ? "none" : "block",
                        md: "none",
                      },
                    }}
                  >
                    <MenuItem>
                      <NavbarButton
                        href="/login"
                        variant="contained"
                        text="Login"
                        onClick={handleCloseUserMenu}
                      />
                    </MenuItem>
                    <MenuItem>
                      <NavbarButton
                        href="/signup"
                        variant="outlined"
                        text="sign up"
                        onClick={handleCloseUserMenu}
                      />
                    </MenuItem>
                  </Box>
                )}
                <Box sx={{ display: { xs: user === null ? "none" : "block" } }}>
                  {settings.map((setting) => (
                    <MenuItem
                      id={setting}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center" id={setting}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Box>
              </Menu>
              {user === null && (
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <NavbarButton
                    href="/login"
                    variant="contained"
                    text="Login"
                  />
                  <NavbarButton
                    href="/signup"
                    variant="outlined"
                    text="sign up"
                  />
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <Toolbar color="inherit" sx={{ background: "rgba(0,0,0, 0.4)" }} /> */}
    </>
  );
}
export default Navbar;
