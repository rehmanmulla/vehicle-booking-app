import React from 'react';
import { Typography, Box, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DateRangeStep = ({ startDate, endDate, onChange }) => {
  const today = dayjs();
  const minEndDate = startDate ? startDate.add(1, 'day') : today.add(1, 'day');

  const handleStartDateChange = (date) => {
    onChange('startDate', date);
    // Reset end date if it's before the new start date
    if (endDate && date && endDate.isBefore(date)) {
      onChange('endDate', null);
    }
  };

  const handleEndDateChange = (date) => {
    onChange('endDate', date);
  };

  const isValid = startDate && endDate && startDate.isBefore(endDate);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Date range picker
      </Typography>
      
      <Box className="space-y-4">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          minDate={today}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined'
            }
          }}
        />
        
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={minEndDate}
          disabled={!startDate}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined'
            }
          }}
        />
      </Box>
      
      {!isValid && (
        <Alert severity="error" className="mt-4">
          Please select valid start and end dates.
        </Alert>
      )}
    </Box>
  );
};

export default DateRangeStep;