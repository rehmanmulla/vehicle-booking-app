const sequelize = require('../config/database');
const VehicleType = require('./VehicleType');
const Vehicle = require('./Vehicle');
const Booking = require('./Booking');

// Define associations
VehicleType.hasMany(Vehicle, { foreignKey: 'typeId', as: 'vehicles' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId', as: 'type' });

Vehicle.hasMany(Booking, { foreignKey: 'vehicleId', as: 'bookings' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

module.exports = {
  sequelize,
  VehicleType,
  Vehicle,
  Booking
};