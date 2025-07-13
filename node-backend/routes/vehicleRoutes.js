const express = require('express');
const { body } = require('express-validator');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// Validation middleware
const bookingValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('vehicleId').isInt().withMessage('Valid vehicle ID is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required')
];

// Routes
router.get('/vehicle-types', vehicleController.getVehicleTypes);
router.get('/vehicles/type/:typeId', vehicleController.getVehiclesByType);
router.post('/bookings', bookingValidation, vehicleController.createBooking);

module.exports = router;