// const { sequelize } = require("../../config/database");
// const { Sequelize, DataTypes } = require("sequelize");

// const ParentRegister2 = sequelize.define(
//   "ParentRegister2",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     mailID: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     image_urls: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     latitude: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//     },
//     longitude: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//     },
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );


// sequelize
//   .sync()
//   .then(() => console.log("Parent2 Details table created successfully"))
//   .catch((error) => console.log(error));

// module.exports = ParentRegister2;
