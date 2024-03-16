const { BusStation } = require("../models/index.js");
const {City} = require("../models/index.js");
const { Op } = require("sequelize");

class BusStationRepository {
  // Create a new bus station
  async createBusStation(stationData) {
    console.log(stationData);
    try {
      const busStation = await BusStation.create({
        name: stationData.name,
        address: stationData.address,
        cityId: stationData.cityId,
      });
      return busStation;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while creating bus station"
      );
      throw new Error("Failed to create bus station");
    }
  }

  // Delete a bus station by ID
  async deleteBusStation(stationId) {
    try {
      const result = await BusStation.destroy({
        where: {
          id: stationId,
        },
      });
      if (result == 0) {
        console.log("Bus station not found for deletion");
        return false;
      }
      return true;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while deleting bus station "
      );
      throw new Error("Failed to delete bus station");
    }
  }

  // Update a bus station's name by ID
  async updateBusStation(stationId, data) {
    try {
      const busStation = await BusStation.findByPk(stationId);
      // console.log(busStation);
      if (!busStation) {
        throw new Error("Bus station not found");
      }
      if (data.name || data.address || data.cityId) {
        busStation.name = data.name;
        busStation.address = data.address;
        busStation.cityId = data.cityId;
        await busStation.save();
      }
      return busStation;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while updating bus station "
      );
      throw new Error("Failed to update bus station");
    }
  }

  // Get a bus station by ID
  async getBusStation(stationId) {
    try {
      const busStation = await BusStation.findByPk(stationId);
      if (!busStation) {
        throw new Error("Bus station not found");
      }
      return busStation;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting bus station "
      );
      throw new Error("Failed to get bus station");
    }
  }

  async getAllBusStations(filter) {
    try {
      // Check if there is a name filter
      console.log(filter);
      if (filter && filter.name) {
        const busStations = await BusStation.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return busStations;
      }
      // If no filter, get all busStations
      const busStations = await BusStation.findAll();
      return busStations;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting all bus stations "
      );
      throw new Error("Failed to get all bus stations");
    }
  }

  // Get busStations by city Id
  async getBusStationsByCity(cityId) {
    try {
      // console.log(cityId);
      const busStations = await BusStation.findAll({
        where: {
          cityId: cityId,
        },
      });
      for (const busStation of busStations) {
        const city = await City.findByPk(cityId);
        busStation.dataValues.city = city; // Attach city data to bus station
      }
      // console.log(busStations);
      const stationCount = busStations.length;
      return { busStations, stationCount };
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting bus stations by cityId "
      );
      throw new Error("Failed to get bus stations by cityId");
    }
  }
}

module.exports = BusStationRepository;
