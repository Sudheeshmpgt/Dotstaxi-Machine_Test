const route = require("express").Router();
const {
  deleteVehicle,
  getAllVehicles,
  getVehicle,
  newVehicle,
  updateVehicle,
} = require("../controller/vehicleController");
const verifyAuth = require("../middleware/authenticate");

route.post("/", verifyAuth, newVehicle);
route.get("/:id", verifyAuth, getAllVehicles);
route.get("/update/:id", verifyAuth, getVehicle);
route.put("/:id", verifyAuth, updateVehicle);
route.delete("/:id", verifyAuth, deleteVehicle);

module.exports = route;
