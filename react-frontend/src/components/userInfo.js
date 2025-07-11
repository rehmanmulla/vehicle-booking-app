import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const UserInfo = ({ next, updateForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both first and last names.");
      return;
    }
    updateForm({ firstName, lastName });
    next();
  };

  return (
    <Box
      className="customBox"
      sx={{
        p: 4,
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography variant="h5">What is your name?</Typography>

      <TextField
        fullWidth
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      {error && (
        <Typography color="error" fontSize="0.9rem">
          {error}
        </Typography>
      )}

      <Button variant="contained" onClick={handleNext} fullWidth>
        Next
      </Button>
    </Box>
  );
};

export default UserInfo;
