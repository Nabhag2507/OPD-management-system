const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                err: true,
                message: "Authorization token is required",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "opd-dev-secret"
        );

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                err: true,
                message: "User not found",
            });
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({
            err: true,
            message: "Invalid or expired token",
        });
    }
};

module.exports = {
    requireAuth,
};
