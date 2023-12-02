const { sequelize } = require("../config/database")
const { Sequelize, DataTypes } = require("sequelize");
const ParentRegister = require("../models/parentmodel");
const { date } = require("joi");

const PetSchema = sequelize.define(
    "PetSchema",
    {
        pet_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            // references: {
            //     model: "ParentRegister",
            //     key: "id"
            // },
            primaryKey: true,
        },
        name:DataTypes.STRING,
        age:DataTypes.INTEGER,
        color:DataTypes.STRING,
        image_url:DataTypes.STRING,
        parentId:{
            type:DataTypes.INTEGER,
            references:{
                model:"ParentRegisters",
                key:"id"
            },
    }
}
)

// sequelize.queryInterface.addColumn("PetSchemas", "image_url", {
//     type: DataTypes.STRING,
//     allowNull:  true,
// })



ParentRegister.hasOne(PetSchema, { foreignKey: "parentId" })


// PetSchema.belongsTo(ParentRegister, {foreignKey: userId})
sequelize.sync().then(() => { console.log("Pet schema created") }).catch((err) => console.log("The pet schmea error is: ", err))
module.exports = {PetSchema} ;

// sequelize.queryInterface.addColumn("PetSchemas","userId",{
//     type:DataTypes.INTEGER,
//     references:{
//         model:"ParentRegisters",
//         key:"id",
//     }
// })


// sequelize.queryInterface.addColumn("PetSchemas", "parentId", {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     foreignkey: true
// });

// sequelize.queryInterface.addColumn("PetSchemas", "parenId", {
//     type: DataTypes.INTEGER,
//     references: {
//         model: "ParentRegisters",
//         key: "id",
//     },
// });