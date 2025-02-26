import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DBNAME, DBUSER, PASSWORD } = process.env;
console.log(DBNAME, DBUSER, PASSWORD)

if (!DBNAME || !DBUSER || !PASSWORD) {
  throw new Error('Missing necessary database environment variables.');
}

export const sequelize = new Sequelize(DBNAME, DBUSER, PASSWORD, {
  host: 'localhost',
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