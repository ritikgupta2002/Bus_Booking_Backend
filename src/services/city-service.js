const { CityRepository } = require("../repository/index.js");

class CityService {
  constructor() {
    this.cityRepository = new CityRepository();
  }
  async createCity(cityName) {
    try {
      const city = await this.cityRepository.createCity(cityName);
      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while creating city"
      );
      throw new Error("Failed to create city");
    }
  }

  async deleteCity(cityId) {
    try {
      const response = await this.cityRepository.deleteCity(cityId);
      return response;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while deleting city "
      );
      throw new Error("Failed to delete city");
    }
  }

  async updateCity(cityId, data) {
    try {
      const city = await this.cityRepository.updateCity(cityId, data);
      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while updating city "
      );
      throw new Error("Failed to update city");
    }
  }

  async getCity(cityId) {
    try {
      const city = await this.cityRepository.getCity(cityId);
      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting city "
      );
      throw new Error("Failed to get city");
    }
  }

  async getAllCities(filter) {
    try {
      const cities = await this.cityRepository.getAllCities({
        name: filter.name,
      });
      return cities;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the service layer while getting all cities "
      );
      throw new Error("Failed to get all cities");
    }
  }
}

module.exports = CityService;
