const {ParentRegister}  = require("../models/parentmodel");
const {PetSchema} = require("../models/petmodel")
const asyncHandler = require("express-async-handler");

const getData = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const tasks = await ParentRegister.findAll({
        include: [
            {
                model: PetSchema,
                where: { parenId: id },
            },
        ],
    });
    if (tasks && tasks.length > 0) {
        res.status(200).json(tasks)
    }
    else {
        res.status(500).json({ message: "No data for given ID" })
    }
});

module.exports = { getData };