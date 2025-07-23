import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const getSurplusFood = (req, res) => {
  const sql = `
    SELECT 
      food_id, name, description, original_price, current_price, 
      discount_percentage, quantity_available, expiration_date, 
      \`condition\`, image_url 
    FROM food_items 
    WHERE is_active = 1 
    ORDER BY expiration_date ASC;
  `;

  execQuery(db, sql, (err, results) => {
    if (err) {
      console.error('Error fetching food items:', err);
      return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: results
    });
  });
};

