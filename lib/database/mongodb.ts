"use server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is missing in environment variables");
}

const connectDB = async () => {
  try {
    //Check if mongoose is already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("Using existing MongoDB connection");
      return;
    }

    // Connect to MongoDB if not already connected
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
