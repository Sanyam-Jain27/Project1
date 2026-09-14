const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/listingcontroller");

// routes
router.get("/all-listing", controller.getAllListings);
router.get("/full-view/:id", controller.getListingById);
router.post("/list-your-venue", auth, controller.createListing);
router.patch("/edit/:id", auth, controller.updateListing);
router.delete("/delete/:id", auth, controller.deleteListing);

module.exports = router;