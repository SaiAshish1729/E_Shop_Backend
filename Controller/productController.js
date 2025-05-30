const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error while create product.", error });
    }
}