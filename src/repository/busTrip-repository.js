const { BusTrip } = require("../models/index.js");
const { Bus } = require("../models/index.js");
const { Op } = require("sequelize");

class BusTripRepository {
  async createBusTrip(busTripData) {
    try {
      const busTrip = await BusTrip.create({
        busId: busTripData.busId,
        departureStationId: busTripData.departureStationId,
        arrivalStationId: busTripData.arrivalStationId,
        departureCityId: busTripData.departureCityId,
        arrivalCityId: busTripData.arrivalCityId,
        departureTime: busTripData.departureTime,
        arrivalTime: busTripData.arrivalTime,
        ticketPrice: busTripData.ticketPrice,
        tripStatus: busTripData.tripStatus,
      });
      return busTrip;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while creating bus trip"
      );
      throw new Error("Failed to create bus trip");
    }
  }

  async deleteBusTrip(busTripId) {
    try {
      const result = await BusTrip.destroy({
        where: {
          id: busTripId,
        },
      });
      if (result == 0) {
        console.log("Bus trip not found for deletion");
        return false;
      }
      return true;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while deleting bus trip "
      );
      throw new Error("Failed to delete bus trip");
    }
  }

  async updateBusTrip(busTripId, data) {
    try {
      const busTrip = await BusTrip.findByPk(busTripId);
      // console.log(busTrip);
      if (!busTrip) {
        throw new Error("Bus trip not found");
      }

      if (
        data.departureStationId ||
        data.arrivalStationId ||
        data.ticketPrice ||
        data.tripStatus
      ) {
        busTrip.departureStationId = data.departureStationId;
        busTrip.arrivalStationId = data.arrivalStationId;
        busTrip.ticketPrice = data.ticketPrice;
        busTrip.tripStatus = data.tripStatus;
        await busTrip.save();
      }
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while updating bus trip "
      );
      throw new Error("Failed to update bus trip");
    }
  }
  async getAllBusTrips(status) {
    try {
      const whereClause = status ? { status } : {};
      const busTrips = await BusTrip.findAll({
        where: whereClause,
      });
      if (busTrips.length == 0) {
        console.log("No bus trips found");
        return false;
      }
      return busTrips;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting all bus trips with given status"
      );
      throw new Error("Failed to get bus trips with given status");
    }
  }

  async getBusTripById(busTripId) {
    try {
      const busTrip = await BusTrip.findByPk(busTripId);
      if (!busTrip) {
        console.log("Bus trip not found for the given id");
        return false;
      }
      return busTrip;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting bus trip by id "
      );
      throw new Error("Failed to get bus trip by id");
    }
  }
  async getBusTripsByBusId(busId) {
    try {
      const busTrips = await BusTrip.findAll({
        where: {
          busId: busId,
        },
      });
      if (busTrips.length == 0) {
        console.log("No bus trips found for the given bus id");
        return false;
      }
      return busTrips;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting bus trips by bus id "
      );
      throw new Error("Failed to get bus trips by bus id");
    }
  }

  async getActiveBusTripsByDepartureCityIdAndArrivalCityId(departureCityId, arrivalCityId) {
    try {
      const bustrips = await BusTrip.findAll({
        where: {
          status:"Active",
          departureCityId:departureCityId,
          arrivalCityId:arrivalCityId,
        },
        include: [{
            model: Bus,
            attributes: ['id', 'name', 'type', 'totalSeats', 'operator'],
          }],
      });
      if (bustrips.length == 0) {
        console.log("No bus trips found for the given departure and arrival city id");
        return false;
      }
      return bustrips;
    } catch ({ error }) {
        // Log an error message
        console.log(
          "something went wrong in the repository layer while getting bus trips by departure and arrival city id "
        );
        throw new Error("Failed to get bus trips by departure and arrival city id");
    }
  }
}

module.exports = BusTripRepository;
