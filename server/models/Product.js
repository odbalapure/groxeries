const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Product title must be provided"],
  },
  type: {
    type: String,
    require: [true, "Product type must be provided"],
  },
  description: {
    type: String,
    require: [true, "Product description must be provided"],
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/no-thumbnail-image-vector-graphic-vector-id1147544806",
  },
  height: {
    type: Number,
    require: [true, "Product height must be provided"],
  },
  width: {
    type: Number,
    require: [true, "Product width must be provided"],
  },
  price: {
    type: Number,
    require: [true, "Product price must be provided"],
  },
  rating: {
    type: Number,
    require: [true, "Product rating must be provided"],
  },
});

module.exports = mongoose.model("Product", productScheme);
