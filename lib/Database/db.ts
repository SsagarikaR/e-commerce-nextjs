import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USER, PASSWORD ,DB_HOST} = process.env;
console.log(DB_NAME, DB_USER, PASSWORD)

if (!DB_NAME || !DB_USER || !PASSWORD || !DB_HOST) {
  throw new Error('Missing necessary database environment variables.');
}



export const sequelize = new Sequelize(DB_NAME, DB_USER, PASSWORD, {
  host: DB_HOST, // Dynamically choose the host
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

try{
    sequelize.authenticate();
    console.log('Conncection has been established successfully.');
}
catch(error){
    console.log("Error connecting databse:",error);
}

sequelize.sync().then((data)=>{
    console.log("databse synced successfully.");
}).catch((error)=>{
    console.log("Error syncing databse:",error);
})

