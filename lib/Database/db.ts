import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const { DB_NAME, DB_USER, PASSWORD, DB_HOST } = process.env;
console.log(DB_NAME, DB_USER, PASSWORD);

if (!DB_NAME || !DB_USER || !PASSWORD || !DB_HOST) {
  throw new Error("Missing necessary database environment variables.");
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, PASSWORD, {
  host: DB_HOST, // Dynamically choose the host
  dialect: "mysql",
  dialectModule: mysql,
});

try {
  sequelize.authenticate();
  console.log("Conncection has been established successfully.");
} catch (error) {
  console.log("Error connecting databse:", error);
}

sequelize
  .sync()
  .then((data) => {
    console.log("databse synced successfully.", data);
  })
  .catch((error) => {
    console.log("Error syncing databse:", error);
  });
