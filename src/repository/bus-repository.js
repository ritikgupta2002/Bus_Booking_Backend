const { Bus } = require("../models/index.js");
const { BusTrip } = require("./models/busTrip");
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
      if (
        data.name ||
        data.type ||
        data.totalSeats ||
        data.operator ||
        bus.stationId
      ) {
        bus.name = data.name;
        bus.type = data.type;
        bus.totalSeats = data.totalSeats;
        bus.operator = data.operator;
        bus.stationId = data.stationId;
        await bus.save();
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
  async getBusesByType(BusType) {
    try {
      const buses = await Bus.findAll({
        where: {
          type: BusType,
        },
      });
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
  // this function will be usefull when there will be many to many relationship between bustrips and bus model
  // async getAllBusesForBusTrip(busTripId) {
  //    try {
  //     const busTrip=await BusTrip.findByPk(busTripId,{
  //       include:'buses'//including the associated model
  //     });
  //     if (!busTrip) {
  //       throw new Error('BusTrip not found');
  //     }
  //     const buses= busTrip.buses;
  //     return buses;

  //    } catch (error) {

  //    }
  // }
}

module.exports = BusRepository;
