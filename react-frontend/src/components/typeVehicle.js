import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const TypeVehicle = ({ next, updateForm, wheels }) => {
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const vehicleTypes = [
      { id: 1, name: "Sedan", wheels: 4 },
      { id: 2, name: "SUV", wheels: 4 },
      { id: 3, name: "Hatchback", wheels: 4 },
      { id: 4, name: "Scooter", wheels: 2 },
      { id: 5, name: "Motorcycle (Gear)", wheels: 2 },
      { id: 6, name: "Electric Bike", wheels: 2 },
      { id: 7, name: "Cruiser Bike", wheels: 2 },
      { id: 8, name: "Pickup Truck", wheels: 4 },
      { id: 9, name: "Convertible", wheels: 4 },
      { id: 10, name: "Moped", wheels: 2 },
    ];
    const listOfSelectedWheel = vehicleTypes.filter((x) => x.wheels === wheels);
    setTypes(listOfSelectedWheel);
  }, [wheels]);

  const handleNext = () => {
    if (!typeId) return setError("Please select a vehicle type");
    updateForm({ typeName: typeId });
    next();
  };

  return (
    <Box className="customBox" sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
      <FormControl>
        <Typography variant="h6">Select Vehicle Type</Typography>
        <RadioGroup value={typeId} onChange={(e) => setTypeId(e.target.value)}>
          {types.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.name}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleNext} fullWidth>
          Next
        </Button>
      </FormControl>
    </Box>
  );
};

export default TypeVehicle;
