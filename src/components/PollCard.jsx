import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Box,
} from "@mui/material";

const PollCard = ({
  pollTitle = "Untitled Poll",
  pollOptions = [],
  onVote,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState(Array(pollOptions.length).fill(0));

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
  const handleVote = () => {
    if (selectedOption === null) return;

    const updatedResults = [...results];
    updatedResults[selectedOption] += 1;
    setResults(updatedResults);

    onVote?.(selectedOption, updatedResults);
    setSelectedOption(null);
  };

  const totalVotes = results.reduce((sum, votes) => sum + votes, 0);

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
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
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.9)",
            marginTop: "1rem",
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          {pollTitle}
        </Typography>
        {pollOptions.map((option, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant={selectedOption === index ? "contained" : "outlined"}
              onClick={() => setSelectedOption(index)}
            >
              {option}
            </Button>
            {totalVotes > 0 && (
              <LinearProgress
                variant="determinate"
                value={(results[index] / totalVotes) * 100}
                sx={{ mt: 1, height: 8 }}
              />
            )}
          </Box>
        ))}
        <Button
          fullWidth
          variant="contained"
          onClick={handleVote}
          disabled={selectedOption === null}
          sx={buttonStyle}
        >
          Submit Vote
        </Button>
        {totalVotes > 0 && (
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              fontFamily: '"Orbitron", sans-serif',
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.9)",
              marginTop: "1rem",
              fontSize: { xs: ".5rem", sm: ".7rem" },
            }}
          >
            Total Votes: {totalVotes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const PollDemo = () => (
  <Box
    sx={{
      p: 4,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PollCard
      pollTitle="What's your favorite programming language?"
      pollOptions={["JavaScript", "Python", "Java", "C++", "TypeScript"]}
      onVote={(optionIndex, results) =>
        console.log("Vote:", optionIndex, "Results:", results)
      }
    />
  </Box>
);

export default PollDemo;
