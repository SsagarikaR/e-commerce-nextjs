import { sequelize } from "../../database/sqldb";
import { QueryTypes } from "sequelize";

export const createNewAdmin = async (userID: number | string) => {
  return await sequelize.query("INSERT INTO Admins  (userID) VALUES (?)", {
    replacements: [userID],
    type: QueryTypes.INSERT,
  });
};

export const selectAdmin = async (userID: number | string) => {
  return await sequelize.query("SELECT * FROM Admins Where userID=?", {
    replacements: [userID],
    type: QueryTypes.SELECT,
  });
};

export const deleteAdminByID = async (userID: string | number) => {
  return await sequelize.query("DELETE FROM Admins WHERE userID = ?", {
    replacements: [userID],
    type: QueryTypes.DELETE,
  });
};

export const updateAdminByID = async (
  userID: number | string,
  newUserID: number | string
) => {
  return await sequelize.query(
    "UPDATE Admins SET userID = ? WHERE userID = ?",
    {
      replacements: [newUserID, userID],
      type: QueryTypes.UPDATE,
    }
  );
};
