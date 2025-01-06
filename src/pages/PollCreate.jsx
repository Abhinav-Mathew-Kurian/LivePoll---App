import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";

const PollCreate = () => {
  const navigate = useNavigate();
  const [pollId, setPollId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("1 hour");

  const textFieldStyle = {
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "2px dashed white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
        border: "2px dashed white",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-focused": {
        color: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  };

  const buttonStyle = {
    fontFamily: '"Orbitron", sans-serif',
    textTransform: "uppercase",
    fontSize: { xs: "0.8rem", sm: "1rem" },
    letterSpacing: "0.15em",
    padding: { xs: "10px 20px", sm: "12px 24px" },
    margin: "10px",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)",
    border: "2px dashed white",
    borderRadius: "30px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
    marginTop: "20px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      transform: "scale(1.05)",
    },
  };

  const generateAlphanumericCode = (length = 10) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  useEffect(() => {
    setPollId(generateAlphanumericCode());
  }, []);

  const showError = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      background: "rgba(0, 0, 0, 0.9)",
      color: "#fff",
      confirmButtonColor: "#d33",
    });
  };

  const showSuccess = (message) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      background: "rgba(0, 0, 0, 0.9)",
      color: "#fff",
      confirmButtonColor: "#28a745",
    });
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      showError("A poll must have at least 2 options!");
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showError("No Poll title is provided!");
      return;
    }

    if (options.length < 2 || options.some((opt) => !opt.trim())) {
      showError("Provide at least 2 non-empty poll options!");
      return;
    }

    Swal.fire({
      title: "Creating Poll...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const pollData = {
        pollId,
        title,
        description,
        options,
        duration,
        createdAt: new Date().toISOString(),
      };

      console.log("Poll Data:", pollData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await showSuccess("Poll created successfully!");

      setTitle("");
      setDescription("");
      setOptions(["", ""]);
      setDuration("1 hour");
      setPollId(generateAlphanumericCode());

      await navigate(`/Poll-View/${pollId}`);
    } catch (error) {
      showError("Failed to create poll. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Orbitron", sans-serif',
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.9)",
          marginTop: "3rem",
          fontSize: { xs: "1.2rem", sm: "1.8rem" },
        }}
      >
        Create Your Awesome Polls in just a few Clicks!
      </Typography>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "auto",
          marginTop: "50px",
          padding: "2rem",
          background: "rgba(0, 0, 0, 0.3)",
          border: "3px dashed rgba(255, 255, 255, 0.5)",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: '"Orbitron", sans-serif',
            letterSpacing: "0.1em",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Poll ID:
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "1rem",
              marginLeft: "0.5rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {pollId}
          </Typography>
        </Box>
        <TextField
          label="Poll Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={textFieldStyle}
        />
        <TextField
          label="Poll Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={textFieldStyle}
        />
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", color: "rgba(255, 255, 255, 0.9)" }}
          >
            Options:
          </Typography>
          {options.map((option, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <TextField
                placeholder={`Option ${index + 1}`}
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                sx={{
                  marginRight: "0.5rem",
                  ...textFieldStyle,
                }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => removeOption(index)}
                sx={{
                  border: "2px dashed black",
                  minWidth: "100px",
                  background: "rgba(211, 47, 47, 0.7)",
                  "&:hover": {
                    background: "rgba(211, 47, 47, 0.9)",
                  },
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={addOption}
            fullWidth
            sx={buttonStyle}
          >
            Add Option
          </Button>
        </Box>

        <FormControl
          fullWidth
          sx={{
            marginTop: "1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px dashed white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
                border: "2px dashed white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
              "&.Mui-focused": {
                color: "white",
              },
            },
            "& .MuiSelect-select": {
              color: "white",
            },
          }}
        >
          <InputLabel>Poll Duration</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Poll Duration"
          >
            <MenuItem value="1 hour">1 Hour</MenuItem>
            <MenuItem value="2 hour">2 Hour</MenuItem>
            <MenuItem value="3 hour">3 Hour</MenuItem>
            <MenuItem value="6 hour">6 Hour</MenuItem>
            <MenuItem value="12 hour">12 Hour</MenuItem>
            <MenuItem value="1 day">1 Day</MenuItem>
            <MenuItem value="2 day">2 Day</MenuItem>
            <MenuItem value="3 day">3 Day</MenuItem>
            <MenuItem value="1 week">1 Week</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={buttonStyle}
        >
          Create Poll
        </Button>
      </Box>
    </>
  );
};

export default PollCreate;
