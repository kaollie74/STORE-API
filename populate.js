require("dotenv").config();

const connectDB = require("./db/connect");
const ProductModel = require("./models/product.model");
const jsonProducts = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await ProductModel.deleteMany();
        await ProductModel.create(jsonProducts);

        console.log("success!");
        process.exit(0);
    } catch (e) {
        console.log("ERROR >>>>", e);
        process.exit(1);
    }
};

start();
