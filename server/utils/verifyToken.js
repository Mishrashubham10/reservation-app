import jwt from 'jsonwebtoken';

// VERIFYING USERS
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });

    req.user = user;
    next();
  });
};

// Verifying User
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err)
        return res.status(403).json({ message: 'You are not authorized' });
    }
  });
};