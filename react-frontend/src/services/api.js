import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const vehicleAPI = {
  getVehicleTypes: (wheels) => {
    const params = wheels ? { wheels } : {};
    return api.get('/vehicle-types', { params });
  },
  
  getVehiclesByType: (typeId) => {
    return api.get(`/vehicles/type/${typeId}`);
  },
  
  createBooking: (bookingData) => {
    return api.post('/bookings', bookingData);
  }
};

export default api;