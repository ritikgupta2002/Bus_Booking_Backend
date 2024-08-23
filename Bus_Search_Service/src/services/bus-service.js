const { BusRepository } = require("../repository/index.js");

class BusService {
  constructor() {
    this.busRepository = new BusRepository();
  }

  async createBus(busData) {
    try {
      // console.log(busData);
      const bus = await this.busRepository.createBus(busData);
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while creating bus"
      );
      throw new Error("Failed to create bus");
    }
  }

  async deleteBus(busId) {
    try {
      const result = await this.busRepository.deleteBus(busId);
      return result;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while deleting bus "
      );
      throw new Error("Failed to delete bus");
    }
  }

  async updateBus(busId, data) {
    try {
      const bus = await this.busRepository.updateBus(busId, data);
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while updating bus "
      );
      throw new Error("Failed to update bus");
    }
  }

  async getBus(busId) {
    try {
      const bus = await this.busRepository.getBus(busId);
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting bus "
      );
      throw new Error("Failed to get bus");
    }
  }

  async getBusesByBusStation(busStationId) {
    try {
      console.log(busStationId);
      const buses = await this.busRepository.getBusesByBusStation(busStationId);
      return buses;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting buses by busStationId "
      );
      throw new Error("Failed to get buses by busStationId");
    }
  }

  async getBusesByType(BusType) {
    try {
      console.log(BusType);
      const buses = await this.busRepository.getBusesByType(BusType);
      return buses;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting buses by bus type "
      );
      throw new Error("Failed to get buses by bus type");
    }
  }

  async getAllBuses(filter) {
    try {
      const buses = await this.busRepository.getAllBuses(filter);
      return buses;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting all buses"
      );
      throw new Error("Failed to get all buses");
    }
  }
}

module.exports = BusService;
