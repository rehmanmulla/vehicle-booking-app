import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Box,
} from "@mui/material";

const NumberWheels = ({ next, updateForm }) => {
  const [wheels, setWheels] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!wheels) return setError("Please select number of wheels");
    updateForm({ wheels: parseInt(wheels) });
    next();
  };

  return (
    <Box className="customBox" sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
      <FormControl>
        <Typography variant="h5">Number of Wheels</Typography>
        <RadioGroup value={wheels} onChange={(e) => setWheels(e.target.value)}>
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleNext} fullWidth>
          Next
        </Button>
      </FormControl>
    </Box>
  );
};

export default NumberWheels;
