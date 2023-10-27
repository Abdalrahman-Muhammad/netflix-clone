const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  findUser,
  getAllusers,
  getUsersStats,
} = require("../controllers/users");
const verify = require("../middlewares/verifyToken");

router.route("/:id").put(verify, updateUser).delete(verify, deleteUser);
router.route("/find/:id").get(findUser);
router.route("/").get(verify, getAllusers);
router.route("/stats").get(getUsersStats);

module.exports = router;
