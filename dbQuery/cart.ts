import CartItem from "@/lib/database/models/cartItem";
import mongoose from "mongoose";

export const selectFromCartByUserANDProduct = async (
  userId: string,
  productId: string
) => {
  return await CartItem.findOne({ userId, productId });
};

export const updateQuantityIfAlreadyExist = async (
  userId: string,
  productId: string
) => {
  return await CartItem.findOneAndUpdate(
    { userId, productId },
    { $inc: { quantity: 1 } }, // Increment quantity by 1
    { new: true } // Returns the updated document
  );
};

export const addNewCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const newCartItem = new CartItem({
    userId,
    productId,
    quantity: quantity || 1,
  });

  return await newCartItem.save();
};

export const getCartByUserID = async (userId: string) => {
  try {
    // Convert the userId to ObjectId properly by using `new mongoose.Types.ObjectId()`
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    // console.log(objectIdUserId, "userId after conversion");

    // Perform aggregation query
    return await CartItem.aggregate([
      {
        $match: { userId: objectIdUserId }, // Match the userId correctly (after converting to ObjectId)
      },
      {
        $lookup: {
          from: "products", // Reference to Products collection
          localField: "productId", // Field in CartItem
          foreignField: "_id", // Field in Product collection
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails", // Unwind to make productDetails easier to work with
          preserveNullAndEmptyArrays: true, // Keep cart items even if no product is found
        },
      },
      {
        $lookup: {
          from: "categories", // Reference to Categories collection
          localField: "productDetails.categoryId", // Field in productDetails
          foreignField: "_id", // Field in Category collection
          as: "categoryDetails",
        },
      },
      {
        $unwind: {
          path: "$categoryDetails", // Unwind to make categoryDetails easier to work with
          preserveNullAndEmptyArrays: true, // Keep cart items even if no category is found
        },
      },
      {
        $lookup: {
          from: "brands", // Reference to Brands collection
          localField: "productDetails.brandId", // Field in productDetails
          foreignField: "_id", // Field in Brand collection
          as: "brandDetails",
        },
      },
      {
        $unwind: {
          path: "$brandDetails", // Unwind to make brandDetails easier to work with
          preserveNullAndEmptyArrays: true, // Keep cart items even if no brand is found
        },
      },
      {
        $addFields: {
          // Add calculated fields for totalPrice and totalAmount
          totalPrice: {
            $sum: { $multiply: ["$quantity", "$productDetails.productPrice"] },
          },
          totalAmount: {
            $add: [
              "$handlingPrice",
              "$platformFee",
              "$deliveryCharge",
              {
                $sum: {
                  $multiply: ["$quantity", "$productDetails.productPrice"],
                },
              },
            ],
          },
        },
      },
    ]);
  } catch (err) {
    console.error("Error fetching cart data:", err);
    throw err;
  }
};
export const selectFromCartItemCartID = async (cartItemId: string) => {
  return await CartItem.findById(cartItemId);
};

export const deleteFromCart = async (cartItemId: string) => {
  return await CartItem.findByIdAndDelete(cartItemId);
};

export const updateCartItemsQuantity = async (
  quantity: number,
  cartItemId: string
) => {
  return await CartItem.findByIdAndUpdate(
    cartItemId,
    { quantity },
    { new: true } // Returns the updated document
  );
};
