import { sequelize } from "../../database/sqldb";
import { QueryTypes } from "sequelize";

export const selectCategoryByName = async (categoryName: string) => {
  return await sequelize.query(
    `SELECT * FROM Categories WHERE categoryName=?`,
    {
      replacements: [categoryName],
      type: QueryTypes.SELECT,
    }
  );
};

export const selectAllCategories = async () => {
  return await sequelize.query("SELECT * FROM Categories", {
    type: QueryTypes.SELECT,
  });
};

export const updateCategory = async (
  categoryName: string,
  categoryThumbnail: string,
  categoryID: number | string
) => {
  return await sequelize.query(
    `UPDATE Categories SET categoryName=?, categoryThumbnail=? where categoryID=?`,
    {
      replacements: [categoryName, categoryThumbnail, categoryID],
      type: QueryTypes.UPDATE,
    }
  );
};

export const createNewCategory = async (
  categoryName: string,
  categoryThumbnail: string
) => {
  return await sequelize.query(
    "INSERT INTO Categories (categoryName,categoryThumbnail) VALUES (?,?)",
    {
      replacements: [categoryName, categoryThumbnail],
    }
  );
};

export const selectCategoryByID = async (categoryID: number | string) => {
  return await sequelize.query("SELECT * FROM Categories WHERE categoryID=?", {
    replacements: [categoryID],
    type: QueryTypes.SELECT,
  });
};

export const deleteCategory = async (categoryID: number | string) => {
  return await sequelize.query("DELETE FROM Categories WHERE categoryID=?", {
    replacements: [categoryID],
    type: QueryTypes.DELETE,
  });
};
