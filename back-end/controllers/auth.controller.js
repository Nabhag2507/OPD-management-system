const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                err: true,
                message: "Email already exists"
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            err: false,
            message: "User registered successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                err: true,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                err: true,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            err: false,
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};