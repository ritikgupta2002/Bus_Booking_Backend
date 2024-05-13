const { BookingService } = require("../services/index");

const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

class BookingController {
  async create(req, res) {
    try {
      // console.log(req.body);
      const response = await bookingService.createBooking(req.body);
      // console.log("i am here in controller")
      // console.log(response);
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
}

module.exports=BookingController;
