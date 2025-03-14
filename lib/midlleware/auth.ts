import { NextRequest, NextResponse } from "next/server";
// import { sequelize } from "../Database/db";
// import { QueryTypes } from "sequelize";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../database/models/admin";
dotenv.config();

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
): { isValid: boolean; decodedUser: string | JwtPayload | null } => {
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

export const isAdmin = async (
  req: NextRequest,
  decodedUser: JwtPayload | string | null
) => {
  // Narrow the type to JwtPayload
  if (typeof decodedUser !== "string" && decodedUser !== null) {
    const userId = decodedUser?.identifire;

    console.log(decodedUser?.identifire, "iden");
    console.log(decodedUser, "decodeduser");

    try {
      const user = await Admin.findOne({ userId });

      if (!user) {
        return NextResponse.json(
          { error: "You are not authorized for this action." },
          { status: 403 }
        );
      }

      return null;
    } catch (error) {
      console.error("Error checking admin:", error);
      return NextResponse.json(
        { error: "Please try again after some time." },
        { status: 500 }
      );
    }
  }

  // Return an error if decodedUser is a string or null
  return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
};
