const dotenv = require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/database");
const Register = require("./models/registermodel");
const { sequelize } = require("./config/database");
const { ParentRegister } = require("./models/parentmodel");
const { PetSchema } = require("./models/petmodel");
const { PostTable } = require("./models/postModel");
const { LikeTable } = require("./models/likeModel")
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;


const server = express(); 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use("/uploads", express.static("uploads"));

const user = require("./routes/user.route");
const register = require("./routes/registerRoute");
const like = require("./routes/like.route")


// Auth routes
server.use("/api/auth", register);
server.use("/api/user", user);
server.use("/api/like", like);

server.get("/check", (req, res) => {
    console.log("checking api");
    res.send("check");
});

// Error handlers
server.use(notFound);
server.use(errorHandler);



connectDb();

server.listen(PORT, () => console.log("Server is running on port " + PORT));


