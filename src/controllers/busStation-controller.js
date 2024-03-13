const { BusStationService } = require("../services/index.js");
const statusCodes = require("./statusCodes.js");

const busStationService = new BusStationService();

const create = async (req, res) => {
  try {
    const stationData = req.body;
    const station = await busStationService.createBusStation(stationData);
    return res.status(statusCodes.CREATED).json({
      data: station,
      success: true,
      message: "Successfully created bus station",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create bus station",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const stationId = req.params.id;
    const response = await busStationService.deleteBusStation(stationId);
    res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted bus station",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete bus station",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const stationId = req.params.id;
    const data = req.body;
    const station = await busStationService.updateBusStation(stationId, data);
    res.status(statusCodes.OK).json({
      data: station,
      success: true,
      message: "Successfully updated bus station",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update bus station",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const stationId = req.params.id; // Assuming station ID is sent as a URL parameter
    const station = await busStationService.getBusStation(stationId);
    res.status(statusCodes.OK).json({
      data: station,
      success: true,
      message: "Successfully retrieved bus station",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to retrieve bus station",
      err: error,
    });
  }
};

const getAllBusStation = async (req, res) => {
  try {
    const filter = req.query; // Assuming any filter parameters are sent as query parameters
    const stations = await busStationService.getAllBusStation(filter);
    res.status(statusCodes.OK).json({
      data: stations,
      success: true,
      message: "Successfully retrieved all bus stations",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to retrieve all bus stations",
      err: error,
    });
  }
};

const getBusStationByCity = async (req, res) => {
  try {
    const cityId = req.params.cityId; // Assuming city ID is sent as a URL parameter
    const stations = await busStationService.getBusStationsByCity(cityId);
    res.status(statusCodes.OK).json({
      data: stations,
      success: true,
      message: "Successfully retrieved bus stations by city",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to retrieve bus stations by city",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  update,
  get,
  getAllBusStation,
  getBusStationByCity,
};
