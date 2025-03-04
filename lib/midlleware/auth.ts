import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { sequelize } from "../Database/db";
import { QueryTypes } from "sequelize";
import Jwt from "jsonwebtoken";
require("dotenv").config();

export const generateToken = async (id: number) => {
  // console.log(id,"authentication hit",process.env);
  try {
    const token = Jwt.sign(
      { identifire: id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );
    console.log(token, "generated token");
    return token;
  } catch (error) {
    console.log("error", error);
  }
};





export const checkToken = (
  req: NextRequest
): { isValid: boolean; decodedUser: any | null } => {
  const authHeader = req.headers.get("authorization");

  console.log(authHeader, "authHeader");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isValid: false, decodedUser: null }; // Invalid or missing token
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    if (process.env.JWT_SECRET_KEY) {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
      return { isValid: true, decodedUser: decoded }; // Return the decoded user info
    }
    return { isValid: false, decodedUser: null }; // Secret key not available
  } catch (error) {
    console.error("JWT Error:", error);
    return { isValid: false, decodedUser: null }; // Token verification failed
  }
};






// Middleware to check if the user is an admin
export const isAdmin = async (req: NextRequest, decodedUser: any) => {
  const userID = decodedUser.identifire;
  console.log(decodedUser.identifire, "iden");
  console.log(decodedUser, "decodeduser");
  try {
    const user = await sequelize.query(
      "SELECT * FROM Admins WHERE userID = ?",
      {
        replacements: [userID],
        type: QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return NextResponse.json(
        { error: "You are not authorized for this action." },
        { status: 403 }
      );
    }

    return null; // Proceed if the user is an admin
  } catch (error) {
    console.error("Error checking admin:", error);
    return NextResponse.json(
      { error: "Please try again after some time." },
      { status: 500 }
    );
  }
};
