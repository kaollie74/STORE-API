const express = require('express');
const productsRouter = express.Router()

const {getAllProducts, getAllProductsStatic} = require('../controllers/products.controller')

productsRouter.route('/').get(getAllProducts)
productsRouter.route('/static').get(getAllProductsStatic)

module.exports = productsRouter;