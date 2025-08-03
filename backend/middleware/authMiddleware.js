const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const SkillSwapper = require('../models/SkillSwapper');



const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try to find seller first
    let user = await Seller.findById(decoded.id);
    if (user) {
      req.user = { id: user._id, role: 'seller' };
    } else {
      // Try to find buyer
      user = await Buyer.findById(decoded.id);
      if (user) {
        req.user = { id: user._id, role: 'buyer' };
      } else {
        user = await SkillSwapper.findById(decoded.id);
        if (user) {
          req.user = { id: user._id, role: 'skillswapper' };
        }
        else {
          return res.status(401).json({ message: 'User not found' });
        }

      }
    }

    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;