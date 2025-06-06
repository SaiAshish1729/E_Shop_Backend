const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        description: {
            type: String,
            required: true
        },
        // reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
    },
    { timestamps: true }
);

const Products = mongoose.model("products", productSchema);
module.exports = {
    Products,
}