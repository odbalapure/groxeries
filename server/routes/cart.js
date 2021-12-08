const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addCartItem,
  removeCartItem,
} = require("../controller/cart");

router.route("/").get(getAllItems);
router.route("/:id").patch(addCartItem);
router.route("/:id").delete(removeCartItem);

module.exports = router;
