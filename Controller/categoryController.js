const Category = require("../Models/categoryModel");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }

        const newCategory = Category({ name })
        await newCategory.save();
        return res.status(201).send({ success: true, message: "Category created successfully.", data: newCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while creating category.", error });
    }
}

module.exports = {
    createCategory,
}