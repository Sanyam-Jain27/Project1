const User = require("../model/user");

// get users (login)
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// signup user
exports.signupUser = async (req, res) => {
    const { name, age, username, password } = req.body;

    const newUser = await User.create({
        name,
        age,
        username,
        password
    });

    res.json(newUser);
};

// check user or owner
exports.checkUserOrOwner = async (req, res) => {
    const { hid } = req.params;

    const user = await User.findById(hid);
    const Owner = require("../model/owner");
    const owner = await Owner.findById(hid);

    res.json(!!(user || owner));
};