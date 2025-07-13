import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box,
  Alert,
  CircularProgress 
} from '@mui/material';
import { vehicleAPI } from '../services/api';

const VehicleModelStep = ({ vehicleType, vehicleModel, onChange }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await vehicleAPI.getVehiclesByType(vehicleType);
        setVehicles(response.data);
      } catch (err) {
        setError('Error fetching vehicles');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleType) {
      fetchVehicles();
    }
  }, [vehicleType]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-8">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom className="text-gray-800 font-semibold">
        Specific Model
      </Typography>
      
      <Typography variant="body1" className="text-gray-600 mb-6">
        Choose the specific vehicle model you'd like to rent:
      </Typography>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      {vehicles.length === 0 && !loading && (
        <Alert severity="info" className="mb-4">
          No vehicles available for the selected type.
        </Alert>
      )}
      
      <FormControl component="fieldset" className="w-full">
        <RadioGroup
          value={vehicleModel}
          onChange={handleChange}
          name="vehicleModel"
          className="space-y-2"
        >
          {vehicles.map((vehicle) => (
            <FormControlLabel
              key={vehicle.id}
              value={vehicle.id.toString()}
              control={<Radio color="primary" />}
              label={
                <Box className="ml-2">
                  <Typography variant="body1" className="font-medium">
                    {vehicle.name}
                  </Typography>
                  {vehicle.type && (
                    <Typography variant="body2" className="text-gray-500">
                      {vehicle.type.name}
                    </Typography>
                  )}
                </Box>
              }
              className="border border-gray-200 rounded-lg p-3 m-1 hover:bg-gray-50 transition-colors"
            />
          ))}
        </RadioGroup>
      </FormControl>
      
      {!vehicleModel && vehicles.length > 0 && (
        <Alert severity="error" className="mt-4">
          Please select a vehicle model to continue.
        </Alert>
      )}
    </Box>
  );
};

export default VehicleModelStep;