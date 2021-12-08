const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  landMark: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  orderDetails: [
    {
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
