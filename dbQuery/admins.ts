import { sequelize } from "@/lib/db";
import { QueryTypes } from "sequelize";

export const createNewAdmin=async(userID:number)=>{
    return await sequelize.query("INSERT INTO Admins  (userID) VALUES (?)",
        {
            replacements:[userID],
            type:QueryTypes.INSERT
        }
    )
}

export const selectAdmin=async(userID:number)=>{
    return await sequelize.query("SELECT * FROM Admins Where userID=?",{
        replacements:[userID],
        type:QueryTypes.SELECT
    })
}

export const deleteAdminByID = async (userID: number) => {
    return await sequelize.query(
        "DELETE FROM Admins WHERE userID = ?",
        {
            replacements: [userID],
            type: QueryTypes.DELETE
        }
    );
};

export const updateAdminByID = async (userID: number, newUserID: number) => {
    return await sequelize.query(
        "UPDATE Admins SET userID = ? WHERE userID = ?",
        {
            replacements: [newUserID, userID],
            type: QueryTypes.UPDATE
        }
    );
};