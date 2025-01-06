import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogo = () => {
    navigate("/home");
  };

  const handleLinks = (event) => {
    const linkValue = event.target.getAttribute("value");

    if (linkValue === "Contact") {
      navigate("/Contact");
    } else if (linkValue === "About") {
      navigate("/About");
    } else {
      navigate("/Login");
    }
  };

  const reusableTypographyStyleLogo = {
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    fontFamily: '"Orbitron", sans-serif',
    textAlign: "center",
    color: "white",
    fontSize: { xs: "1.2rem", sm: "2rem" },
    textShadow: "0 0 10px #00f260, 0 0 20px #0575e6",
    cursor: "pointer",
    marginLeft: "10px",
  };

  const reusableTypographyStyleLink = {
    fontFamily: '"Orbitron", sans-serif',
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    textAlign: "center",
    color: "white",
    textShadow: "0 0 10px #00f260, 0 0 20px #0575e6",
    cursor: "pointer",
    fontSize: { xs: "0.5rem", sm: "0.8rem" },
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: "black",
        height: "100%",
        padding: "10px",
      }}
      role="presentation"
    >
      <Stack direction="column" spacing={2}>
        <Button onClick={handleLinks} value="About">
          <Typography
            sx={{
              ...reusableTypographyStyleLink,
              borderBottom: "2px dashed white",
              paddingBottom: "10px",
            }}
          >
            About
          </Typography>
        </Button>
        <Button onClick={handleLinks} value="Contact">
          <Typography
            sx={{
              ...reusableTypographyStyleLink,
              borderBottom: "2px dashed white",
              paddingBottom: "10px",
            }}
          >
            Contact
          </Typography>
        </Button>
        <Button onClick={handleLinks} value="Login">
          <Typography
            sx={{
              ...reusableTypographyStyleLink,
              borderBottom: "2px dashed white",
              paddingBottom: "10px",
            }}
          >
            Login
          </Typography>
        </Button>
      </Stack>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", borderBottom: "3px dashed white" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Logo Section */}
        <IconButton
          size="small"
          edge="start"
          aria-label="logo"
          onClick={handleLogo}
          sx={{ padding: 0, margin: 0 }}
        >
          <BarChartIcon
            sx={{
              fontSize: 55,
              color: "white",
              background: "linear-gradient(to right, #00f260, #0575e6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </IconButton>

        <Typography
          variant="h4"
          component="div"
          onClick={handleLogo}
          sx={{
            ...reusableTypographyStyleLogo,
            marginLeft: 1,
            paddingLeft: 0,
          }}
        >
          QuickPoll
        </Typography>

        {/* Desktop Links */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: { xs: "none", md: "flex" },
            marginLeft: "auto",
          }}
        >
          <Button>
            <Typography
              variant="h6"
              value="About"
              onClick={handleLinks}
              sx={reusableTypographyStyleLink}
            >
              About
            </Typography>
          </Button>
          <Button>
            <Typography
              variant="h6"
              value="Contact"
              onClick={handleLinks}
              sx={reusableTypographyStyleLink}
            >
              Contact
            </Typography>
          </Button>
          <Button>
            <Typography
              variant="h6"
              value="Login"
              onClick={handleLinks}
              sx={reusableTypographyStyleLink}
            >
              Login
            </Typography>
          </Button>
        </Stack>

        {/* Hamburger Menu */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            marginLeft: "auto",
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ color: "white", fontSize: 35 }} />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
