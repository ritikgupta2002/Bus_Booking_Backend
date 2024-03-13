const { BusTripService } = require("../services/index.js");
const statusCodes = require("./statusCodes.js");

const busTripService = new BusTripService();

const create = async (req, res) => {
  try {
    const busTrip = await busTripService.createBusTrip(req.body);
    return res.status(statusCodes.CREATED).json({
      data: busTrip,
      success: true,
      message: "Successfully created bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create bus trip",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await busTripService.deleteBusTrip(req.params.id);
    return res.status(statusCodes.Ok).json({
      data: response,
      success: true,
      message: "Successfully deleted bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete bus trip",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await busTripService.updateBusTrip(
      req.params.id,
      req.body
    );
    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully updated bus trip",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update bus trip",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const status = req.query.status;
    const busTrips = await busTripService.getAllBusTrips(status);
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message: "Successfully fetched all bus trips with the given status",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch all bus trips with the given status",
      err: error,
    });
  }
};

const getBusTripsById = async (req, res) => {
  try {
    const busTrips = await BusTripService.getBusTripsById(req.params.id);
    return res.status(statius.OK).json({
      data: busTrips,
      success: true,
      message: "Successfully fetched bus trips with the given bus id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch bus trips with the given bus id",
      err: error,
    });
  }
};

const getBusTripsByBusId = async (req, res) => {
  try {
    const busTrips = await BusTripService.getBusTripsByBusId(req.params.id);
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message: "Successfully fetched bus trips with the given bus id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch bus trips with the given bus id",
      err: error,
    });
  }
};

const getActiveBusTripsByDepartureCityIdAndArrivalCityId = async (req, res) => {
  try {
    const busTrips =
      await BusTripService.getActiveBusTripsByDepartureCityIdAndArrivalCityId(
        req.params.departureCityId,
        req.params.arrivalCityId
      );
    return res.status(statusCodes.OK).json({
      data: busTrips,
      success: true,
      message:
        "Successfully fetched active bus trips with the given departure city id and arrival city id",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message:
        "Not able to fetch active bus trips with the given departure city id and arrival city id",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  update,
  getAll,
  getBusTripsById,
  getBusTripsByBusId,
  getActiveBusTripsByDepartureCityIdAndArrivalCityId,
};
