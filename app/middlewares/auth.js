require('dotenv').config();
const secret = process.env.JWT_TOKEN;

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Requisições com autenticação.
const WithAuth = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token)
    res.status(401).json({ error: 'Unauthorized, no token provided' });
  else {
    // jwt.sign cria o token, jwt.verify, verifica se esta correto.
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ error: 'Unauthorized, invalid token' });
      else {
        req.email = decoded.email;
        User.findOne({ email: decoded.email })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(401).json({ error: err });
          });
      }
    });
  }
};

module.exports = WithAuth;
