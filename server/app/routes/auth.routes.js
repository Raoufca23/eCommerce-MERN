const router = require("express").Router();
const { signUp, signIn, signout } = require("../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJWT");
const {
  validateSigninRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../validators/auth");

module.exports = (app) => {
  router.post("/signin", validateSigninRequest, isRequestValidated, signIn);
  router.post("/signup", validateSignupRequest, isRequestValidated, signUp);
  router.post("/signout", /* verifyToken, */ signout);

  app.use("/api", router);
};
