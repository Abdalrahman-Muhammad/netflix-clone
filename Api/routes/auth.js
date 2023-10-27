const router = require("express").Router();
const { register, login } = require("../controllers/auth");

//Register
router.route("/register").post(register);

//login
router.route("/login").post(login);

module.exports = router;
