const { sequelize } = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const ParentRegister = sequelize.define(
    "ParentRegister",
    {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mailID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
);
sequelize
    .sync()
    .then(() => console.log("Parent Details table created successfully"))
    .catch((error) => console.log(error));

module.exports = ParentRegister;
