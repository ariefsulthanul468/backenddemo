const { sequelize } = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

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
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (register) => {
        console.log("im the new chnage", register.changed("otp"), register.otp);

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

//table created
sequelize
  .sync()
  .then(() => console.log("Register successfully"))
  .catch((error) => console.log(error));

module.exports = Register;
