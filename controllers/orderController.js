import { db } from '../config/dbConfig.js';

// Create Order Controller
export const createOrderCtrl = (req, res) => {
  const { user_id, payment_method, delivery_address, items } = req.body;

  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Missing user_id or items.' });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);

  const insertOrderQuery = `
    INSERT INTO orders (user_id, delivery_address, payment_method, total_amount, estimated_delivery)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertOrderQuery, [user_id, delivery_address, payment_method, totalAmount, estimatedDelivery], (err, orderResult) => {
    if (err) return res.status(500).json({ message: 'Error creating order', error: err.message });

    const orderId = orderResult.insertId;
    const orderItems = items.map(item => [orderId, item.food_id, item.quantity, item.price]);

    const insertItemsQuery = `
      INSERT INTO order_items (order_id, food_id, quantity, price) VALUES ?
    `;

    db.query(insertItemsQuery, [orderItems], (err2) => {
      if (err2) return res.status(500).json({ message: 'Error adding order items', error: err2.message });

      return res.status(200).json({
        status: 200,
        message: 'Order placed successfully',
        data: {
          order_id: orderId,
          total_amount: totalAmount,
          estimated_delivery: estimatedDelivery
        }
      });
    });
  });
};
