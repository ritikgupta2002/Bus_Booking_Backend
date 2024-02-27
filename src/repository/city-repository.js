const { City } = require("../models/index.js");
const { Op } = require("sequelize");

class CityRepository {
  // Create a new city
  async createCity(cityName) {
    try {
      const city = await City.create({
        name: cityName.name,
      });
      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while creating city"
      );
      throw new Error("Failed to create city");
    }
  }

  // Delete a city by ID
  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: {
          id: cityId,
        },
      });
      return true;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while deleting city "
      );
      throw new Error("Failed to delete city");
    }
  }

  // Update a city's name by ID
  async updateCity(cityId, data) {
    try {
      const city = await City.findByPk(cityId);

      if (!city) {
        throw new Error("City not found");
      }

      // Update the city's name if provided in the data
      if (data.name) {
        city.name = data.name;
        await city.save();
      }

      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while updating city "
      );
      throw new Error("Failed to update city");
    }
  }

  // Get a city by ID
  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);

      if (!city) {
        throw new Error("City not found");
      }

      return city;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting city "
      );
      throw new Error("Failed to get city");
    }
  }

  // Get all cities with optional name filter
  async getAllCities(filter) {
    try {
      // Check if there is a name filter
      if (filter && filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }

      // If no filter, get all cities
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      // Log an error message
      console.log(
        "something went wrong in the repository layer while getting all cities "
      );
      throw new Error("Failed to get cities");
    }
  }
}

module.exports = CityRepository;
