'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class busTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // Association with Bus model (A bus trip belongs to a bus)
        this.belongsTo(models.Bus, { foreignKey: 'busId', as: 'bus' });
  
        // Association with Station model (Departure and arrival stations)
        this.belongsTo(models.BusStation, { foreignKey: 'departureStationId', as: 'departureStation' });
        this.belongsTo(models.BusStation, { foreignKey: 'arrivalStationId', as: 'arrivalStation' });
  
        // Association with City model (Departure and arrival cities)
        this.belongsTo(models.City, { foreignKey: 'departureCityId', as: 'departureCity' });
        this.belongsTo(models.City, { foreignKey: 'arrivalCityId', as: 'arrivalCity' });
    }
  }
  busTrip.init({
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
      allowNull: false,
    },
    arrivalDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalSeats: {
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
  }, {
    sequelize,
    modelName: 'busTrip',
  });
  
  return busTrip;
};