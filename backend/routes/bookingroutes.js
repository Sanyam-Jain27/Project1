const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookingcontroller");

router.post("/", controller.createBooking);
router.get("/:id", controller.getBookings);
router.get("/dates/:id", controller.getBookedDates);
router.delete("/:bookingId", controller.deleteBooking);

module.exports = router;