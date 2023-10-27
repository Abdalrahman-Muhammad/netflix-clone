const router = require("express").Router();
const {
  createMovie,
  updateMovie,
  deleteMovie,
  findMovie,
  getRandomMovie,
  getAllMovies,
} = require("../controllers/movies");
const verify = require("../middlewares/verifyToken");

router.route("/").post(verify, createMovie).get(verify, getAllMovies);
router.route("/:id").put(verify, updateMovie).delete(verify, deleteMovie);
router.route("/find/:id").get(verify, findMovie);

router.route("/random").get(verify, getRandomMovie);

module.exports = router;
