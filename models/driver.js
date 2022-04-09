import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const driverSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  status: String,
  drivingLoc: String,
  history: [
    {
      drivingLoc: String,
      timeStarted: String,
      timeEnded: String,
    }
  ]
})

driverSchema.methods.createNewDriver = function (firstName, lastName, phone) {
  this.categories.push({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    status: "waiting"
  });
  return this.save();
};

export const modelDriver = mongoose.model("Driver", driverSchema);
