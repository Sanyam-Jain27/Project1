const express = require("express");
const router = express.Router();

const controller = require("../controllers/reviewcontroller");

router.get("/review/:id", controller.getReviews);
router.post("/review/:id", controller.createReview);

module.exports = router;