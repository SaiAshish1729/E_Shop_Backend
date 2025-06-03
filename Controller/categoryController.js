const Category = require("../Models/categoryModel");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ message: "Already exists" });
        }

        const newCategory = Category({ name })
        await newCategory.save();
        return res.status(201).send({ success: true, message: "Category created successfully.", data: newCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while creating category.", error });
    }
}

const allCategories = async (req, res) => {
    try {
        const allData = await Category.find({});
        return res.status(200).send({ success: true, message: "All categories fetched successfully.", data: allData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while fetching all categories list.", error })
    }
}

const fetchSingleCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        if (!category_id) {
            return res.status(400).json({ message: "Category_id is required." })
        }
        const catExists = await Category.findOne({ _id: category_id });
        if (!catExists) {
            return res.status(404).send({ message: "Category not found" })
        }
        return res.status(200).send({ success: true, message: "Single Category fetched successfully.", data: catExists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while fetching a single category.", error })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const catExists = await Category.findOne({ _id: category_id });
        if (!catExists) {
            return res.status(404).send({ message: "Category not found" })
        }
        const removeData = await Category.deleteOne({ _id: category_id });
        return res.status(200).send({ success: true, message: "Category deleted successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while deleting a single category.", error })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { name } = req.body;
        const catExists = await Category.findOne({ _id: category_id });
        if (!catExists) {
            return res.status(404).send({ message: "Category not found" })
        }
        const updateData = await Category.updateOne({ _id: category_id }, { name: name }, { new: true });
        return res.status(200).send({ success: true, message: "Category updated succesfully.", data: updateData })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while updating a single category.", error })
    }
}
module.exports = {
    createCategory,
    allCategories,
    fetchSingleCategory,
    deleteCategory,
    updateCategory,
}