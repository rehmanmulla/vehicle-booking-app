const { VehicleType, Vehicle, Booking } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const vehicleController = {
  // Get vehicle types by wheels
  getVehicleTypes: async (req, res) => {
    try {
      const { wheels } = req.query;
      const whereClause = wheels ? { wheels: parseInt(wheels) } : {};
      
      const vehicleTypes = await VehicleType.findAll({
        where: whereClause,
        include: [{
          model: Vehicle,
          as: 'vehicles'
        }]
      });
      
      res.json(vehicleTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get vehicles by type
  getVehiclesByType: async (req, res) => {
    try {
      const { typeId } = req.params;
      
      const vehicles = await Vehicle.findAll({
        where: { typeId },
        include: [{
          model: VehicleType,
          as: 'type'
        }]
      });
      
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create booking
  createBooking: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

      // Check for overlapping bookings
      const existingBooking = await Booking.findOne({
        where: {
          vehicleId,
          [Op.or]: [
            {
              startDate: {
                [Op.between]: [startDate, endDate]
              }
            },
            {
              endDate: {
                [Op.between]: [startDate, endDate]
              }
            },
            {
              [Op.and]: [
                { startDate: { [Op.lte]: startDate } },
                { endDate: { [Op.gte]: endDate } }
              ]
            }
          ]
        }
      });

      if (existingBooking) {
        return res.status(409).json({ 
          error: 'Vehicle is already booked for the selected dates' 
        });
      }

      const booking = await Booking.create({
        firstName,
        lastName,
        vehicleId,
        startDate,
        endDate
      });

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = vehicleController;