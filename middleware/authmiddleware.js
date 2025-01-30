const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
 
  if (token == null) return res.sendStatus(401); 
 
  jwt.verify(token, "f382e27b62ecba47b5507a57c37b06d995ed7d61c0a5d2cc8a33f515b38de248", (err, decoded) => {
    if (err){
      console.log(err)
      return res.sendStatus(403);
    }  
    
    req.user = decoded; 
    next();
  });
};

module.exports = authMiddleware;