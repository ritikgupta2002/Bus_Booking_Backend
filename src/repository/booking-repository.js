const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");

const { AppError, ValidationError } = require("../utils/errors/index");

class BookingRepository {
  async createBooking(data) {
    try {
      // console.log("i am here in repo")
      // console.log(data);
      const booking = await Booking.create(data);
      // console.log(booking);
      return booking;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "Cannot create Booking",
        "There was some issue creating the booking ,please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateStatus(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        throw new AppError(
          "Repsitory Error",
          "Booking not found",
          "The booking with the given id was not found",
          StatusCodes.NOT_FOUND
        );
      }
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "Repository Error",
        "Cannot update Booking",
        "There was some issue updating the booking , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBookingById(bookingId) {
    try {
      const booking = await Booking.findByPk(bookingId);
      return booking;
    } catch (error) {
      throw new AppError(
        "Repository Error",
        "Cannot fetch Booking",
        "There was some issue fetching the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllBookings() {
    try {
      const bookings = await Booking.findAll();
      return bookings;
    } catch (error) {
      throw new AppError(
        "Repository Error",
        "Cannot fetch Bookings",
        "There was some issue fetching the bookings, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateSeats(bookingId,data){
    try {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        throw new AppError(
          "Repsitory Error",
          "Booking not found",
          "The booking with the given id was not found",
          StatusCodes.NOT_FOUND
        );
      }
      if (data.noOfSeats) {
        booking.noOfSeats= data.noOfSeats;
        booking.totalCost=data.totalCost;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "Repository Error",
        "Cannot update Booking",
        "There was some issue updating the booking , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

}

module.exports = BookingRepository;
