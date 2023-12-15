const { sequelize } = require("../../config/database")
const { Sequelize, DataTypes } = require("sequelize");
const ParentRegister = require("../ParentModel/parentmodel")
const { date } = require("joi");

const PetSchema = sequelize.define(
  "PetSchema",
  {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      unique:true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    color: DataTypes.STRING,
    image_url: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ParentRegister",
        key: "UserId",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ParentRegister.hasOne(PetSchema, { foreignKey: "parentId" })

sequelize
  .sync()
  .then(() => {
    console.log("Pet schema created");
  })
  .catch((err) => console.log("The pet schmea error is: ", err));

module.exports = {PetSchema} ;

