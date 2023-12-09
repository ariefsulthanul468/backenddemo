const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

//import the models in the server.js to create table
const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "author", "contributor"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        if (user.changed("password")) {
          user.password = bcrypt.hashSync(user.password, 12);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (enterPassword) {
  return bcrypt.compareSync(enterPassword, this.password);
};

User.prototype.jwtToken = async function () {
  const user = this;
  return jwt.sign({ id: user._id }, "random string", {
    expiresIn: "1m",
  });
};

User.prototype.refreshToken = async function () {
  const user = this;
  return jwt.sign({ id: user._id }, "SECERET@refreshToken", {
    expiresIn: "2h",
  });
};

//table created
sequelize
  .sync()
  .then(() => console.log("Table created"))
  .catch((error) => console.log(error));

module.exports = User;
