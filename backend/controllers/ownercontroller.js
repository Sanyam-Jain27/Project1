const Owner = require("../model/owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get owners (legacy/compat)
exports.getOwners = async (req, res) => {
    try {
        const owners = await Owner.find().select("-password");
        res.json(owners);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// signup owner
exports.signupOwner = async (req, res) => {
    try {
        const { name, age, username, password, contactno, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingOwner = await Owner.findOne({ username });
        if (existingOwner) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newOwner = await Owner.create({
            name,
            age,
            username,
            password: hashedPassword,
            contactno,
            email
        });

        const token = jwt.sign(
            { id: newOwner._id, role: "owner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            token,
            user: {
                _id: newOwner._id,
                name: newOwner.name,
                username: newOwner.username,
                role: "owner",
                contactno: newOwner.contactno,
                email: newOwner.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// login owner
exports.loginOwner = async (req, res) => {
    try {
        const { username, password, contactno } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const query = { username };
        if (contactno) {
            query.contactno = contactno;
        }

        const owner = await Owner.findOne(query);
        if (!owner) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, owner.password);
        } catch {
            isMatch = false;
        }

        // Backward compatibility fallback for pre-existing plaintext records
        if (!isMatch && owner.password === password) {
            isMatch = true;
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: owner._id, role: "owner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                _id: owner._id,
                name: owner.name,
                username: owner.username,
                role: "owner",
                contactno: owner.contactno,
                email: owner.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
