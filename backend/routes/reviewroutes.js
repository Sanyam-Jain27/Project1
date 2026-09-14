const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/reviewcontroller");

router.get("/review/:id", controller.getReviews);
router.post("/review/:id", auth, controller.createReview);

module.exports = router;