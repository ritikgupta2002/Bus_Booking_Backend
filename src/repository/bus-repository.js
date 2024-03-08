const { Bus } = require("../models/index.js");
const { Op } = require("sequelize");

class BusRepository {
  // Create a new bus
  async createBus(busData) {
    try {
      const bus = await Bus.create({
        name: busData.name,
        type: busData.type,
        totalSeats: busData.totalSeats,
        operator: busData.operator,
      });
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while creating bus"
      );
      throw new Error("Failed to create bus");
    }
  }

  async deleteBus(busId) {
    try {
      const result = await Bus.destroy({
        where: {
          id: busId,
        },
      });
      if (result == 0) {
        console.log("Bus not found for deletion");
        return false;
      }
      return true;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while deleting bus "
      );
      throw new Error("Failed to delete bus");
    }
  }

  // Update a bus's name by ID

  async updateBus(busId, data) {
    try {
      const bus = await Bus.findByPk(busId);
      if (!bus) {
        throw new Error("Bus not found");
      }
      if (data.name) {
        bus.name = data.name;
      }
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while updating bus "
      );
      throw new Error("Failed to update bus");
    }
  }

  async getBus(busId) {
    try {
      const bus = await Bus.findByPk(busId);
      if (!bus) {
        throw new Error("Bus not found");
      }
      return bus;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting bus "
      );
      throw new Error("Failed to get bus");
    }
  }
  async getBusesByBusStation(busStationId) {
    try {
      const buses = await Bus.findAll({
        where: {
          busStationId: busStationId,
        },
      });
      if (!buses || buses.length === 0) {
        throw new Error("No buses found for the specified busStationId");
    }
      return buses;
    } catch (error) {
       // Log an error message
      console.log(
        "something went wrong in the repository layer while getting buses by busStationId "
      );
      throw new Error("Failed to get buses by busStationId");
    }
  }
}

module.exports = BusRepository;
