"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.BusTrip, { foreignKey: 'busId', as: 'busTrips' });
    }
  }
  Bus.init(
    {
      busName: { type: DataTypes.STRING, allowNull: false },
      busType: DataTypes.STRING,
      totalSeats: { type: DataTypes.INTEGER, allowNull: false },
      operator: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Bus",
    }
  );
  return Bus;
};
