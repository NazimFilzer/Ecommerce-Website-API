const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute=require("./routes/User");
const authRoute=require("./routes/auth");
const productRoute=require("./routes/Product");
const cartRoute=require("./routes/Cart");
const orderRoute=require("./routes/Order");

const app = express();
dotenv.config();

mongoose.connect("mongodb://localhost:27017/shop").then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});


app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);


app.listen(5000, () => {
    console.log("Server is running");
})