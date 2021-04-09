const router = require("express").Router();
const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const {
  addProduct,
  getProducts,
  getProductbySlug,
} = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJWT");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads/product"));
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
/* const {
  validateCreateProductRequest,
  isRequestValidated,
} = require("../validators/product"); */
/* validateCreateCategoryRequest,
    isRequestValidated, */
module.exports = (app) => {
  router.post(
    "/product/create",
    verifyToken,
    isAdmin,
    upload.array("productPicture"),
    addProduct
  );
  router.get("/products", getProducts);
  router.get("/product/:slug", getProductbySlug);

  app.use("/api", router);
};
