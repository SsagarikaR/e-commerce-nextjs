import connectDB from "./lib/database/mongodb";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await connectDB();
  }
}
