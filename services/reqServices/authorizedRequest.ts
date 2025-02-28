import axios from "axios";
import dotenv from "dotenv"
import { cookies } from "next/headers";
dotenv.config();
const port="http://localhost:3000/"

const getAuthHeaders =async () => {
    const getCookie=await cookies();
    const token = getCookie.get("token");
    // console.log(token?.value,"token");
    return token;
   
  };
  

// Fetch categories from the API
export const authorizedGETRequest = async (route:string) => {
  try{
    const token=await getAuthHeaders();
    console.log(token)
    const response = await axios.get(`${port}api/${route}`,
      {
        headers:{ Authorization: `Bearer ${token?.value}` }
      }
    );
    console.log("API response data:",response.data); // Log the data here to check if it is correct
    return response.data
  }
  catch(error){
    console.log(error)
    throw new Error("Error in making get request Please try again")
  }
};



// Fetch categories from the API
export const AuthorizedPOSTRequest = async (route:string,data:object) => {
    try{
        console.log(process.env.ROUTE)
        const response = await axios.patch(`${port}api/${route}`, data, {
            headers:await { ...getAuthHeaders(), "Content-Type": "application/json" },
          });
      console.log("API response data:",response.data); // Log the data here to check if it is correct
      return response.data
    }
    catch(error){
      throw new Error("Error in making get request please try again Please try again")
    }
  };
