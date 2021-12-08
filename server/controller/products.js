const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    let search = req.query.search;
    if (search) {
      search = req.query.search;
    } else {
      search = "";
    }

    const products = await Product.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(404).json({ msg: "No products found..." });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ msg: `No product with id ${id}` });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ msg: `Product with id, does not exist!` });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Product couldn't be created, try again later...` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Product ID: ", id);

    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json(`No Product with id ${id}`);
    }

    res.status(200).json({ product });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Product couldn't be updated, try again later...` });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndRemove({
      _id: id,
    });

    if (!product) {
      return res.status(404).json({ msg: `No product with id ${id}` });
    }

    res.status(204).json({ msg: `Product with ${id} was deleted!` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Product couldn't be deleted, try again later...` });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
