const { BusStationRepository } = require("../repository/index.js");

class BusStationService {
  contructor() {
    this.busStationRepository = new BusStationRepository();
  }
  async createBusStation(stationData) {
    try {
      const station = await this.busStationRepository.createBusStation(
        stationData
      );
      return station;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while creating bus station"
      );
      throw new Error("Failed to create bus station");
    }
  }

  async deleteBusStation(stationId) {
    try {
      const result = await this.busStationRepository.deleteBusStation(
        stationId
      );
      return result;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while deleting bus station"
      );
      throw new Error("Failed to delete bus station");
    }
  }

  async updateBusStation(stationId, data) {
    try {
      const station = await this.busStationRepository.updateBusStation(
        stationId,
        data
      );
      return station;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while updating bus station"
      );
      throw new Error("Failed to update bus station");
    }
  }

  async getBusStation(stationId) {
    try {
      const station = await this.busStationRepository.getBusStation(stationId);
      return station;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting bus station"
      );
      throw new Error("Failed to get bus station");
    }
  }

  async getAllBusStation(filter) {
    try {
      const stations = await this.busStationRepository.getAllBusStation(filter);
      return stations;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting all bus stations"
      );
      throw new Error("Failed to get all bus stations");
    }
  }

  async getBusStationsByCity(cityId) {
    try {
      const stations = await this.busStationRepository.getBusStationsByCity(
        cityId
      );
      return stations;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting bus stations by city"
      );
      throw new Error("Failed to get bus stations by city");
    }
  }
}

module.exports = BusStationService;
