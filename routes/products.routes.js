const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    getAllProductsStatic,
} = require("../controllers/products.controller");

// Routes -> controller(s)
productsRouter.route("/").get(getAllProducts);
productsRouter.route("/static").get(getAllProductsStatic);

module.exports = productsRouter;
