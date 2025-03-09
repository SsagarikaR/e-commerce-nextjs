import axios from "axios";
const port = "http://localhost:3000/";

// Fetch categories from the API
export const unAuthorizedGetRequest = async (route: string) => {
  try {
    const response = await axios.get(`${port}api/${route}`);
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in making get request Please try again");
  }
};

export const unAuthorizedPostRequest = async (route: string, data: object) => {
  try {
    const response = await axios.post(`${port}api/${route}`, data);
    console.log("API response data:", response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("API error response:", error.response);
      return {
        status: error.response?.status || 500,
        message:
          error.response?.data?.error ||
          "An error occurred while processing the request.",
      };
    } else {
      console.log("Error without response:", error);
      return {
        status: 500,
        message: "An error occurred, please try again later.",
      };
    }
  }
};
