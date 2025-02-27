import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

// Fetch categories from the API
export const unAuthorizedGETRequest = async (route:string) => {
  try{
    const response = await axios.get(`${process.env.ROUTE}${route}`);
    console.log("API response data:",response.data); // Log the data here to check if it is correct
    return response.data
  }
  catch(error){
    throw new Error("Error in retriving the categories Please try again")
  }
};



// Fetch categories from the API
export const unAuthorizedPOSTRequest = async (route:string,data:object) => {
    try{
        console.log(process.env.ROUTE)
      const response = await axios.post(`${process.env.ROUTE}${route}`,data);
      console.log("API response data:",response.data); // Log the data here to check if it is correct
      return response.data
    }
    catch(error){
      throw new Error("Error in retriving the categories Please try again")
    }
  };
