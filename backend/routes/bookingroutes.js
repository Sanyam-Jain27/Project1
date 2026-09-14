const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/bookingcontroller");

router.post("/", auth, controller.createBooking);
router.get("/:id", controller.getBookings);
router.get("/dates/:id", controller.getBookedDates);
router.delete("/:bookingId", auth, controller.deleteBooking);

module.exports = router;