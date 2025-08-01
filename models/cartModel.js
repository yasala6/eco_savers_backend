import { db } from "../config/dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

export const getCartMdl = function (userId, callback) {
    const QRY_TO_EXEC = `
        SELECT c.*, f.name, f.image_url, f.current_price, f.original_price 
        FROM cart c
        JOIN food_items f ON c.food_id = f.food_id
        WHERE c.user_id = "${userId}"
    `;

    if (callback && typeof callback == "function") {
        execQuery(db, QRY_TO_EXEC, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return execQuery(db, QRY_TO_EXEC);
    }
};

export const addToCartMdl = function (userId, food_id, quantity, callback) {
    // First check if food item exists
    const checkFoodQuery = `SELECT COUNT(*) AS count FROM food_items WHERE food_id = "${food_id}"`;

    execQuery(db, checkFoodQuery, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        if (results[0].count === 0) {
            callback(new Error("Food item not found"), null);
            return;
        }

        // Check if item already in cart
        const checkCartQuery = `SELECT * FROM cart WHERE user_id = "${userId}" AND food_id = "${food_id}"`;

        execQuery(db, checkCartQuery, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }

            if (results.length > 0) {
                // Update existing item
                const newQuantity = results[0].quantity + quantity;
                const updateQuery = `
                    UPDATE cart 
                    SET quantity = ${newQuantity} 
                    WHERE user_id = "${userId}" AND food_id = "${food_id}"
                `;

                execQuery(db, updateQuery, function (err, results) {
                    callback(err, results);
                });
            } else {
                // Add new item
                const insertQuery = `
                    INSERT INTO cart (user_id, food_id, quantity)
                    VALUES ("${userId}", "${food_id}", ${quantity})
                `;

                execQuery(db, insertQuery, function (err, results) {
                    callback(err, results);
                });
            }
        });
    });
};

export const updateCartItemMdl = function (userId, food_id, quantity, callback) {
    // First check if item exists in cart
    const checkQuery = `SELECT COUNT(*) AS count FROM cart WHERE user_id = "${userId}" AND food_id = "${food_id}"`;

    execQuery(db, checkQuery, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        if (results[0].count === 0) {
            callback(new Error("Item not in cart"), null);
            return;
        }

        const updateQuery = `
            UPDATE cart 
            SET quantity = ${quantity} 
            WHERE user_id = "${userId}" AND food_id = "${food_id}"
        `;

        execQuery(db, updateQuery, function (err, results) {
            callback(err, results);
        });
    });
};

export const removeFromCartMdl = function (userId, food_id, callback) {
    // First check if item exists in cart
    const checkQuery = `SELECT COUNT(*) AS count FROM cart WHERE user_id = "${userId}" AND food_id = "${food_id}"`;

    execQuery(db, checkQuery, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        if (results[0].count === 0) {
            callback(new Error("Item not in cart"), null);
            return;
        }

        const deleteQuery = `
            DELETE FROM cart 
            WHERE user_id = "${userId}" AND food_id = "${food_id}"
        `;

        execQuery(db, deleteQuery, function (err, results) {
            callback(err, results);
        });
    });
};

export const clearCartMdl = function (userId, callback) {
    const deleteQuery = `DELETE FROM cart WHERE user_id = "${userId}"`;

    execQuery(db, deleteQuery, function (err, results) {
        callback(err, results);
    });
};