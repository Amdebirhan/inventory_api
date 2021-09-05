const jwt = require("jsonwebtoken");
const env = require('../../inventory/common/config/env.config');
const User = require("../../inventory/users/models/users.model");


async function decodeToken(authorization) {
  const authorizationHeader =authorization;
  let result;
  
  if (!authorizationHeader)
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });

  const token = authorizationHeader.split(" ")[1]; // Bearer <token>
  const options = {
    expiresIn: env.jwt_expiration_in_seconds,
  };
  try {
    result = jwt.verify(token, env.jwt_secret, options);
    return result; 
  } catch (err) {
    // console.log(err);
    if (err.name === "TokenExpiredError") {
      result = {
        error: true,
        message: `TokenExpired`,
      };
    } else {
      result = {
        error: true,
        message: `Authentication error`,
      };
    }
    return res.status(403).json(result);
  }
}

module.exports = { decodeToken };