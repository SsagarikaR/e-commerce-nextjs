import Category from "@/database/mongo-models/category";

export const selectCategoryByName = async (categoryName: string) => {
  return await Category.findOne({ categoryName });
};

export const selectAllCategories = async () => {
  return await Category.find();
};

export const updateCategory = async (
  categoryName: string,
  categoryThumbnail: string,
  categoryID: string | number
) => {
  return await Category.findByIdAndUpdate(
    categoryID,
    { categoryName, categoryThumbnail },
    { new: true }
  );
};

export const createNewCategory = async (
  categoryName: string,
  categoryThumbnail: string
) => {
  const newCategory = new Category({
    categoryName,
    categoryThumbnail,
  });
  return await newCategory.save();
};

export const selectCategoryByID = async (categoryID: string | number) => {
  return await Category.findById({ _id: categoryID });
};

export const deleteCategory = async (categoryID: string | number) => {
  return await Category.findByIdAndDelete({ _id: categoryID });
};
