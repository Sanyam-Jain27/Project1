const express = require("express");
const router = express.Router();

const controller = require("../controllers/usercontroller");

router.get("/login/user", controller.getUsers);
router.post("/login/user", controller.loginUser);
router.post("/signup/user", controller.signupUser);
router.get("/check/:hid", controller.checkUserOrOwner);

module.exports = router;