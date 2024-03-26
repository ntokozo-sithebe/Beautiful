import express from "express";
import bodyParser from "body-parser";
import { users } from "../model/index.js";
import { verifyAToken } from "../middleware/AuthenticateUser.js";
import { cart } from "../model/index.js";

const userRouter = express.Router();

userRouter.post("/login", bodyParser.json(), (req, res) => {
    try {
      users.userLogin(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: "Failed to log in",
      });
    }
  });

  export { userRouter, 
    express 
};