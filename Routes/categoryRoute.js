const express = require("express");
const { createCategory } = require("../Controller/categoryController");
const { userAuth, adminAuth } = require("../Middleware/Authentication");
const router = express.Router();

router.post("/add-category", userAuth, adminAuth, createCategory);


module.exports = router 