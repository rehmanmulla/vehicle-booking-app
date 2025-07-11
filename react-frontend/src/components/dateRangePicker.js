import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const DateRangePicker = ({ updateForm, submit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!startDate || !endDate)
      return setError("Please select start and end dates");
    if (new Date(startDate) > new Date(endDate))
      return setError("End date must be after start date");
    updateForm({ startDate, endDate });
    submit();
  };

  return (
    <Box className="customBox" sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6">Select Date Range</Typography>
      <TextField
        fullWidth
        type="date"
        label="Start Date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        type="date"
        label="End Date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ mt: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Next
      </Button>
    </Box>
  );
};

export default DateRangePicker;
