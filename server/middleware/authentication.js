const jwt = require('jsonwebtoken');
const User = require('../Models/user-model');

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "You are not authenticated" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.userId).select('-password');
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ error: "Token is not valid" });
  }
};

module.exports = auth;
