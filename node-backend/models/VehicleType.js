const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VehicleType = sequelize.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wheels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[2, 4]]
    }
  }
}, {
  tableName: 'vehicle_types',
  timestamps: true
});

module.exports = VehicleType;