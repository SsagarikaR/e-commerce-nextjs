import Preference from "@/database/mongo-models/preference";
import mongoose from "mongoose";

// Select Preference by Product and User
export const selectPreferenceByProductANDUser = async (
  productID: string | number,
  userID: string | number
) => {
  return await Preference.findOne({
    productID,
    userID,
  }).exec();
};

// Insert Preference
export const insertPreference = async (
  productID: string | number,
  userID: string | number
) => {
  const newPreference = new Preference({
    productID,
    userID,
  });

  return await newPreference.save();
};

// Delete Preference
export const deletePreference = async (preferenceID: string | number) => {
  return await Preference.deleteOne({ _id: preferenceID }).exec();
};

// Update Preference
export const updatePreference = async (
  productID: string | number,
  userID: string | number,
  preferenceId: string | number
) => {
  return await Preference.updateOne(
    { _id: preferenceId },
    { $set: { productID, userID } }
  ).exec();
};

// Fetch Preferences for a User
export const fetchPreference = async (userID: string | number) => {
  console.log(userID, "user id....");
  const objectId = new mongoose.Types.ObjectId(userID);

  const result = await Preference.aggregate([
    { $match: { userID: objectId } },
    {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "brands",
        localField: "productDetails.brandID",
        foreignField: "_id",
        as: "brandDetails",
      },
    },
    { $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        preferenceID: "$_id",
        productID: "$productID",
        userID: "$userID",
        productName: "$productDetails.productName",
        productDescription: "$productDetails.productDescription",
        productThumbnail: "$productDetails.productThumbnail",
        productPrice: "$productDetails.productPrice",
        brandName: "$brandDetails.brandName",
        brandThumbnail: "$brandDetails.brandThumbnail",
      },
    },
    { $limit: 8 },
  ]);

  console.log("Fetch Preference Result:", result); // Check the aggregation result

  return result;
};
