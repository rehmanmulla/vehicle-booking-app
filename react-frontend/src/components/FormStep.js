import React from 'react';
import { Container, Paper, Button, Box, LinearProgress } from '@mui/material';

const FormStep = ({ currentStep, totalSteps, onNext, children, isSubmitting }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Container maxWidth="sm" className="py-8">
      <Paper elevation={3} className="p-8">
        <Box mb={4}>
          <LinearProgress variant="determinate" value={progress} />
          <Box mt={1} className="text-center text-sm text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </Box>
        </Box>
        
        <Box mb={4}>
          {children}
        </Box>
        
        <Box className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={isSubmitting}
            size="large"
          >
            {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormStep;