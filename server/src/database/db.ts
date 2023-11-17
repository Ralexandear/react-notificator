require('dotenv').config()
import {Sequelize} from "sequelize";
const ENV = process.env;

console.log(ENV.DB_NAME)
const Database = new Sequelize(
  ENV.DB_NAME as string,
  ENV.DB_USER as string,
  ENV.DB_PASSWORD as string,
  {
    dialect: 'postgres',
    host: ENV.DB_HOST as string,
    port: Number(ENV.DB_PORT)
  }
)

export default Database;