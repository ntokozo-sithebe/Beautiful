import { connection as db } from "../config/config.js";
import { hash, compare } from "bcrypt"; // for the password encryption
import { createToken } from "../middleware/AuthenticateUser.js";


class Users {

    userLogin(req, res) {
        const { emailAddress, userPassword } = req.body;
        const query = `
            SELECT  firstName, lastName, userAge, , userEmail, userPass
            FROM Users
            WHERE emailAddress = '${emailAddress}';`;
    
        db.query(query, [], async (err, result) => {
          if (err) throw err;
          if (!result?.length) {
            res.json({
              status: res.statusCode,
              msg: "You provided a wrong email address",
            });
          } else {
            // to validate the password
            const properPass = await compare(userPassword, result[0].userPassword);
            if (properPass) {
              const token = createToken({
                emailAddress,
                userPassword,
              });
              res.json({
                status: res.statusCode,
                msg: "You're logged in",
                token,
                result: result[0],
              });
            } else {
              res.json({
                status: res.statusCode,
                msg: "Please provide the correct password",
              });
            }
          }
        });
      }
    }
    
    export { Users };