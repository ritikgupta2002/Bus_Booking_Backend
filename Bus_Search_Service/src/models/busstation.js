"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BusStation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        /*
         This specifies that the cityId field in the BusStatation 
        model is the foreign key that establishes the relationship with the City model.
         */
        as: "city",
        onDelete: "CASCADE",
      });
      this.hasMany(models.BusTrip, {
        foreignKey: "departureStationId",
        as: "departureTrips",
      });
      this.hasMany(models.BusTrip, {
        foreignKey: "arrivalStationId",
        as: "arrivalTrips",
      });
      this.hasMany(models.Bus, {
        foreignKey: "stationId",
        as: "buses",
      });
    }
  }
  BusStation.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: DataTypes.STRING,
      cityId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "BusStation",
    }
  );
  return BusStation;
};
