import Address from "@/lib/database/models/address"; // Address model

// Create New Address
export const createNewAddress = async (
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string
) => {
  const newAddress = new Address({
    state,
    city,
    pincode,
    locality,
    address,
  });

  return await newAddress.save(); // Save the new address to the database
};

// Select Address by Details (state, city, pincode, locality, address)
export const selectAddress = async (
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string
) => {
  return await Address.find({
    state,
    city,
    pincode,
    locality,
    address,
  });
};

// Select Address by ID
export const selectAddressById = async (addressID: string) => {
  return await Address.findById(addressID); // Find the address by its ObjectId
};

// Update Address
export const updateAddress = async (
  addressID: string,
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string
) => {
  return await Address.findByIdAndUpdate(
    addressID,
    { state, city, pincode, locality, address },
    { new: true } // Return the updated address
  );
};

// Delete Address by ID
export const deleteAddressById = async (addressID: string) => {
  return await Address.findByIdAndDelete(addressID); // Delete the address by its ObjectId
};
