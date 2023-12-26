const dotenv = require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/database");
const Register = require("./models/registermodel");
const Parent = require("./models/ParentModel/parentmodel")
const PetSchema = require("./models/PetModel/petmodel")
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;



const server = express(); // Declare server here
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());


const user = require("./routes/user.route");
const register = require("./routes/registerRoute");


// Auth routes
server.use("/api/auth", register);
server.use("/api/user", user);
server.get("/check", (req, res) => {
    console.log("checking api");
    res.send("check");
});

// Error handlers
server.use(notFound);
server.use(errorHandler);

// Connect to the database and start the server
connectDb();


server.listen(PORT, () => console.log("Server is running on port " + PORT));
