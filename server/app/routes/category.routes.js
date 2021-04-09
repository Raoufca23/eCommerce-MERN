const router = require("express").Router();
const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const {
  addCategory,
  getCategories,
} = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJWT");
const {
  validateCreateCategoryRequest,
  isRequestValidated,
} = require("../validators/category");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads/category"));
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  router.post(
    "/category/create",
    verifyToken,
    isAdmin,
    /* validateCreateCategoryRequest,
    isRequestValidated, */
    upload.single("categoryImage"),
    addCategory
  );
  router.get("/categories", getCategories);

  app.use("/api", router);
};
