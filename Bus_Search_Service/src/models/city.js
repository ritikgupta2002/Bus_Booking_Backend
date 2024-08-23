"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.BusStation, {
        foreignKey: "cityId",
        /*
        This specifies that the cityId field in the BusStatation 
        model is the foreign key that establishes the relationship with the City model.
        */
        as: "busStations",
      });
      this.hasMany(models.BusTrip, {
        foreignKey: "departureCityId",
        as: "departureTrips",
      });
      this.hasMany(models.BusTrip, {
        foreignKey: "arrivalCityId",
        as: "arrivalTrips",
      });
    }
  }
  City.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
