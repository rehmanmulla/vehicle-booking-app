import "./App.css";
import { useState } from "react";
import axios from "axios";
import UserInfo from "./components/userInfo";
import NumberWheels from "./components/numberWheels";
import TypeVehicle from "./components/typeVehicle";
import SpecificModel from "./components/specificModel";
import DateRangePicker from "./components/dateRangePicker";

function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const updateForm = (data) => {
    setForm({ ...form, ...data });
  };

  const onSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/bookings", form);
    } catch (error) {
      console.log("Booking failed", error);
    }
  };

  switch (step) {
    case 1:
      return <UserInfo next={nextStep} updateForm={updateForm} />;
    case 2:
      return <NumberWheels next={nextStep} updateForm={updateForm} />;
    case 3:
      return (
        <TypeVehicle
          next={nextStep}
          updateForm={updateForm}
          wheels={form.wheels}
        />
      );
    case 4:
      return (
        <SpecificModel
          next={nextStep}
          updateForm={updateForm}
          typeName={form.typeName}
        />
      );
    case 5:
      return <DateRangePicker updateForm={updateForm} submit={onSubmit} />;
    default:
      return <UserInfo next={nextStep} updateForm={updateForm} />;
  }
}

export default App;
