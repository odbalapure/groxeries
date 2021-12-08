const Order = require("../models/Order");
const Cart = require("../models/Cart");

/**
 * @desc Place an order
 */
const placeOrder = async (req, res) => {
  console.log("Place order");
  try {
    const product = await Order.create(req.body);
    const cartId = req.url.split("=")[1];
    console.log("Empty this cart: ", cartId);

    const cartObj = { items: [] };
    await Cart.findByIdAndUpdate({ _id: cartId }, cartObj, {
      new: true,
      runValidators: true,
    });

    res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Order couldn't be placed, try again!" });
  }
};


/**
 * @desc Do checkout
 */
 const getAllOrders = async (req, res) => {
  try {
    const products = await Order.find();
    res.status(200).json({ products, nbHit: products.length });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Order couldn't be placed, try again!" });
  }
};

module.exports = { placeOrder, getAllOrders };
