const User = require("../models/User");
const Cart = require("../models/Cart");

/**
 * @desc  Method to register a user
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // Get the token from custom Schema instance method
    const token = user.createJwt();

    // Create an empty cart for a user when he/she registers
    const cartObj = {
      userId: user._id,
      userName: user.name,
      items: [],
    };
    
    cart = await Cart.create(cartObj);
    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong, try again..." });
  }
};

/**
 * @desc   Method for login
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User must provide email and password
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare passwords
    const isPassCorrect = await user.comparePassword(password);
    if (!isPassCorrect) {
      return res.status(400).json({ msg: "Incorrect password!" });
    }

    const token = user.createJwt();

    console.log("Search cart for: ", user._id);
    const cart = await Cart.find({ userId: user._id });
    console.log("Cart details: ", cart[0]._id);

    res.status(200).json({ user: user.name, token, isSeller: user.isSeller, cartId: cart[0]._id });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong, try again..." });
  }
};

module.exports = {
  register,
  login,
};
