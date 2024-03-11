"use strict";
const { Model } = require("sequelize");
const bus = require("./bus");
module.exports = (sequelize, DataTypes) => {
  class BusTrip extends Model {
    static associate(models) {
      // Association with Bus model (A bus trip belongs to a bus)
      this.belongsTo(models.Bus, { foreignKey: "busId", as: "buses" });

      // Association with Station model (Departure and arrival stations)
      this.belongsTo(models.BusStation, {
        foreignKey: "departureStationId",
        as: "departureStation",
      });
      this.belongsTo(models.BusStation, {
        foreignKey: "arrivalStationId",
        as: "arrivalStation",
      });

      // Association with City model (Departure and arrival cities)
      this.belongsTo(models.City, {
        foreignKey: "departureCityId",
        as: "departureCity",
      });
      this.belongsTo(models.City, {
        foreignKey: "arrivalCityId",
        as: "arrivalCity",
      });
    }
  }
  BusTrip.init(
    {
      busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureStationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivalStationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivalCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureDateTime: {
        type: DataTypes.DATE,
      },
      arrivalDateTime: {
        type: DataTypes.DATE,
      },
      availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BusTrip",
    }
  );

  BusTrip.beforeSave(async (busTripInstance) => {
    const departureStation = await busTripInstance.getDepartureStation();
    const arrivalStation = await busTripInstance.getArrivalStation();
    if (departureStation && arrivalStation) {
      const departureCity = await departureStation.getCity();
      const arrivalCity = await arrivalStation.getCity();
      busTripInstance.departureCityId = departureCity.id;
      busTripInstance.arrivalCityId = arrivalCity.id;
    }
  });
  
  return BusTrip;
};
