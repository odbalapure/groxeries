require("./db/connection");
// Setup an express server
const express = require("express");
const app = express();

// Auth middleware
const authMiddleware = require("./middleware/authentication");

// Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// Import the Router
const products = require("./routes/products");
const auth = require("./routes/auth");
const cart = require("./routes/cart");
const orders = require("./routes/order");

// Database connection
const connectDb = require("./db/connection");

// Get access to varibales in .env file
// NOTE: No need to assign it to a variable
require("dotenv").config();

// Middleware
// NOTE: If we don't do this then we won't have the data in req.body
//  It is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// Writing entire logic in app.js is not advisable
app.get('/', (req, res) => {
  res.send("<h1>Products API</h1>");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/products", products);
app.use("/api/v1/cart", authMiddleware, cart);
app.use("/api/v1/orders", authMiddleware, orders);

const port = process.env.PORT || 5000;

// Run the server ONLY IF the databse is running 
const start = async () => {
  try {
    // process.env is a GLOBAL variable
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (errror) {
    console.log("DB CONNECTION FAILED :(", errror)
  }
}

start();