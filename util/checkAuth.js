const jwt = require('jsonwebtoken');
const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(200).json({
      status: 401,
      message: 'unauthorized access',
    });
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.json('invalid token');
    }
    req.user = decoded;
    console.log(req.user);
    return next();
  });
};
module.exports = { checkAuth };
