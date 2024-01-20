require("dotenv").config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { dialect: "postgres", logging: console.log }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected`);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};



module.exports = { sequelize, connectDb };


