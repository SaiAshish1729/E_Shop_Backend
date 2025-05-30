require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require("cors");
const Connection = require('./DB/Connection');
const cookieParser = require('cookie-parser');
const port = process.env.APP_PORT || 5000;
const userRoute = require("./Routes/userRoutes.js")
// const orderRoute = require("./Routes/orderRoutes.js")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credential: true,
}));

Connection();

app.get("/", (req, res) => {
    res.send({ success: true, message: "Hello World! Welcome to Kaanch_transaction_app." })
});

// Routes
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/order", orderRoute);

https://www.youtube.com/watch?v=CBM4x3X-Jrs&list=PLSDeUiTMfxW5ymcWAXlbnJ3KLoN34Li_C&index=4

app.listen(port, () => {
    console.log(`Server listning at port  http://localhost:${port}`)
});