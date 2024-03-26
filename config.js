import { createPool} from "mysql";
import { config } from "dotenv";
config();

let connection = createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_Name,
  user: process.env.DB_User,
  password: process.env.DB_UserPassword,
  multipleStatements: true,
  connectionLimit: 30,

})

export{
    connection
}