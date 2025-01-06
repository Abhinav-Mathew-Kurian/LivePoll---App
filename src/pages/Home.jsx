import React from "react";
import NavBar from "../components/NavBar";
import { Typography, Card, Box, Button } from "@mui/material";
import "../index.css";
import { useNavigate } from "react-router-dom";

const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 2 + 1;

    stars.push(
      <Box
        key={i}
        sx={{
          position: "absolute",
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          borderRadius: "50%",
          top: `${top}%`,
          left: `${left}%`,
          animation: `twinkle ${duration}s infinite ease-in-out`,
          opacity: 0.5,
        }}
      />
    );
  }
  return stars;
};

const Home = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    fontFamily: '"Orbitron", sans-serif',
    textTransform: "uppercase",
    fontSize: { xs: "0.8rem", sm: "1rem" },
    letterSpacing: "0.15em",
    padding: { xs: "10px 20px", sm: "12px 24px" },
    margin: "10px",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)", // Made more transparent
    border: "2px dashed white",
    borderRadius: "30px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Reduced shadow opacity
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)", // Made more transparent
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      transform: "scale(1.1)",
    },
  };
  const handleCreatePoll = () => {
    navigate("/Poll-Create");
  };
  const handleViewPoll = () => {
    navigate("/Poll-View");
  };
  return (
    <>
      <NavBar />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "transparent",
          overflow: "hidden",
        }}
      >
        {/* Stars Container */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          {generateStars(150)}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "80vh",
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Card
            sx={{
              width: { xs: "90%", sm: "80%" },
              padding: 0.5,
              borderRadius: "15px",
              background: "transparent",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              border: "3px dashed rgba(255, 255, 255)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                background: "transparent",
                borderRadius: "12px",
                padding: { xs: 2, sm: 4 },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3rem",
                  },
                  marginLeft: "20px",
                  background: "linear-gradient(to right, #00f260, #0575e6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.8)",
                  textAlign: "center",
                }}
              >
                QuickPoll
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.9)",
                  marginTop: "1rem",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                Engage your audience with dynamic, real-time polls and see the
                results unfold live. Join QuickPoll today to create, share, and
                explore insightful polls effortlessly!
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                }}
              >
                <Button onClick={handleCreatePoll} sx={buttonStyle}>
                  Create Poll
                </Button>
                <Button onClick={handleViewPoll} sx={buttonStyle}>
                  View Polls
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Home;
