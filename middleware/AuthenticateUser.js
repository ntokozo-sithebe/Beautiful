// 2 functions -to create token and verify token
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
// const { jwt } = pkg
const { sign, verify } = jwt;

// remember that the sign is for the payload

function createToken(user) {
  return sign(
    {
      emailAddress: user.emailAddress,
      UserPassword: user.userPassword,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1hr",
    }
  );
}

function verifyAToken(req, res, next) {
  const token = req.header["Authorization"];
  if (token) { 
    if (verify(token, process.env.SECRET_KEY)) {
      next();
    } else {
      res?.json({
        status: res.statusCode,
        msg: "Please Provide the correct credentials",
      });
    }
  } else {
    res.json({
      status: res.statusCode,
      msg: "Please login",
    });
  }
}

export { createToken, verifyAToken };