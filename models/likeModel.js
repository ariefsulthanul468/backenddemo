
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { PetSchema } = require("./petmodel");
const { PostTable } = require("./postModel")


const LikeTable = sequelize.define(
  "LikeTable",
  {
    PetId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ParentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    LikedUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

 LikeTable.belongsTo(PostTable, { foreignKey: "PetId" });

sequelize
  .sync()
  .then(() => {
    console.log("Like Table created");
  })
  .catch((err) => console.log("The Like schema error is:", err));

module.exports = { LikeTable };



