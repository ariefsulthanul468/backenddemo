const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const ParentRegister = require("../ParentModel/parentmodel");
const PetSchema = require("../PetModel/petmodel");

const PostTable = sequelize.define(
  "PostTable",
  {
    pet_id: {
      type: DataTypes.UUID,
      references: {
        model: PetSchema,
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


ParentRegister.hasMany(PostTable, { foreignKey: "ParentId" });
PostTable.belongsTo(ParentRegister, { foreignKey: "ParentId" });

PostTable.belongsTo(PetSchema, { foreignKey: "pet_id" });


sequelize
  .sync()
  .then(() => {
    console.log("Post schema created");
  })
  .catch((err) => console.log("The Post schema error is:", err));

module.exports = PostTable;

