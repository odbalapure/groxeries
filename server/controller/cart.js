const Cart = require("../models/Cart");

/**
 * @desc      Get all items from cart
 * @param {*} req
 * @param {*} res
 */
const getAllItems = async (req, res) => {
  const cart = await Cart.find({ userId: req.user.userId });
  res.status(200).json({ items: cart[0].items });
};

/**
 * @desc      Add an item the cart
 * @param {*} req
 * @param {*} res
 */
const addCartItem = async (req, res) => {
  console.log("Cart ID: ", req.params.id);

  Cart.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { items: req.body } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        console.log("Cart updated!");
      }
    }
  );

  res.status(200).json({ msg: `Item added to cart!` });
};

/**
 * @desc      Remove an item from cart
 * @param {*} req
 * @param {*} res
 */
const removeCartItem = async (req, res) => {
  console.log("Remove this item: ", req.params.id, " from ", req.body.cartId);
  
  Cart.findOneAndUpdate(
    { _id: req.body.cartId },
    { $pull: { items: { _id: req.params.id } } },
    { upsert: false },
    function (err) {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        console.log("Cart updated!");
      }
    }
  );

  res.status(204).json({msg: `Item ${req.params.id} removed!`});
};

module.exports = { getAllItems, addCartItem, removeCartItem };
