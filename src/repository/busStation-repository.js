const { BusStation } = require("../models/index.js");
const { Op } = require("sequelize");

class BusStationRepository {
  // Create a new bus station
  async createBusStation(stationData) {
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
      if (data.name) {
        busStation.name = data.name;
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

  async getAllBusStation(filter) {
    try {
      // Check if there is a name filter
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
      const busStations = await busStations.findAll();
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
      const busStations = await BusStation.findAll({
        where: {
          cityId: cityId,
        },
      });
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
