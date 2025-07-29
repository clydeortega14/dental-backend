const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token = req.cookies.token;

  if(!token) return res.status(401).json({message: 'Unauthorized! no token was provided'});


  // const authHeader = req.headers.authorization;
  // if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  // const token = authHeader.split(' ')[1];
  try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = decoded; // { id, email }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
