import Brand from "@/database/mongo-models/brand";

export const findBrandByName = async (brandName: string) => {
  return await Brand.findOne({ brandName });
};

export const selectBrandByID = async (brandID: string | number) => {
  return await Brand.findById({ _id: brandID });
};

export const findAllBrand = async () => {
  return await Brand.find();
};

export const createNewBrand = async (
  brandName: string,
  brandThumbnail: string
) => {
  const newBrand = new Brand({
    brandName,
    brandThumbnail,
  });
  return await newBrand.save();
};

export const updateTheBrand = async (
  brandID: string | number,
  brandName: string,
  brandThumbnail: string
) => {
  return await Brand.findByIdAndUpdate(
    brandID,
    { brandName, brandThumbnail },
    { new: true }
  );
};

export const deleteBrandByID = async (brandID: string | number) => {
  return await Brand.findByIdAndDelete({ _id: brandID });
};
