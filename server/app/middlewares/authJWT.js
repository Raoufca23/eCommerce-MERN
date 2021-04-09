const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      message: "Authorization is required",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
    if (error) return res.status(400).json({ message: error.message });
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
    return;
  }
  return res.status(403).send({
    message: "Permission denied",
  });
};

const isUser = (req, res, next) => {
  if (req.user.role === "user") {
    next();
    return;
  }
  return res.status(403).send({
    message: "Permission denied",
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser,
};
