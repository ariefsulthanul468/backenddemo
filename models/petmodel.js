const { sequelize } = require("../config/database")
const { Sequelize, DataTypes } = require("sequelize");




const PetSchema = sequelize.define(
    "PetSchema",
    {
        pet_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

sequelize.sync().then(() => { console.log("Pet schema created") }).catch((err) => console.log("The pet schmea error is: ", err))
module.exports=PetSchema;