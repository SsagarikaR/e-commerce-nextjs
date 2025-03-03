import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DBNAME, DBUSER, PASSWORD ,IS_DOCKER} = process.env;
console.log(DBNAME, DBUSER, PASSWORD)

if (!DBNAME || !DBUSER || !PASSWORD) {
  throw new Error('Missing necessary database environment variables.');
}

const isDocker = IS_DOCKER === 'true';  // Check if IS_DOCKER is true

// Set host based on environment
const host = isDocker ? 'mysql-db' : 'localhost'; // Use 'mysql-db' for Docker and 'localhost' for local development

export const sequelize = new Sequelize(DBNAME, DBUSER, PASSWORD, {
  host: host, // Dynamically choose the host
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

