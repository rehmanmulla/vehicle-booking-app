import React from 'react';
import { 
  Typography, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box,
  Alert 
} from '@mui/material';

const WheelsStep = ({ wheels, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Number of wheels
      </Typography>
      
      <FormControl component="fieldset" className="w-full">
        <RadioGroup
          value={wheels}
          onChange={handleChange}
          name="wheels"
        >
          <FormControlLabel 
            value="2" 
            control={<Radio />} 
            label="2 Wheeler" 
          />
          <FormControlLabel 
            value="4" 
            control={<Radio />} 
            label="4 Wheeler" 
          />
        </RadioGroup>
      </FormControl>
      
      {!wheels && (
        <Alert severity="error" className="mt-4">
          Please select the number of wheels.
        </Alert>
      )}
    </Box>
  );
};

export default WheelsStep;