const { sequelize } = require("../../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const ParentRegister = sequelize.define(
    "ParentRegister",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
        },
        image_urls : {
            type: DataTypes.STRING,
            allowNull: true
        }

    },
);
// sequelize.queryInterface.addColumn("ParentRegisters", "image_urls", {
//     type: DataTypes.STRING,
//     allowNull: false
// })


sequelize
    .sync()
    .then(() => console.log("Parent Details table created successfully"))
    .catch((error) => console.log(error));

module.exports = ParentRegister;







// sequelize.queryInterface.removeColumn("ParentRegisters", "image_urls" )