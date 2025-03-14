import Brand from "@/lib/database/models/brand";

export const findBrandByName = async (brandName: string) => {
  return await Brand.findOne({ brandName });
};

export const selectBrandByID = async (brandID: string) => {
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
  brandId: string,
  brandName: string,
  brandThumbnail: string
) => {
  return await Brand.findByIdAndUpdate(
    brandId,
    { brandName, brandThumbnail },
    { new: true }
  );
};

export const deleteBrandByID = async (brandId: string) => {
  return await Brand.findByIdAndDelete({ _id: brandId });
};
