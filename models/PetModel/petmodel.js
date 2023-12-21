const { sequelize } = require("../../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const ParentRegister = require("../ParentModel/parentmodel");
const PostTable = require("../PostModel/postModel")

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
    ReadyToMet: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PetSchema.belongsTo(ParentRegister, { foreignKey: "petId" });
ParentRegister.hasOne(PetSchema, { foreignKey: "petId" });

// PetSchema.hasMany(PostTable, {
//   foreignKey: "pet_id",
//   sourceKey: "petId", 
// });


sequelize
  .sync()
  .then(() => {
    console.log("Pet schema created");
  })
  .catch((err) => console.log("The pet schema error is: ", err));

module.exports = PetSchema;
