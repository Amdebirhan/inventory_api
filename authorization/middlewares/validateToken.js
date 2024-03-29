const jwt = require("jsonwebtoken");
const env = require('../../inventory/common/config/env.config');
const User = require("../../inventory/users/models/users.model");

exports.validateToken = async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  
  if (!authorizationHeader)
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });

  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  const options = {
    expiresIn: env.jwt_expiration_in_seconds,
  };
  try {
    let user = await User.findOne({
      accessToken: token,
    });
     
    if (!user) {
      result = {
        error: true,
        message: `Authorization error`,
      };
      return res.status(403).json(result);
    }

    result = jwt.verify(token, env.jwt_secret, options);

    if (!user.userId === result._id) {
      result = {
        error: true,
        message: `Invalid token`,
      };

      return res.status(401).json(result);
    }
    req.decoded = result;
    next();
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