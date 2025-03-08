import { sequelize } from "@/lib/Database/db";
import { QueryTypes } from "sequelize";

export const selectProductWithAllMatch = async (
  productName: string,
  productDescription: string,
  productPrice: number,
  categoryID: number,
  brandID: number
) => {
  return await sequelize.query(
    "SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=? AND brandID=?",
    {
      replacements: [
        productName,
        productDescription,
        productPrice,
        categoryID,
        brandID,
      ],
      type: QueryTypes.SELECT,
    }
  );
};

export const updateProducts = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  productID: number
) => {
  return await sequelize.query(
    "UPDATE Products SET productName=? ,productDescription=? ,productThumbnail=? ,productPrice=? ,categoryID=? WHERE productID=?",
    {
      replacements: [
        productName,
        productDescription,
        productThumbnail,
        productPrice,
        categoryID,
        productID,
      ],
      type: QueryTypes.UPDATE,
    }
  );
};
export const deleteByProductID = async (productID: number) => {
  return await sequelize.query("DELETE FROM Products WHERE productID=?", {
    replacements: [productID],
    type: QueryTypes.DELETE,
  });
};

export const selectByProductID = async (productID: number) => {
  return await sequelize.query("SELECT * FROM Products WHERE productID=?", {
    replacements: [productID],
    type: QueryTypes.SELECT,
  });
};

export const createNewProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  brandID: number,
  stock: number,
  productImages: Array<string>
) => {
  return await sequelize.query(
    "INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID,brandID,stock,productImage1,productImage2, productImage3,productImage4) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    {
      replacements: [
        productName,
        productDescription,
        productThumbnail,
        productPrice,
        categoryID,
        brandID,
        stock,
        productImages[0],
        productImages[1],
        productImages[2],
        productImages[3],
      ],
      type: QueryTypes.INSERT,
    }
  );
};

export const getProductWithCondition = async (
  {
    categoryID,
    name,
    id,
    price,
  }: {
    categoryID?: string | number;
    name?: string;
    id?: string | number;
    price?: "low-to-high" | "high-to-low";
  },
  page: number,
  limit: number
) => {
  // Base query for products
  let query = `
    SELECT p.*, c.*, b.*, COUNT(*) OVER() AS totalCount
    FROM Products p
    LEFT JOIN Categories c ON p.categoryID = c.categoryID
    LEFT JOIN Brands b ON p.brandID = b.brandID
  `;
  const replacements = [];
  const conditions = [];

  // Apply conditions for filtering products
  if (categoryID) {
    conditions.push(`p.categoryID = ?`);
    replacements.push(categoryID);
  }

  if (name) {
    conditions.push(`p.productName LIKE ?`);
    replacements.push(`%${name}%`);
  }

  if (id) {
    conditions.push(`p.productID = ?`);
    replacements.push(id);
  }

  // Add conditions to the query if any filters are provided
  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  // Add sorting based on price if provided
  if (price) {
    if (price === "low-to-high") {
      query += ` ORDER BY p.productPrice ASC`;
    } else if (price === "high-to-low") {
      query += ` ORDER BY p.productPrice DESC`;
    }
  }

  // Pagination logic (LIMIT and OFFSET)
  query += ` LIMIT ? OFFSET ?`;
  replacements.push(limit, (page - 1) * limit);

  console.log(query, "query");
  console.log(replacements, "replacements");

  // Execute the query to fetch products
  const result = await sequelize.query(query, {
    replacements: replacements,
    type: QueryTypes.SELECT,
  });

  // Extract the totalCount from the first result (since it's the same for all rows)
  return result;
};
