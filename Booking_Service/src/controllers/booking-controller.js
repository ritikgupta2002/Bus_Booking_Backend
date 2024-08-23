const { BookingService } = require("../services/index");

const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

const {createChannel,publishMessage}=require("../utils/messageQueue");

const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class BookingController {

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a noti from queue",
        content: "Some queue will subscribe this",
        recepientEmail: "gupta.ritik2002@gmail.com",
        notificationTime: "2024-05-31T09:49:00",
      },
      service:'CREATE_TICKET'
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully published the event ",
    });
  }

  async create(req, res) {
    try {
     
      const response = await bookingService.createBooking(req.body);
      //busTripId , noOfSeats , status , userId ->body
      return res.status(StatusCodes.OK).json({
        message: "Successfully created booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      console.log("from booking controller", error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async updateSeats(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const response = await bookingService.updateSeats(bookingId, req.body);
      // noOfSeats -> body
      return res.status(StatusCodes.OK).json({
        message: "Successfully updated booking seats",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      console.log("from booking controller ",error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {}
      });
    }
  }
   
  async cancelBooking(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const response = await bookingService.cancelBooking(bookingId);
      return res.status(StatusCodes.OK).json({
        message: "Successfully canceled booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      console.log("from booking controller", error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async getBookingById(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const response = await bookingService.getBookingById(bookingId);
      return res.status(StatusCodes.OK).json({
        message: "Successfully fetched booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      console.log("from booking controller", error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async getAllBookings(req, res) {
    try {
      const response = await bookingService.getAllBookings();
      return res.status(StatusCodes.OK).json({
        message: "Successfully fetched all bookings",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      console.log("from booking controller", error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }



}

module.exports = BookingController;
