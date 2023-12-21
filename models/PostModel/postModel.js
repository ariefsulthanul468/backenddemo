const { Sequelize, DataTypes } = require("sequelize");
const ParentRegister = require("../ParentModel/parentmodel");
const PetSchema = require("../PetModel/petmodel");
const { sequelize } = require("../../config/database");

const PostTable = sequelize.define(
  "PostTable",
  {
    pet_id: {
      type: DataTypes.UUID,
      references: {
        model: PetSchema, // Fix the reference to PetSchema (use the actual model)
        key: "petId",
      },
    },
    ParentId: DataTypes.UUID,
    PetName: DataTypes.STRING,
    PetAge: DataTypes.INTEGER,
    PetGender: DataTypes.STRING,
    PetImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    about: DataTypes.STRING,
    Breed: DataTypes.STRING,
    size: DataTypes.INTEGER,
    species: DataTypes.STRING,
    Tries: DataTypes.STRING,
    InterestHobbies: DataTypes.STRING,
    ReadyToMet: DataTypes.STRING,
    UserName: DataTypes.STRING,
    UserPicture: DataTypes.STRING,
    UserLocation: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PostTable.belongsTo(PetSchema, { foreignKey: "pet_id", targetKey: "petId" });

ParentRegister.hasMany(PostTable, { foreignKey: "ParentId" });
PostTable.belongsTo(ParentRegister, { foreignKey: "ParentId" });

module.exports = PostTable;
