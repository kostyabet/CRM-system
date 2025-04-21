const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../models/authModel');
const User = require('../models/user');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;

exports.register = async (req, res) => {

  let status = await authJWT(req, res);
  console.log("statusCode:", status);

  if (status.status === 200) {

  } else {
    return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
  }
}

function authJWT(req, res) {
  const authHeader = req.headers.authorization;
  let status;
  let id;
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              status = 403;
          } else {
              status = 200;
              req.user = user;
              id = user.id;
          }
      });
  } else {
      status = 401;
  }
  return { status: status, id: id };
}
