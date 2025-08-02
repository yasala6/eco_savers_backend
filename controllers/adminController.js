import { db } from '../config/dbConfig.js';

// Get all orders
export const getAllOrdersCtrl = (req, res) => {
  const query = `
    SELECT o.order_id, o.user_id, u.first_name, o.total_amount, o.estimated_delivery, o.created_at
    FROM orders o
    JOIN user u ON o.user_id = u.user_id
    ORDER BY o.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching orders', error: err.message });
    res.status(200).json({ status: 200, data: results });
  });
};

// Get all users
export const getAllUsersCtrl = (req, res) => {
  const query = `
    SELECT user_id, user_name, first_name, last_name, email, role
    FROM user
    ORDER BY user_id ASC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching users', error: err.message });
    res.status(200).json({ status: 200, data: results });
  });
};

// Get all products
export const getAllProductsCtrl = (req, res) => {
  const query = `
    SELECT f.food_id, f.name, f.current_price, f.quantity_available, f.condition, f.image_url, r.name AS retailer_name
    FROM food_items f
    JOIN retailers r ON f.retailer_id = r.retailer_id
    ORDER BY f.food_id ASC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching products', error: err.message });
    res.status(200).json({ status: 200, data: results });
  });
};


// Delete a user
export const deleteUserCtrl = (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM user WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting user', error: err.message });
    res.status(200).json({ status: 200, message: 'User deleted successfully' });
  });
};

export const updateProductCtrl = (req, res) => {
  const id = req.params.id;
  const { name, current_price, quantity_available, condition } = req.body;

  const query = `
    UPDATE food_items
    SET name = ?, current_price = ?, quantity_available = ?, \`condition\` = ?
    WHERE food_id = ?
  `;

  db.query(query, [name, current_price, quantity_available, condition, id], (err) => {
    if (err) return res.status(500).json({ message: 'Update failed', error: err.message });
    res.status(200).json({ message: 'Product updated' });
  });
};


export const deleteProductCtrl = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM food_items WHERE food_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err.message });
    res.status(200).json({ message: 'Product deleted' });
  });
};

