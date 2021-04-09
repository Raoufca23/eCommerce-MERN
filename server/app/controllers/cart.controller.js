const Cart = require("../models/cart.model");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      const { product, quantity } = req.body.cartItems;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, action;
      if (item) {
        condition = { user: req.user._id, "cartItems.product": product };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + quantity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, action, { new: true }).exec(
        (error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) return res.status(200).json({ cart });
        }
      );
    } else {
      const _cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      _cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) return res.status(200).json({ cart });
      });
    }
  });
};
