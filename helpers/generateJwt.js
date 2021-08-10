const jwt = require("jsonwebtoken");
//require("dotenv").config();
const env = require('../common/config/env.config');

const options = {
  expiresIn: env.jwt_expiration_in_seconds,
};

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload,env.jwt_secret, options);
    //JSON.parse(token);
    //res.status(201).send({ error: false, token: token });

    return { error: false, token: token };

  } catch (error) {
    return { error: true };
  }
}

module.exports = { generateJwt };