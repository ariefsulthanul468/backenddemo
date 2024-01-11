
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { ParentRegister } = require("./parentmodel");
// const { PostTable } = require("./postModel");


const PetSchema = sequelize.define(
  "PetSchema",
  {
    petId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue:[]
    },
    parentId: {
      type: DataTypes.UUID,
      references: {
        model: ParentRegister,
        key: "id",
      },
    },
    about: DataTypes.STRING,
    Breed: DataTypes.STRING,
    size: DataTypes.INTEGER,
    species: DataTypes.STRING,
    Tries: DataTypes.STRING,
    InterestHobbies: DataTypes.STRING,
    ReadyToMet: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


// // ParentRegister.hasMany(PetSchema, { foreignKey: "parentId" });

// // PetSchema.belongsTo(ParentRegister, { foreignKey: "parentId" });

ParentRegister.hasMany(PetSchema, { foreignKey: "parentId" });
PetSchema.belongsTo(ParentRegister, { foreignKey: "parentId" });

// ParentRegister.hasMany(PostTable, { foreignKey: "parentId" });
// PostTable.belongsTo(ParentRegister, { foreignKey: "parentId" });

// sequelize.queryInterface.addColumn("PetSchema","Demo",{
//   type:DataTypes.STRING
// })


sequelize
  .sync()
  .then(() => console.log("PetSchema Created"))
  .catch((error) => console.log(error));



module.exports = { PetSchema }
