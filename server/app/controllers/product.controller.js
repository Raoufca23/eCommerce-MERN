const Product = require("../models/product.model");
const Category = require("../models/category.model");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const { name, price, description, quantity, offer, category } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const _product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    quantity,
    offer,
    category,
    productPictures,
    createdBy: req.user._id,
  });
  _product.save((error, product) => {
    if (error) res.status(400).json({ error });
    if (product) res.status(200).json({ product });
  });
};

exports.getProducts = (req, res) => {
  Product.find({})
    .select("_id name price quantity description category productPictures")
    .populate({ path: "category", select: "_id name" })
    .exec((error, products) => {
      if (error) return res.status(400).json({ error });
      return res.status(200).json({ products });
    });
};

exports.getProductbySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug })
    .select("_id")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        Product.find({ category }).exec((error, products) => {
          if (error) return res.status(400).json({ error });
          return res.status(200).json({ products });
        });
      }
      /* return res
              .status(500)
              .json({ message: "Please check an administrator" }); */
    });
};
