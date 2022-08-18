const VehicleModel = require("../model/vehicleShema");
const { vehicleValidation } = require("../util/validationSchema");

const newVehicle = async (req, res) => {
  if (req.authVerified.roles === "user") {
    try {
      const { userId, vehicle_name, vehicle_number, vehicle_model } = req.body;
      const { error } = vehicleValidation(req.body);
      if (error) {
        res.status(400).send({ error: error.details[0].message });
      } else {
        const vehicle = await VehicleModel.findOne({
          vehicle_number: vehicle_number,
        });
        if (vehicle) {
          res.status(409).send({ error: "Vehicle already exists" });
        } else {
          const createVehicle = new VehicleModel({
            userId,
            vehicle_name,
            vehicle_number,
            vehicle_model,
          });
          const newVehicle = await createVehicle.save();
          res.status(201).send({
            message: "Vehicle added successfully",
            vehicle: newVehicle,
          });
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

const getAllVehicles = async (req, res) => {
  if (req.authVerified.roles === "user") {
    try {
      const vehicles = await VehicleModel.find({ userId: req.params.id });
      if (vehicles) {
        res.status(200).send({ message: "Ok", vehicle: vehicles });
      } else {
        res.status(404).send({ error: "Data not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

const getVehicle = async (req, res) => {
  if (req.authVerified.roles === "user") {
    try {
      const vehicles = await VehicleModel.findById(req.params.id);
      if (vehicles) {
        res.status(200).send({ message: "Ok", vehicle: vehicles });
      } else {
        res.status(404).send({ error: "Data not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

const updateVehicle = async (req, res) => {
  if (req.authVerified.roles === "user") {
    try {
      const vehicle = await VehicleModel.findById(req.params.id);
      if (vehicle) {
        vehicle.vehicle_name = req.body.vehicle_name || vehicle.vehicle_name;
        vehicle.vehicle_number =
          req.body.vehicle_number || vehicle.vehicle_number;
        vehicle.vehicle_model = req.body.vehicle_model || vehicle.vehicle_model;
        vehicle.userId = vehicle.userId;

        const updatedVehicle = await vehicle.save();
        res.status(201).send({
          message: "Vehicle Updated Successfully",
          vehicle: updatedVehicle,
        });
      } else {
        res.status(404).send({ error: "Data not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

const deleteVehicle = async (req, res) => {
  if (req.authVerified.roles === "user") {
    try {
      const vehicle = await VehicleModel.findByIdAndDelete(req.params.id);
      if (vehicle) {
        const vehicleDetails = await VehicleModel.find({});
        res.status(200).send({ message: "Ok", vehicle: vehicleDetails });
      } else {
        res.status(404).send({ message: "Vehicle not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

module.exports = {
  newVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
