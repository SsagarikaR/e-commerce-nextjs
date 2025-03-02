// lib/db.ts
import { sequelize } from "@/lib/db";
import { CartItems } from "@/models/cartItem"; // Import the CartItems model

// Manually sync CartItems table to reflect schema changes
const syncCartItemsTable = async () => {
  try {
    // Sync CartItems model with the database, applying any changes (e.g., adding new columns)
    await CartItems.sync({ alter: true });
    console.log("CartItems table has been successfully altered.");
  } catch (error) {
    console.error("Error syncing CartItems table:", error);
  }
};

syncCartItemsTable(); // Call the function to sync the table
