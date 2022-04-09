import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import { modelDriver } from "./models/driver.js";

mongoose.connect(
  "mongodb+srv://vas:1234@cluster0.qkgem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true}
);

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static('my-app/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-app/build', 'index.html'))
  })
}

app.post("/getDrivers", async (req, res) => {
  const drivers = await modelDriver.find();
  res.json(drivers);
});

app.post("/createNewDriver", async (req, res) => {
  const {firstName, lastName, phone} = req.body;
  const small = new modelDriver({firstName: firstName, lastName:lastName, phone: phone, status: "waiting" });
  small.save();
  res.send(204)
})

app.patch("/status", async (req,res) => {
  const userId = req.body.id;

  const driver = await modelDriver.findById(userId);
  console.log(driver);

  const newStatus = req.body.status;

  driver.status = newStatus;

  driver.save()
  
  res.send(200)
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
