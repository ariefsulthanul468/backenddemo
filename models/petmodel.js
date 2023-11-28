const { sequelize } = require("../config/database")
const { Sequelize, DataTypes } = require("sequelize");
const ParentRegister = require("../models/parentmodel")

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
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }
)
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

ParentRegister.hasOne(PetSchema,{foreignKey:"parenId"})


// PetSchema.belongsTo(ParentRegister, {foreignKey: userId})
sequelize.sync().then(() => { console.log("Pet schema created") }).catch((err) => console.log("The pet schmea error is: ", err))
module.exports = PetSchema;


// sequelize.queryInterface.addColumn("PetSchemas","userId",{
//     type:DataTypes.INTEGER,
//     references:{
//         model:"ParentRegisters",
//         key:"id",
//     }
// })
