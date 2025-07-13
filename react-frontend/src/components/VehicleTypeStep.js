import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { vehicleAPI } from "../services/api";

const VehicleTypeStep = ({ wheels, vehicleType, onChange }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        setLoading(true);
        const response = await vehicleAPI.getVehicleTypes(wheels);
        setVehicleTypes(response.data);
      } catch (err) {
        setError("Error fetching vehicle types");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (wheels) {
      fetchVehicleTypes();
    }
  }, [wheels]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  if (loading) {
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Type of vehicle
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <FormControl component="fieldset" className="w-full">
        <RadioGroup
          value={vehicleType}
          onChange={handleChange}
          name="vehicleType"
        >
          {vehicleTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.id.toString()}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {!vehicleType && (
        <Alert severity="error" className="mt-4">
          Please select a vehicle type.
        </Alert>
      )}
    </Box>
  );
};
export default VehicleTypeStep;
