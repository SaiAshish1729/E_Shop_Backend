const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

const userAuth = async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
}

const adminAuth = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(401).send("Not authorized as an admin.");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userAuth,
    adminAuth,
}