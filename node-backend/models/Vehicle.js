const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicle_types',
      key: 'id'
    }
  }
}, {
  tableName: 'vehicles',
  timestamps: true
});

module.exports = Vehicle;