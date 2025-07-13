import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormStep from './components/FormStep';
import NameStep from './components/NameStep';
import WheelsStep from './components/WheelsStep';
import VehicleTypeStep from './components/VehicleTypeStep';
import VehicleModelStep from './components/VehicleModelStep';
import DateRangeStep from './components/DateRangeStep';
import { vehicleAPI } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const STEPS = {
  NAME: 0,
  WHEELS: 1,
  VEHICLE_TYPE: 2,
  VEHICLE_MODEL: 3,
  DATE_RANGE: 4
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.NAME);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    startDate: null,
    endDate: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.DATE_RANGE) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await vehicleAPI.createBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleModel,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        endDate: formData.endDate.format('YYYY-MM-DD')
      });
      
      alert('Booking created successfully!');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        wheels: '',
        vehicleType: '',
        vehicleModel: '',
        startDate: null,
        endDate: null
      });
      setCurrentStep(STEPS.NAME);
    } catch (error) {
      alert('Error creating booking: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.NAME:
        return (
          <NameStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            onChange={(field, value) => setFormData({...formData, [field]: value})}
          />
        );
      case STEPS.WHEELS:
        return (
          <WheelsStep
            wheels={formData.wheels}
            onChange={(value) => setFormData({...formData, wheels: value, vehicleType: '', vehicleModel: ''})}
          />
        );
      case STEPS.VEHICLE_TYPE:
        return (
          <VehicleTypeStep
            wheels={formData.wheels}
            vehicleType={formData.vehicleType}
            onChange={(value) => setFormData({...formData, vehicleType: value, vehicleModel: ''})}
          />
        );
      case STEPS.VEHICLE_MODEL:
        return (
          <VehicleModelStep
            vehicleType={formData.vehicleType}
            vehicleModel={formData.vehicleModel}
            onChange={(value) => setFormData({...formData, vehicleModel: value})}
          />
        );
      case STEPS.DATE_RANGE:
        return (
          <DateRangeStep
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(field, value) => setFormData({...formData, [field]: value})}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="min-h-screen bg-gray-50">
          <FormStep
            currentStep={currentStep}
            totalSteps={Object.keys(STEPS).length}
            onNext={handleNext}
            isSubmitting={isSubmitting}
          >
            {renderStep()}
          </FormStep>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;