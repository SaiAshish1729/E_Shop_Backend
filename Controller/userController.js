const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");
const { generateToken } = require("../utills/token");

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Please fill all the inputs.");
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).send({ message: "User already exists" });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email, password: hashedPassword
        });
        await newUser.save();
        const token = await generateToken(res, newUser._id);
        return res.status(201).send({ success: true, message: "User created successfully.", token, data: newUser, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while while adding new uesr", error });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid password" });
        }

        const token = await generateToken(res, existingUser._id);

        return res.status(200).send({ success: true, message: "User sign in successfully.", token: token })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while login.", error });
    }
}

const logoutCurrentUser = async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).send({ success: true, message: "User list fetched successfully", data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while fetching users.", error });
    }
}


const loggedInUserProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).send({ success: true, message: "User profile fetched successfully.", data: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while fetching logged in user's profile.", error });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const { username, email, password } = req.body;
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(401).send({
                    success: false,
                    message: "This email is already in use."
                });
            }
        }
        const newInfo = {}
        if (username) newInfo.username = username;
        if (email) newInfo.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            newInfo.password = hashedPassword
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, newInfo, { new: true }).select("-password");
        return res.status(200).json({
            success: true,
            message: "User details updated successfully.",
            data: updatedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Server error while updating user's profile.",
            error: error.message
        });
    }
};


const deleteUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(404).json({ message: "user_id is required." })
        }
        const userFound = await User.findOne({ _id: user_id });
        if (!userFound) {
            return res.status(404).json({ message: "User not found." })
        }
        const removed = await User.deleteOne({ _id: user_id });
        return res.status(200).json({ success: true, message: "Uesr deleted successfully.", data: removed })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error while deleting user.", error })
    }
}

const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(404).json({ message: "user_id is required." })
        }
        const userFound = await User.findOne({ _id: user_id });
        if (!userFound) {
            return res.status(404).json({ message: "User not found." })
        }
        return res.status(200).json({ success: true, message: "Uesr details fetched successfully.", data: userFound })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error while fetching user.", error })
    }
}
module.exports = {
    createUser,
    userLogin,
    logoutCurrentUser,
    getAllUsers,
    loggedInUserProfile,
    updateUserProfile,
    deleteUserById,
    getUserById,
}