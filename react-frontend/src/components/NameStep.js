import React, { useState } from 'react';
import { TextField, Typography, Box, Alert } from '@mui/material';

const NameStep = ({ firstName, lastName, onChange }) => {
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    onChange(field, value);
    if (error) setError('');
  };

  const isValid = firstName.trim() && lastName.trim();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        What is your name?
      </Typography>
      
      <Box className="space-y-4">
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          fullWidth
          variant="outlined"
          required
        />
        
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      
      {!isValid && (
        <Alert severity="error" className="mt-4">
          Please enter both first and last name.
        </Alert>
      )}
    </Box>
  );
};

export default NameStep;