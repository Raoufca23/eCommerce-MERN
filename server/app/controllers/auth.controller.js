const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { capitalizeFirstLetter } = require("../helpers");

exports.signUp = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (user) {
      const role = capitalizeFirstLetter(user.role);
      return res.status(400).json({
        message: `${role} already registred`,
      });
    }
    const { firstName, lastName, email, password, role } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      role,
      userName: firstName + Math.floor(Math.random() * 10).toString(),
    });
    _user.save((err, data) => {
      if (err || data === undefined) {
        return res.status(400).json({
          message: err.message,
        });
      }
      if (data) {
        // const { role } = req.body;
        return res.status(201).json({
          message: `${
            role ? capitalizeFirstLetter(role) : "User"
          } created successfully`,
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d", httpOnly: true });
        return res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signout successfully" });
};
