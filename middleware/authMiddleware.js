import Jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ status: 401, message: "Access denied. No token provided." });
    }

    try {
        const decoded = Jwt.verify(token, process.env.SecretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ status: 400, message: "Invalid token." });
    }
};

export const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(403).json({ message: 'Token missing' });

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SecretKey);
    req.user = decoded; // Must contain user_id in your payload
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};