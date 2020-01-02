const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  const token =  req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
  if (!token) {
    console.log('asad');
    res.status(401).send('Unauthorized: No token provided');
  } else {
    console.log('ali');

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;