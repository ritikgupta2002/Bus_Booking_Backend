const { BusService } = require("../services/index.js");
const statusCodes = require("./statusCodes.js");

const busService = new BusService();

const create = async (req, res) => {
  try {
    // console.log(req.body);
    const bus = await busService.createBus(req.body);
    return res.status(statusCodes.CREATED).json({
      data: bus,
      success: true,
      message: "Successfully created bus",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create bus",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await busService.deleteBus(req.params.id);

    if (response === false) {
      return res.status(statusCodes.NOT_FOUND).json({
        data: {},
        success: false,
        message: "Bus not found for deletion",
        err: {},
      });
    }

    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted bus",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete bus",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await busService.updateBus(req.params.id, req.body);
    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully updated bus",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update bus",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const bus = await busService.getBus(req.params.id);
    return res.status(statusCodes.OK).json({
      data: bus,
      success: true,
      message: "Successfully fetched bus by id ",
      err: {},
    });
  } catch (error) {
    // Log an error message
    console.log(
      "something went wrong in the service layer while fetching bus "
    );
    throw new Error("Failed to fetch bus");
  }
};

const getBusesByBusStation = async (req, res) => {
  try {
    console.log(req.params.stationId);
    const buses = await busService.getBusesByBusStation(req.params.stationId);
    return res.status(statusCodes.OK).json({
      data: buses,
      success: true,
      message: "Successfully fetched buses by busStation",
      err: {},
    });
  } catch (error) {
    // Log an error message
    console.log(
      "something went wrong in the service layer while fetching buses "
    );
    throw new Error("Failed to fetch buses");
  }
};

const getBusesByType = async (req, res) => {
  try {
    console.log(req.query.type);
    const buses = await busService.getBusesByType(req.query.type);
    return res.status(statusCodes.OK).json({
      data: buses,
      success: true,
      message: "Successfully fetched buses by bus type",
      err: {},
    });
  } catch (error) {
    console.log(
      "something went wrong in the service layer while fetching buses by bus type "
    );
    throw new Error("Failed to fetch buses by bus type");
  }
};

const getAll = async (req, res) => {
  try {
    const filter = {
      name: req.query.name,
      type: req.query.type,
      operator: req.query.operator,
      stationId: req.query.stationId,
      // Add more allowed parameters as needed
    };
    const buses = await busService.getAllBuses(filter);
    return res.status(statusCodes.OK).json({
      data: buses,
      success: true,
      message: "Successfully fetched all buses with given filter",
      err: {},
    });
  } catch (error) {
    console.log(
      "something went wrong in the service layer while fetching all buses with given filter"
    );
    throw new Error("Failed to fetch all buses with given filter");
  }
};

module.exports = {
  create,
  destroy,
  update,
  get,
  getBusesByBusStation,
  getBusesByType,
  getAll,
};
