import { NextRequest, NextResponse } from "next/server";
import {
  addReviewService,
  getReviewsOfProductService,
  updateReviewService,
  deleteReviewService,
} from "@/services/apiServices/reviews";
import { checkToken } from "@/lib/midlleware/auth";

// Controller to add a new review
export const POST = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token.",status:401 },
     
    );
  }

  const userID = decodedUser.identifire;
  const { productID, rating, description } = await req.json();

  if (!userID) {
    return NextResponse.json({
      message: "User not authenticated or missing.",status:401
    });
  }

  if (!productID || !(rating >= 0 && rating <= 5) || !description) {
    return NextResponse.json({
      message: "Please enter all the required fields.",status:409
    });
  }

  try {
    const { success, message } = await addReviewService(
      userID,
      productID,
      rating,
      description
    );
    if (!success) {
      return NextResponse.json({ message: message ,status:400});
    }

    return NextResponse.json({ message: message,status:201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({
      error: "An error occurred while adding the review.",
    });
  }
};



// Controller to get reviews for a product
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("pid");
  console.log(id)
  if (!id) {
    return NextResponse.json({
      message: "Please enter the product id to fetch reviews for this product.",
    });
  }

  try {
    const { success, reviews, message } = await getReviewsOfProductService(
      Number(id)
    );
    console.log(success, reviews, message)
    if (!success) {
      return NextResponse.json({ message: message });
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    return NextResponse.json({
      message: "An error occurred while fetching reviews.",
    });
  }
};




// Controller to update a review
export const PATCH = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }

  const userID = decodedUser.identifire;

  if (!userID) {
    return NextResponse.json({
      message: "User not authenticated or missing.",
    });
  }
  const { reviewID, rating, description } = await req.json();

  if (!userID) {
    return NextResponse.json({
      message: "User not authenticated or missing.",
    });
  }

  if (!reviewID || !rating || !description) {
    return NextResponse.json({
      message: "Please enter review ID, rating, and description.",
    });
  }

  try {
    const { success, message } = await updateReviewService(
      userID,
      reviewID,
      rating,
      description
    );
    if (!success) {
      return NextResponse.json({ message: message });
    }

    return NextResponse.json({ message: message });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({
      error: "An error occurred while updating the review.",
    });
  }
};



// Controller to delete a review
export const DELETE = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }

  const userID = decodedUser.identifire;
  const { reviewID } = await req.json();

  if (!reviewID) {
    return NextResponse.json({
      message: "Please provide a review ID to delete.",
    });
  }

  try {
    const { success, message } = await deleteReviewService(userID, reviewID);
    if (!success) {
      return NextResponse.json({ message: message });
    }

    return NextResponse.json({ message: message });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({
      error: "An error occurred while deleting the review.",
    });
  }
};
