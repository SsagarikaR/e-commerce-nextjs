import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

// Fetch product data using SWR
export const fetcher = async (url: string) => {
  try {
    const response = await unAuthorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};
