const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://postgres:12345678@localhost:5432/userAuth`,
  { dialect: "postgres" }
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
