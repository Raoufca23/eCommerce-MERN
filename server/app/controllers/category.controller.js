const Category = require("../models/category.model");
const slugify = require("slugify");

const listCategories = (categories, parentID = null) => {
  const categoryList = [];
  let category;

  if (parentID === null) {
    category = categories.filter((item) => item.parentID == undefined);
  } else {
    category = categories.filter((item) => item.parentID == parentID);
  }

  category.forEach(({ _id, name, slug }) => {
    categoryList.push({
      _id,
      name,
      slug,
      parentID,
      childrenCategories: listCategories(categories, _id),
    });
  });

  return categoryList;
};

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoryImage = `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`;
  }
  if (req.body.parentID) {
    categoryObj.parentID = req.body.parentID;
  }
  const _category = new Category(categoryObj);
  _category.save((error, category) => {
    if (error) return res.status(400).json({ message: error.message });
    if (category)
      return (
        res
          .status(201)
          // .json({ message: `${category.name} category added successfully` });
          .json({ category })
      );
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    const categoriList = listCategories(categories);
    return res.status(200).json({ categories: categoriList });
  });
};
