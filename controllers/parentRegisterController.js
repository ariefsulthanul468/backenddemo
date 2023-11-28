const ParentRegister = require("../models/parentmodel");


exports.insertParentDetails = async (req, res) => {
    const {username, mailID, gender } =  req.body;
    console.log(username, mailID, gender);
}