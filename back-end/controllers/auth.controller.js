const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendError, trimString } = require("../utils/controller.utils");

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
});

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const trimmedName = trimString(name);
        const normalizedEmail = trimString(email)?.toLowerCase();
        const normalizedRole = trimString(role)?.toLowerCase();

        if (!trimmedName || !normalizedEmail || !password) {
            return res.status(400).json({
                err: true,
                message: "Name, email, and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                err: true,
                message: "Password must be at least 6 characters long"
            });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                err: true,
                message: "Email already exists"
            });
        }

        const newUser = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            password,
            role: normalizedRole || undefined
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || "opd-dev-secret",
            { expiresIn: "1d" }
        );

        res.status(201).json({
            err: false,
            message: "User registered successfully",
            token,
            user: sanitizeUser(newUser)
        });
    } catch (err) {
        sendError(res, err, "Unable to register user");
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = trimString(email)?.toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({
                err: true,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({
                err: true,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                err: true,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "opd-dev-secret",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            err: false,
            message: "Login successful",
            token,
            user: sanitizeUser(user)
        });

    } catch (err) {
        sendError(res, err, "Unable to login");
    }
};
