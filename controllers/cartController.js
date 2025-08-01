import express from "express";
import Jwt from 'jsonwebtoken';
const { jwt } = Jwt;

import { 
  getCartMdl, 
  addToCartMdl, 
  updateCartItemMdl, 
  removeFromCartMdl,
  clearCartMdl 
} from '../models/cartModel.js';

export const getCartCtrl = function (req, res) {
    const userId = req.user.id; // Assuming user ID is in the JWT token
    
    getCartMdl(userId, function (err, results) {
        try {
            if (err) {
                res.status(400).json({ status: 400, message: "Error retrieving cart" });
                return;
            }
            res.status(200).json({ status: 200, data: results });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

export const addToCartCtrl = function (req, res) {
    const userId = req.user.id;
    const { food_id, quantity } = req.body;

    if (!food_id || !quantity) {
        return res.status(400).json({ status: 400, message: "Missing required fields" });
    }

    addToCartMdl(userId, food_id, quantity, function (err, results) {
        try {
            if (err) {
                if (err.message === "Food item not found") {
                    return res.status(404).json({ status: 404, message: "Food item not found" });
                }
                res.status(400).json({ status: 400, message: "Error adding to cart" });
                return;
            }
            res.status(200).json({ status: 200, message: "Item added to cart", data: results });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

export const updateCartItemCtrl = function (req, res) {
    const userId = req.user.id;
    const { food_id, quantity } = req.body;

    if (!food_id || !quantity) {
        return res.status(400).json({ status: 400, message: "Missing required fields" });
    }

    updateCartItemMdl(userId, food_id, quantity, function (err, results) {
        try {
            if (err) {
                if (err.message === "Item not in cart") {
                    return res.status(404).json({ status: 404, message: "Item not found in cart" });
                }
                res.status(400).json({ status: 400, message: "Error updating cart" });
                return;
            }
            res.status(200).json({ status: 200, message: "Cart updated", data: results });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

export const removeFromCartCtrl = function (req, res) {
    const userId = req.user.id;
    const { food_id } = req.body;

    if (!food_id) {
        return res.status(400).json({ status: 400, message: "Missing food_id" });
    }

    removeFromCartMdl(userId, food_id, function (err, results) {
        try {
            if (err) {
                if (err.message === "Item not in cart") {
                    return res.status(404).json({ status: 404, message: "Item not found in cart" });
                }
                res.status(400).json({ status: 400, message: "Error removing from cart" });
                return;
            }
            res.status(200).json({ status: 200, message: "Item removed from cart", data: results });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

export const clearCartCtrl = function (req, res) {
    const userId = req.user.id;

    clearCartMdl(userId, function (err, results) {
        try {
            if (err) {
                res.status(400).json({ status: 400, message: "Error clearing cart" });
                return;
            }
            res.status(200).json({ status: 200, message: "Cart cleared", data: results });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};