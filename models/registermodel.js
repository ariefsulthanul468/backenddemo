const { sequelize } = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//import the models in the server.js to create table

const Register = sequelize.define(
  "Register",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRegister: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (register) => {
        console.log("im the new change", register.changed("otp"), register.otp);

        if (register.changed("otp")) {
          return (register.otp = bcrypt.hashSync(register.otp.toString(), 12));
        }
      },
      beforeUpdate: (register) => {
        console.log("im the new chnage", register.changed("otp"), register.otp);

        if (register.changed("otp")) {
          return (register.otp = bcrypt.hashSync(register.otp.toString(), 12));
        }
      },
    },
  }
);

Register.prototype.comparePassword = async function (enterPassword) {
  return bcrypt.compareSync(enterPassword, this.otp);
};
Register.prototype.jwtToken = async function () {
  const user = this;
  return jwt.sign({ id: user._id }, "random string", {
    expiresIn: "1h",
  });
};

Register.prototype.refreshToken = async function () {
  const user = this;
  return jwt.sign({ id: user._id }, "SECERET@refreshToken", {
    expiresIn: "2h",
  });
};


//table created
sequelize
  .sync()
  .then(() => console.log("Register successfully"))
  .catch((error) => console.log(error));

module.exports = Register;
