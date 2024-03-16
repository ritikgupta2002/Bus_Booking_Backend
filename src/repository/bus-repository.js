const { Bus } = require("../models/index.js");
const { BusTrip } = require("../models/index.js");
const { Op } = require("sequelize");

class BusRepository {
  // Create a new bus
  async createBus(busData) {
    try {
      console.log(busData);
      const bus = await Bus.create({
        name: busData.name,
        type: busData.type,
        totalSeats: busData.totalSeats,
        operator: busData.operator,
        stationId: busData.stationId,
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
      if (data.type) {
        bus.type = data.type;
      }
      if (data.totalSeats) {
        bus.totalSeats = data.totalSeats;
      }
      if (data.operator) {
        bus.operator = data.operator;
      }
      if (data.stationId) {
        bus.stationId = data.stationId;
      }

      await bus.save();

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
      console.log(busStationId);
      const buses = await Bus.findAll({
        where: {
          StationId: busStationId,
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
  async getBusesByType(BusType) {
    try {
      console.log(BusType);
      const buses = await Bus.findAll({
        where: {
          type: BusType,
        },
      });
      console.log(buses);
      if (!buses || buses.length === 0) {
        throw new Error("No buses found for the specified bus type");
      }
      return buses;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting buses by bus type "
      );
      throw new Error("Failed to get buses by bus type");
    }
  }

  async getAllBuses(filter) {
    try {
      // Check if there are any filters provided
      if (Object.keys(filter).length !== 0) {
        // Build the query based on the provided filters
        const whereClause = {};
        if (filter.name) {
          whereClause.name = { [Op.startsWith]: filter.name };
        }
        if (filter.type) {
          whereClause.type = filter.type;
        }
        if (filter.operator) {
          whereClause.operator = { [Op.startsWith]: filter.operator };
        }
        if (filter.stationId) {
          whereClause.stationId = filter.stationId;
        }
        const buses = await Bus.findAll({ where: whereClause });

        if (buses.length === 0) {
          throw new Error("No buses found matching the provided filters");
        }

        return buses;
      } else {
        // If no filters provided, return all buses
        const buses = await Bus.findAll();
        return buses;
      }
    } catch (error) {
      throw new Error("Failed to get buses: " + error.message);
    }
  }
}

module.exports = BusRepository;
