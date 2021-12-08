const express = require("express");
const router = express.Router();

const { placeOrder, getAllOrders } = require("../controller/order");

router.route("/").post(placeOrder);
router.route("/").get(getAllOrders);

module.exports = router;
