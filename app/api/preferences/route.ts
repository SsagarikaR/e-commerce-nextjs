import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import {
  createPreferenceService,
  fetchPreferencesService,
} from "@/services/apiServices/preferences"; // Import service

//create a new preference
export const POST = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }
  const userID = decodedUser.identifire;

  const { productID } = await req.json();

  try {
    const result = await createPreferenceService(productID, userID);

    if (!result) {
      return NextResponse.json({ message: "Preference already exists" });
    }

    return NextResponse.json({
      message: "Preference created successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error in adding prefernces, Please try again!",
    });
  }
};

//fetch prefernces
export const GET = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }
  const userID = decodedUser.identifire;
  try {
    const preferences = await fetchPreferencesService(userID);

    if (!preferences) {
      return NextResponse.json({
        message: "No preferences found for the user",
      });
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to fetch Preferences, Please try again!",
    });
  }
};
