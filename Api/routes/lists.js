const router = require("express").Router();
const { createList, deleteList, getAllLists } = require("../controllers/list");
const verify = require("../middlewares/verifyToken");

router.route("/").post(verify, createList).get(verify, getAllLists);
router.route("/:id").delete(verify, deleteList);

module.exports = router;
