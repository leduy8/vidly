const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) return res.status(401).send("Access denied. No token provided");
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).send("Invalid token");
  }
}