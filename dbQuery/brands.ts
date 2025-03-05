import { sequelize } from "@/lib/Database/db";
import { QueryTypes } from "sequelize";

export const findBrandByName = async (brandName: string) => {
  return await sequelize.query("SELECT * FROM Brands WHERE brandName =?", {
    replacements: [brandName],
    type: QueryTypes.SELECT,
  });
};

export const selectBrandByID = async (brandID: number) => {
  return await sequelize.query("SELECT * FROM Brands WHERE brandID=?", {
    replacements: [brandID],
    type: QueryTypes.SELECT,
  });
};

export const findAllBrand = async () => {
  return await sequelize.query("SELECT * FROM Brands ", {
    type: QueryTypes.SELECT,
  });
};

export const createNewBrand = async (
  brandName: string,
  brandThumbnail: string
) => {
  return await sequelize.query(
    "Insert into Brands  (brandName,brandThumbnail) VALUES (?,?)",
    {
      replacements: [brandName, brandThumbnail],
      type: QueryTypes.INSERT,
    }
  );
};

export const updateTheBrand = async (
  brandID: number,
  brandName: string,
  brandThumbnail: string
) => {
  return await sequelize.query(
    `UPDATE Brands SET brandThumbnail=? ,brandName=? WHERE  brandID=?`,
    {
      replacements: [brandThumbnail, brandName, brandID],
      type: QueryTypes.UPDATE,
    }
  );
};

export const deleteBrandByID = async (brandID: number) => {
  console.log();
  return await sequelize.query(`DELETE FROM Brands WHERE brandID=?`, {
    replacements: [brandID],
    type: QueryTypes.DELETE,
  });
};
