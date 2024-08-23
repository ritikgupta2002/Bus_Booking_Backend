const express = require("express");

const {BookingController}=require("../../controllers/index");

const bookingController= new BookingController();
const router = express.Router();
 
router.post("/bookings",bookingController.create);
router.patch("/bookings/:bookingId",bookingController.updateSeats);
router.get("/bookings/:bookingId",bookingController.getBookingById);
router.get("/bookings",bookingController.getAllBookings);
router.delete("/bookings/:bookingId",bookingController.cancelBooking);


router.post("/publish",bookingController.sendMessageToQueue);
module.exports = router;