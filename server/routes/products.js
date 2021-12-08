const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authentication");

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controller/products");

// Do not require id so we can chain them
router.route("/").get(getAllProducts);
// User must be authenticated (seller) to create/update a product
router.post("/", authMiddleWare, createProduct);
router.patch("/:id", authMiddleWare, updateProduct);
router.route("/:id").get(getProduct).delete(deleteProduct);

module.exports = router;
