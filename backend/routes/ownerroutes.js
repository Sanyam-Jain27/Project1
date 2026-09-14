const express = require("express");
const router = express.Router();

const controller = require("../controllers/ownercontroller");

router.get("/login/owner", controller.getOwners);
router.post("/login/owner", controller.loginOwner);
router.post("/signup/owner", controller.signupOwner);

module.exports = router;