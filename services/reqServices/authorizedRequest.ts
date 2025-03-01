import axios from "axios";
import dotenv from "dotenv";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import cookie from "js-cookie";
dotenv.config();
const port="http://localhost:3000/";

const getAuthHeaders = () => {
  const token = cookie.get("token");
  console.log("Retrieved token:", token); // Log to check if token is retrieved
  return token;
};

  

// Fetch categories from the API
export const authorizedGetRequest = async (route:string) => {
  try{
    const token= getAuthHeaders();
    console.log(token)
    const response = await axios.get(`${port}api/${route}`,
      {
        headers:{ Authorization: `Bearer ${token}` }
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
export const authorizedPostRequest = async (route:string,data:object) => {
    try{
        const token= getAuthHeaders();
        console.log(process.env.ROUTE)
        const response = await axios.post(`${port}api/${route}`, data, {
            headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });
      console.log("API response data:",response.data); // Log the data here to check if it is correct
      return response.data
    }
    catch(error){
      throw new Error("Error in making get request please try again Please try again")
    }
  };



// Fetch categories from the API
export const authorizedDeleteRequest = async (route:string,data:object) => {
  try{
      const token= getAuthHeaders();
      console.log(process.env.ROUTE)
      const response = await axios.delete(`${port}api/${route}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
        data: data,
      });
    console.log("API response data:",response.data); // Log the data here to check if it is correct
    return response.data
  }
  catch(error){
    throw new Error("Error in making get request please try again Please try again")
  }
};
