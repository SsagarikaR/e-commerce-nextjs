import CartItem from "@/database/mongo-models/cartItem";
import mongoose from "mongoose";

export const selectFromCartByUserANDProduct = async (
  userID: string | number,
  productID: string | number
) => {
  return await CartItem.findOne({ userID, productID });
};

export const updateQuantityIfAlreadyExist = async (
  userID: string | number,
  productID: string | number
) => {
  return await CartItem.findOneAndUpdate(
    { userID, productID },
    { $inc: { quantity: 1 } }, // Increment quantity by 1
    { new: true } // Returns the updated document
  );
};

export const addNewCartItem = async (
  userID: string | number,
  productID: string | number,
  quantity: number
) => {
  const newCartItem = new CartItem({
    userID,
    productID,
    quantity: quantity || 1,
  });

  return await newCartItem.save();
};

export const getCartByUserID = async (userID: string | number) => {
  try {
    // Convert the userId to ObjectId properly by using `new mongoose.Types.ObjectId()`
    const objectIdUserID = new mongoose.Types.ObjectId(userID);

    // console.log(objectIdUserId, "userId after conversion");

    // Perform aggregation query
    return await CartItem.aggregate([
      {
        $match: { userID: objectIdUserID }, // Match the userId correctly (after converting to ObjectId)
      },
      {
        $lookup: {
          from: "products", // Reference to Products collection
          localField: "productID", // Field in CartItem
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
          localField: "productDetails.categoryID", // Field in productDetails
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
          localField: "productDetails.brandID", // Field in productDetails
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
export const selectFromCartItemCartID = async (cartItemID: string | number) => {
  return await CartItem.findById(cartItemID);
};

export const deleteFromCart = async (cartItemID: string | number) => {
  return await CartItem.findByIdAndDelete(cartItemID);
};

export const updateCartItemsQuantity = async (
  quantity: number,
  cartItemID: string | number
) => {
  return await CartItem.findByIdAndUpdate(
    cartItemID,
    { quantity },
    { new: true } // Returns the updated document
  );
};
