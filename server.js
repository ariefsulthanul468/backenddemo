const express = require("express");
const { connectDb } = require("./config/database");

const Register = require("./models/registermodel");
const User = require("./models/usermodel");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;

const server = express();
connectDb();
server.get("/", (req, res) => {
  return res.json({
    message: "This the Home page",
  });
});

// Importing our routes
const user = require("./routes/user.route");
const register = require("./routes/registerRoute");

// Express Inbuilt middleware

server.use(express.json()); // Used in passing application/json data
server.use(express.urlencoded({ extended: false })); // Used in passing form
server.use(cookieParser()); // Used in setting the cookies parser

//server use

// Routes for API

server.use("/api", register);
server.use(notFound);
server.use(errorHandler);
// Creating the server
server.listen(PORT, () => console.log("Server is running on port " + PORT));
