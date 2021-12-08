const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    // Tie a cart to the user who is a registered
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  userName: {
    type: String,
  },
  items: [
    {
      title: String,
      description: String,
      image: String,
      price: Number,
      category: String,
      quantity: Number,
      total: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
