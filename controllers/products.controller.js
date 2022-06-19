const ProductsModel = require("../models/product.model");
const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  return res.status(200).send({ products, total: products.length });
};

const getAllProducts = async (req, res) => {
  const { sort, fields } = req.query;
  const queryObj = {};

  checkQueryConditions(queryObj, req);
  let results = ProductsModel.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    results = results.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  // 23 products: 23 totalProducts/7 limit = 4 pages
  results = results.skip(skip).limit(limit);
  const products = await results;
  res.status(200).send({ queryObj, products, total: products.length });
}; // end getAllProducts

const checkQueryConditions = (queryObj, req) => {
  const { featured, company, name, numericFilters } = req.query;

  if (featured) queryObj.featured = featured || false;
  if (company) queryObj.company = company;
  if (name) queryObj.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regex = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      console.log({ item });
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }
}; // end checkQueryConditions

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
