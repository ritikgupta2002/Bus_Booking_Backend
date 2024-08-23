const { BusTripRepository } = require("../repository/index.js");

class BusTripService {
  constructor() {
    this.busTripRepository = new BusTripRepository();
  }
  async createBusTrip(busTripData) {
    try {
      // console.log(busTripData);
      const busTrip = await this.busTripRepository.createBusTrip(busTripData);
      
      return busTrip;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while creating bus trip"
      );
      throw new Error("Failed to create bus trip");
    }
  }

  async deleteBusTrip(busTripId) {
    try {
      const result = await this.busTripRepository.deleteBusTrip(busTripId);
      return result;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while deleting bus trip"
      );
      throw new Error("Failed to delete bus trip");
    }
  }

  async updateBusTrip(busTripId, data) {
    try {
      const busTrip = await this.busTripRepository.updateBusTrip(
        busTripId,
        data
      );
      return busTrip;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while updating bus trip"
      );
      throw new Error("Failed to update bus trip");
    }
  }

  async getAllBusTrips(status) {
    try {
      const busTrips = await this.busTripRepository.getAllBusTrips(status);
      return busTrips;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting all bus trips with given status"
      );
      throw new Error("Failed to get bus trips with given status");
    }
  }

  async getBusTripsById(busTripId) {
    try {
      const busTrip = await this.busTripRepository.getBusTripById(busTripId);
      return busTrip;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting bus trip by id"
      );
      throw new Error("Failed to get bus trip by id");
    }
  }

  async getBusTripsByBusId(busId) {
    try {
      console.log(busId);
      const busTrips = await this.busTripRepository.getBusTripsByBusId(busId);
      return busTrips;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting bus trips by bus id"
      );
      throw new Error("Failed to get bus trips by bus id");
    }
  }

  async getActiveBusTripsByDepartureCityIdAndArrivalCityId(
    departureCityId,
    arrivalCityId
  ) {
    try {
      const busTrips =
        await this.busTripRepository.getActiveBusTripsByDepartureCityIdAndArrivalCityId(
          departureCityId,
          arrivalCityId
        );
      return busTrips;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting active bus trips by departure and arrival city id"
      );
      throw new Error(
        "Failed to get active bus trips by departure and arrival city id"
      );
    }
  }
}

module.exports = BusTripService;
