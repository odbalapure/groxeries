/* Dump the JSON data from products.js to the Database */

// Create another database connection
require("dotenv").config();
const connectDb = require("./db/connection");
const Product = require("./models/Product");

const jsonProducts = require("./data/products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // Delete existing documents
    await Product.deleteMany();
    
    // Insert the JSON data
    await Product.create(jsonProducts);
    console.log("Populating the database was successfull!");
    
    // Everything went well, exiting...
    process.exit(0);
  } catch (error) {
    console.log("DB CONNECTION FAILED :(", error);
    process.exit(1);
  }
};

start();