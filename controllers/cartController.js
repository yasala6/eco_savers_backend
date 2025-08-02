import {
  getCartMdl,
  addToCartMdl,
  updateCartItemMdl,
  removeFromCartMdl,
  clearCartMdl
} from '../models/cartModel.js';

export const getCartCtrl = function (req, res) {
  const userId = req.query.user_id; // ✅ from query string

  if (!userId) {
    return res.status(400).json({ status: 400, message: "User ID required" });
  }

  getCartMdl(userId, function (err, results) {
    if (err) {
      return res.status(400).json({ status: 400, message: "Error retrieving cart" });
    }
    return res.status(200).json({ status: 200, data: results });
  });
};

export const addToCartCtrl = (req, res) => {
  const { user_id, food_id, quantity } = req.body;

  if (!user_id || !food_id || !quantity) {
    return res.status(400).json({ status: 400, message: "Missing fields" });
  }

  addToCartMdl(user_id, food_id, quantity, (err, result) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    return res.status(200).json({ status: 200, message: 'Item added to cart', data: result });
  });
};

export const updateCartItemCtrl = function (req, res) {
  const { user_id, food_id, quantity } = req.body;

  if (!user_id || !food_id || !quantity) {
    return res.status(400).json({ status: 400, message: "Missing required fields" });
  }

  updateCartItemMdl(user_id, food_id, quantity, function (err, results) {
    if (err) {
      if (err.message === "Item not in cart") {
        return res.status(404).json({ status: 404, message: "Item not found in cart" });
      }
      return res.status(400).json({ status: 400, message: "Error updating cart" });
    }
    return res.status(200).json({ status: 200, message: "Cart updated", data: results });
  });
};

export const removeFromCartCtrl = function (req, res) {
  const { user_id, food_id } = req.body;

  if (!user_id || !food_id) {
    return res.status(400).json({ status: 400, message: "Missing user_id or food_id" });
  }

  removeFromCartMdl(user_id, food_id, function (err, results) {
    if (err) {
      if (err.message === "Item not in cart") {
        return res.status(404).json({ status: 404, message: "Item not found in cart" });
      }
      return res.status(400).json({ status: 400, message: "Error removing from cart" });
    }
    return res.status(200).json({ status: 200, message: "Item removed from cart", data: results });
  });
};

export const clearCartCtrl = function (req, res) {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 400, message: "User ID required" });
  }

  clearCartMdl(user_id, function (err, results) {
    if (err) {
      return res.status(400).json({ status: 400, message: "Error clearing cart" });
    }
    return res.status(200).json({ status: 200, message: "Cart cleared", data: results });
  });
};
