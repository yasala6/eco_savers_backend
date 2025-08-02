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
  const bearer = req.headers['authorization'];
  const token = bearer?.split(' ')[1]; // extract token

  if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // match secret here
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

