const express=require("express");
const router = express.Router();

const CityController=require("../../controllers/city-controller.js");
const BusController=require("../../controllers/bus-controller.js");
const BusStationController=require("../../controllers/busstation-controller.js");
const BusTripController=require("../../controllers/bustrip-controller.js");

router.post("/city", CityController.create);
router.delete("/city/:id", CityController.destroy);
router.get("/city/:id", CityController.get);
router.get("/city", CityController.getAll);
router.patch("/city/:id", CityController.update);

router.post("/bus", BusController.create);
router.delete("/bus/:id", BusController.destroy);
router.get("/bus/:id", BusController.get);
router.get("/bus/busstation/:stationId", BusController.getBusesByBusStation);
router.patch("/bus/:id", BusController.update);
router.get("/bus", BusController.getAll);

router.post("/busstation", BusStationController.create);
router.delete("/busstation/:id", BusStationController.destroy);
router.get("/busstation/:id", BusStationController.get);
router.get("/busstation/", BusStationController.getAllBusStations);
router.get("/busstation/city/:cityId", BusStationController.getBusStationsByCity);

router.post("/bustrip", BusTripController.create);
router.delete("/bustrip/:id", BusTripController.destroy);
router.patch("/bustrip/:id", BusTripController.update);
router.get("/bustrip/:id", BusTripController.getBusTripsById);
router.get("/bustrip", BusTripController.getAll);
router.get("/bustrip/bus/:busId", BusTripController.getBusTripsByBusId);
router.get("/bustrip/Active/:departureCityId/:arrivalCityId", BusTripController.getActiveBusTripsByDepartureCityIdAndArrivalCityId);


module.exports=router;






