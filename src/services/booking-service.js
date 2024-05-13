const axios = require("axios");

const { BookingRepository } = require("../repository/index");
const { BUS_SEARCH_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

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
      const bookingPayload = { ...data, totalCost };
      // console.log(bookingPayload);
      // console.log("i am here in service0");
      const booking = await this.bookingRepository.createBooking(
        bookingPayload
      );
      // console.log("i am here in service1");
      const updateBusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      await axios.patch(updateBusTripRequestURL, {
        availableSeats: busTripData.availableSeats - data.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.updateStatus(
        booking.id,
        {
          status: "Booked",
        }
      );

      return finalBooking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async updateSeats(bookingId, data) {
    try {
      const booking = await this.bookingRepository.getBookingById(bookingId);
      if (!booking) {
        throw new ServiceError(
          "Booking not found ",
          "The booking with the given id was not found",
          StatusCodes.BAD_REQUEST
        );
      }

      const busTripId = booking.busTripId;
      let getbusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      const response = await axios.get(getbusTripRequestURL);
      const busTripData = response.data.data;

      //if user trying to update the user id
      if (data.userId && booking.userId != data.userId) {
        throw new ServiceError(
          "Invalid operation ",
          "you cannot update the userId of a booking",
          StatusCodes.BAD_REQUEST
        );
      }

      // if user want to update the no of seats
      // console.log(typeof data.noOfSeats, typeof booking.noOfSeats);
        //  data.noOfSeats=Number(data.noOfSeats);
         console.log(typeof data.noOfSeats);
      if (data.noOfSeats && booking.noOfSeats !== data.noOfSeats) {
        if (data.noOfSeats < booking.noOfSeats) {
          const updateBusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
          await axios.patch(updateBusTripRequestURL, {
            availableSeats: busTripData.availableSeats+(booking.noOfSeats-data.noOfSeats)
          });
        }
        if (data.noOfSeats > booking.noOfSeats) {
          if (data.noOfSeats > busTripData.availableSeats) {
            throw new ServiceError(
              "Something went wrong in the booking process",
              "Insufficient seats "
            );
          } else {
            const updateBusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
            await axios.patch(updateBusTripRequestURL, {
              availableSeats:
                busTripData.availableSeats-(data.noOfSeats - booking.noOfSeats),
            });
          }
        }
        const noOfSeats = data.noOfSeats;
        const totalCost = noOfSeats * busTripData.ticketPrice;
        const updatedBooking = await this.bookingRepository.updateSeats(
          bookingId,
          {
            noOfSeats,
            totalCost,
          }
        );
        return updatedBooking;
      }
    } catch (error) {
      throw new ServiceError(
        "Something went wrong in the booking process",
        "There was some issue updating the booking , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async cancelBooking(bookingId) {
    try {
      const booking = await this.bookingRepository.getBookingById(bookingId);
      if (!booking) {
        throw new ServiceError(
          "Booking not found",
          `The booking with id ${bookingId} was not found`,
          StatusCodes.BAD_REQUEST
        );
      }
      //updated the bus trips availabled seats

      const busTripId = booking.busTripId;
      const getbusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      const response = await axios.get(getbusTripRequestURL);
      const busTripData = response.data.data;
      const updateBusTripRequestURL = `${BUS_SEARCH_SERVICE_PATH}/api/v1/bustrip/${busTripId}`;
      await axios.patch(updateBusTripRequestURL, {
        availableSeats: busTripData.availableSeats + booking.noOfSeats,
      });

      //cancel the booking

      const canceledBooking = await this.bookingRepository.updateStatus(
        bookingId,
        {
          status: "Canceled",
        }
      );
      return canceledBooking;
    } catch (error) {
      if (error.name === "RepositoryError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getBookingById(bookingId) {
    try {
      const booking = await this.bookingRepository.getBookingById(bookingId);
      if (!booking) {
        throw new ServiceError(
          "Booking not found",
          `The booking with id ${bookingId} was not found`,
          StatusCodes.BAD_REQUEST
        );
      }
      return booking;
    } catch (error) {
      if (error.name === "RepositoryError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getAllBookings() {
    try {
      const bookings = await this.bookingRepository.getAllBookings();
      return bookings;
    } catch (error) {
      if (error.name === "RepositoryError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
