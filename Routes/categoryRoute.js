const express = require("express");
const { createCategory, allCategories, fetchSingleCategory, deleteCategory, updateCategory } = require("../Controller/categoryController");
const { userAuth, adminAuth } = require("../Middleware/Authentication");
const router = express.Router();

router.post("/add-category", userAuth, adminAuth, createCategory);
router.get("/fetch-categories", userAuth, adminAuth, allCategories);
router.get("/get-single-category/:category_id", userAuth, adminAuth, fetchSingleCategory);
router.delete("/delete-category/:category_id", userAuth, adminAuth, deleteCategory);
router.put("/update-category/:category_id", userAuth, adminAuth, updateCategory);

module.exports = router 