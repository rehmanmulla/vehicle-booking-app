const { VehicleType, Vehicle, sequelize } = require('../models');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create vehicle types
    await VehicleType.bulkCreate([
      { name: 'Cruiser', wheels: 2 },
      { name: 'Sports', wheels: 2 },
      { name: 'Hatchback', wheels: 4 },
      { name: 'SUV', wheels: 4 },
      { name: 'Sedan', wheels: 4 }
    ]);

    // Create vehicles
    await Vehicle.bulkCreate([
      // 2 wheelers
      { name: 'Harley Davidson Street 750', typeId: 1 },
      { name: 'Indian Scout', typeId: 1 },
      { name: 'Yamaha R1', typeId: 2 },
      { name: 'Kawasaki Ninja', typeId: 2 },
      
      // 4 wheelers
      { name: 'Maruti Swift', typeId: 3 },
      { name: 'Hyundai i20', typeId: 3 },
      { name: 'Toyota Fortuner', typeId: 4 },
      { name: 'Mahindra XUV700', typeId: 4 },
      { name: 'Honda City', typeId: 5 },
      { name: 'Hyundai Verna', typeId: 5 }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();