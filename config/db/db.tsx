import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize=new Sequelize(process.env.DBNAME!,process.env.DBUSER!,process.env.PASSWORD,{
    host:'localhost',
    dialect:'mysql'
});

try{
    sequelize.authenticate();
    console.log(process.env.DBNAME!,process.env.USERNAME!,process.env.PASSWORD)
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