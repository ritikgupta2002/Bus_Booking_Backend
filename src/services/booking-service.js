const axios = require("axios");

const { BookingRepository } = require("../repository/index");
const { BUS_SEARCH_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      // console.log(data);
      // console.log("i am here too in service ");
      const busTripId = data.busTripId;
      let getbusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      // console.log(getbusTripRequestURL);
      const response = await axios.get(getbusTripRequestURL);
      const busTripData = response.data.data;
      let priceOfTheBusTrip = busTripData.ticketPrice;
      if (data.noOfSeats > busTripData.availableSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient seats "
        );
      }
      const totalCost = priceOfTheBusTrip * data.noOfSeats;
      const bookingPayload = { ...data, totalCost  };
      // console.log(bookingPayload);
      // console.log("i am here in service0");
      const booking = await this.bookingRepository.createBooking(bookingPayload);
      // console.log("i am here in service1");
      const updateBusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      await axios.patch(updateBusTripRequestURL, {
        availableSeats: busTripData.availableSeats - data.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      // console.log("i am here in service2");

      return finalBooking;

    } catch (error) {
      if(error.name=="RepositoryError"||error.name=="ValidationError"){
        throw error;
      }
      throw new ServiceError(); 
    }
  }
}

module.exports = BookingService;
