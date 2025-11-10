const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const raw = req.header('Authorization') || req.header('x-auth-token');
  const token = raw ? raw.replace('Bearer ', '') : null;
  if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
