const router = require("express").Router();
const { addItemToCart } = require("../controllers/cart.controller");
const { verifyToken, isUser } = require("../middlewares/authJWT");

module.exports = (app) => {
  router.post("/add", verifyToken, isUser, addItemToCart);

  app.use("/api/cart", router);
};
