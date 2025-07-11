import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const SpecificModel = ({ next, updateForm, typeName }) => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const vehiclesLists = [
      {
        id: 1,
        name: "Maruti Suzuki Swift",
        brand: "Maruti Suzuki",
        fuelType: "Petrol",
        transmission: "Manual",
        seatingCapacity: 5,
        mileage: "22 km/l",
        price: "₹6.5 Lakhs",
        wheels: 4,
        type: "Hatchback",
      },
      {
        id: 2,
        name: "Hyundai Creta",
        brand: "Hyundai",
        fuelType: "Diesel",
        transmission: "Automatic",
        seatingCapacity: 5,
        mileage: "19 km/l",
        price: "₹10.5 Lakhs",
        wheels: 4,
        type: "SUV",
      },
      {
        id: 3,
        name: "Honda City",
        brand: "Honda",
        fuelType: "Petrol",
        transmission: "Manual",
        seatingCapacity: 5,
        mileage: "18 km/l",
        price: "₹9.5 Lakhs",
        wheels: 4,
        type: "Sedan",
      },
      {
        id: 4,
        name: "Tata Nexon EV",
        brand: "Tata",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 5,
        mileage: "312 km/charge",
        price: "₹14 Lakhs",
        wheels: 4,
        type: "SUV",
      },
      {
        id: 5,
        name: "Honda Activa 6G",
        brand: "Honda",
        fuelType: "Petrol",
        transmission: "CVT",
        seatingCapacity: 2,
        mileage: "50 km/l",
        price: "₹78,000",
        wheels: 2,
        type: "Scooter",
      },
      {
        id: 6,
        name: "Royal Enfield Classic 350",
        brand: "Royal Enfield",
        fuelType: "Petrol",
        transmission: "Manual",
        seatingCapacity: 2,
        mileage: "35 km/l",
        price: "₹1.9 Lakhs",
        wheels: 2,
        type: "Cruiser Bike",
      },
      {
        id: 7,
        name: "TVS Apache RTR 160",
        brand: "TVS",
        fuelType: "Petrol",
        transmission: "Manual",
        seatingCapacity: 2,
        mileage: "45 km/l",
        price: "₹1.2 Lakhs",
        wheels: 2,
        type: "Motorcycle (Gear)",
      },
      {
        id: 8,
        name: "Ather 450X",
        brand: "Ather",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 2,
        mileage: "146 km/charge",
        price: "₹1.4 Lakhs",
        wheels: 2,
        type: "Electric Bike",
      },
      {
        id: 9,
        name: "Jeep Wrangler",
        brand: "Jeep",
        fuelType: "Petrol",
        transmission: "Automatic",
        seatingCapacity: 5,
        mileage: "12 km/l",
        price: "₹58 Lakhs",
        wheels: 4,
        type: "SUV",
      },
      {
        id: 10,
        name: "Tata Ace",
        brand: "Tata",
        fuelType: "Diesel",
        transmission: "Manual",
        seatingCapacity: 2,
        mileage: "21 km/l",
        price: "₹5 Lakhs",
        wheels: 4,
        type: "Pickup Truck",
      },
    ];
    const selectedVehicleType = vehiclesLists.filter(
      (x) => x.type === typeName
    );
    setVehicles(selectedVehicleType);
  }, [typeName]);

  const handleNext = () => {
    if (!vehicleId) return setError("Please select a vehicle");
    updateForm({ vehicleId: parseInt(vehicleId) });
    next();
  };

  return (
    <Box className="customBox" sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
      <FormControl>
        <Typography variant="h6">Select Specific Model</Typography>
        <RadioGroup
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        >
          {vehicles.map((v) => (
            <FormControlLabel
              key={v.id}
              value={v.id.toString()}
              control={<Radio />}
              label={v.name}
            />
          ))}
        </RadioGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleNext} fullWidth>
          Next
        </Button>
      </FormControl>
    </Box>
  );
};

export default SpecificModel;
