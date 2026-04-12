const Owner = require("../model/owner");

exports.getOwners = async (req, res) => {
    const owners = await Owner.find();
    res.json(owners);
};

exports.signupOwner = async (req, res) => {
    const { name, age, username, password, contactno, email } = req.body;

    const newOwner = await Owner.create({
        name,
        age,
        username,
        password,
        contactno,
        email
    });

    res.json(newOwner);
};