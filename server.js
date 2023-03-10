const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
require('express-async-errors');

app.use(cors());

app.use(
  express.json({ extended: true, parameterLimit: 100000, limit: "500mb" })
);

// Routers
const signupRouter = require("./src/routes/Signup");
const adminRouter = require("./src/routes/Admin/auth");
const adminallRouter = require("./src/routes/Admin/index");
const userallRouter = require("./src/routes/User/index");
const instiallRouter = require("./src/routes/Institute/index");

// notFound middleware
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");

// Database connection and checking
mongoose.connect(
  "mongodb+srv://Obepedia:t01QEbxMuUfpJWZz@obepedia.avpnoc8.mongodb.net/test"
);
// mongoose.connect('mongodb://127.0.0.1:27017/obepedia');

mongoose.connection.on("connected", (connected) => {
  console.log("database is connected");
});

// Now we are going to use env for using variables
dotenv.config();
const PORT = process.env.PORT || 4500;

app.use(bodyparser.json());

app.get("/", (req, resp) => {
  resp.json("Welcome to our server");
});

// Users Router
app.use("/signup", signupRouter);

// Admin Routes
app.use("/admin", adminRouter);
app.use("/admin/", adminallRouter);

// User Routes
app.use("/user/", userallRouter);

// Institute Routes
app.use("/institute/", instiallRouter);

app.use(errorHandler);
// notFound
app.use(notFound);

app.listen(PORT, () => {
  console.log(`your server is on http://localhost:${PORT}`);
});
