import axios from "axios";
import dotenv from "dotenv"
dotenv.config();
const port="http://localhost:3000/"

// Fetch categories from the API
export const unAuthorizedGETRequest = async (route:string) => {
  try{
    const response = await axios.get(`${port}api/${route}`);
    console.log("API response data:",response.data); // Log the data here to check if it is correct
    return response.data
  }
  catch(error){
    console.log(error);
    throw new Error("Error in making get request Please try again")
  }
};



// Fetch categories from the API
export const unAuthorizedPOSTRequest = async (route:string,data:object) => {
    try{
        console.log(process.env.ROUTE)
      const response = await axios.post(`${port}api/${route}`,data);
      console.log("API response data:",response.data); // Log the data here to check if it is correct
      return response.data
    }
    catch(error){
      throw new Error("Error in making get request please try again Please try again")
    }
  };
