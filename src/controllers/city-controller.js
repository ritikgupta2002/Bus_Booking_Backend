const { CityService } = require("../services/index.js");
const statusCodes=require("./statusCodes.js");

const cityService = new CityService();

const create = async (req, res) => {
  try {
    const city = await cityService.createCity(req.body);
    return res.status(statusCodes.CREATED).json({
      data: city,
      success: true,
      message: "Successfully created city",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create city",
      err: error,
    });
  }
};

//in rest delete ->city/:id
const destroy = async (req, res) => {
  try {
    const response = await cityService.deleteCity(req.params.id);
    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted city",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete city",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await cityService.getCity(req.params.id);
    return res.status(statusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully fetched a city",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch a city",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const respnose = await cityService.updateCity(req.params.id, req.body);
    return res.status(statusCodes.OK).json({
      data: respnose,
      success: true,
      message: "Successfully updated city",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update city",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const filter = {
        name: req.query.name,
        // Add more allowed parameters as needed
      };
    const cities = await cityService.getAllCities(filter);
    return res.status(statusCodes.OK).json({
      data: cities,
      success: true,
      message: "Successfully fetched all cities",
      err: {},
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch all cities",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  get,
  update,
  getAll,
};
