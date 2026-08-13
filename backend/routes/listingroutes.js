const express = require("express");
const router = express.Router();

const controller = require("../controllers/listingcontroller");

// routes
router.get("/all-listing", controller.getAllListings);
router.get("/full-view/:id", controller.getListingById);
router.post("/list-your-venue", controller.createListing);
router.patch("/edit/:id", controller.updateListing);
router.delete("/delete/:id", controller.deleteListing);

module.exports = router;