import database from '../config/database';
import User from '../models/user'; // load up the user model
import jwt from 'jsonwebtoken';
/**
 *  The Auth Checker middleware function.
 */
let authCheckMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, database.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
 return res.status(401).end();
}

    const userId = decoded.sub;

// Once the user has that token, they will store it client side and pass it with every request
// for information after that and we will validate the token on every request using route middleware.
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
export default authCheckMiddleware;
