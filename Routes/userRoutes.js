const express = require("express");
const { createUser, userLogin, getAllUsers, logoutCurrentUser, loggedInUserProfile, updateUserProfile, deleteUserById } = require("../Controller/userController");
const { userAuth, adminAuth } = require("../Middleware/Authentication");
const router = express.Router();

router.post("/add-user", createUser);
router.post("/sign-in", userLogin);
router.post("/logout", logoutCurrentUser);
router.get("/profile", userAuth, loggedInUserProfile);
router.get("/user-list", getAllUsers);
router.put("/update-profile", userAuth, updateUserProfile);
router.delete("/delete-user", userAuth, adminAuth, deleteUserById);

module.exports = router 