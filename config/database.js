require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { dialect: "postgres",
   logging: console.log
 }
);


const connectDb = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Database connected to discover`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sequelize, connectDb };
