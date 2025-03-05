import { sequelize } from "@/lib/Database/db";
import { QueryTypes } from "sequelize";

export const selectAllUsers = async () => {
  return await sequelize.query(
    `SELECT Users.*,
            CASE 
                WHEN Admins.userID IS NOT NULL THEN 'Admin' 
                ELSE 'User' 
            END AS role
        FROM Users
        LEFT JOIN Admins ON Users.userID = Admins.userID`,
    {
      type: QueryTypes.SELECT,
    }
  );
};

export const selectUserByID = async (id: number): Promise<user[]> => {
  return await sequelize.query(
    `SELECT Users.*, 
            CASE 
                WHEN Admins.userID IS NOT NULL THEN 'Admin' 
                ELSE 'User' 
            END AS role
        FROM Users
        LEFT JOIN Admins ON Users.userID = Admins.userID
        WHERE Users.userID = ?`,
    {
      replacements: [id],
      type: QueryTypes.SELECT,
    }
  );
};

export const selectUserByName = async (name: string) => {
  return await sequelize.query(`SELECT * FROM Users WHERE name=? `, {
    replacements: [name],
    type: QueryTypes.SELECT,
  });
};

export const selectUserByEmail = async (email: string): Promise<user[]> => {
  return await sequelize.query(`SELECT * FROM Users WHERE email=?`, {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
};

export const createNewUser = async (
  name: string,
  email: string,
  contactNo: string,
  hashedPassword: string
) => {
  return await sequelize.query(
    `INSERT INTO Users (name,email,contactNo,password) VALUES
                (?,?,?,?)`,
    {
      replacements: [name, email, contactNo, hashedPassword],
      type: QueryTypes.INSERT,
    }
  );
};

export const selectUserByNameOREmail = async (
  name: string,
  email: string
): Promise<user[]> => {
  return await sequelize.query(
    `SELECT * FROM Users WHERE name=? AND  email=?  `,
    {
      replacements: [name, email],
      type: QueryTypes.SELECT,
    }
  );
};

export const deleteUserByID = async (id: number) => {
  return await sequelize.query("DELETE FROM Users WHERE userID=?", {
    replacements: [id],
    type: QueryTypes.DELETE,
  });
};

export const updateUsersPassword = async (hashedPassword: string) => {
  return await sequelize.query("UPDATE Users SET password=?", {
    replacements: [hashedPassword],
    type: QueryTypes.UPDATE,
  });
};
