import { authorizedGetRequest } from "@/services/apiReqServices/authorizedRequest";
export const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url); // Use your custom axios request
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }
};
