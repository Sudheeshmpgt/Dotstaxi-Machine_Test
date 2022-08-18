import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = false;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    setToken(token);
  }, []);

  const logout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("usertoken");
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleJoinNow = () => {
    navigate("/signup");
    handleCloseNavMenu();
  };

  const handleSignIn = () => {
    navigate("/");
    handleCloseNavMenu();
  };

  return (
    <Box component={Paper} sx={{ width: "100%", position: "fixed" }}>
      <Box sx={{ backgroundColor: "#80c7ff" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Abril Fatface, cursive",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.15rem",
                color: "inherit",
                textDecoration: "none",
                textShadow:
                  "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
              }}
            >
              MyCab
            </Typography>
            <Typography
              variant="p"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Abril Fatface, cursive",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyCab
            </Typography>
            {!user ? (
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                <Button
                  size="small"
                  onClick={handleJoinNow}
                  sx={{
                    ml: 2,
                    color: "white",
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      md: "1.3rem",
                    },
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  size="small"
                  onClick={handleSignIn}
                  sx={{
                    ml: 2,
                    color: "white",
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      md: "1.3rem",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                      component={Paper}
                        alt="Remy Sharp"
                        src={user?.profileImg}
                        sx={{ width: {xs:35, md:45}, height: {xs:35, sm:45} }}
                      />
                      <Box
                      component={Paper}
                        sx={{
                          ml: -2,
                          mr: 2,
                          width: {xs:35, sm:40},
                          height: "auto",
                          p: 0.7,
                          backgroundColor: "#cce8ff",
                          borderRadius: 3,
                        }}
                      >
                        <Typography
                          fontWeight={700}
                          fontSize={{ sm: "0.9rem" }}
                          cololr="text.primary"
                          sx={{ml:1}}
                        >
                          Me
                        </Typography>
                      </Box>
                  </IconButton>
                </Tooltip>
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
                  <MenuItem >
                    <Typography textAlign="center">My Vehicle</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </Box>
    </Box>
  );
}

export default Header;
