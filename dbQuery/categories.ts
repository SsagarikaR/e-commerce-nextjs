import { sequelize } from "@/lib/Database/db";
import { QueryTypes } from "sequelize";

export const selectCatgeoryByName=async(categoryName:string)=>{
    return await sequelize.query(`SELECT * FROM Categories WHERE categoryName=?`,{
        replacements:[categoryName],
        type:QueryTypes.SELECT
    })
}


export const selectAllCatgeory=async()=>{
    return await sequelize.query('SELECT * FROM Categories',{
        type:QueryTypes.SELECT
    });
}

export const updateTheCatgeory=async(categoryName:string,categoryThumbnail:string,categoryID:number)=>{
    return await sequelize.query(`UPDATE Categories SET categoryName=?, categoryThumbnail=? where categoryID=?`,
        {
            replacements:[categoryName,categoryThumbnail,categoryID],
            type:QueryTypes.UPDATE
        }
    )
}

export const createNewCategory=async(categoryName:string,categoryThumbnail:string)=>{
    return await sequelize.query('INSERT INTO Categories (categoryName,categoryThumbnail) VALUES (?,?)',{
        replacements:[categoryName,categoryThumbnail]
    })
}

export const selectCatgeoryByID=async(categoryID:number)=>{
    return await sequelize.query('SELECT * FROM Categories WHERE categoryID=?',{
        replacements:[categoryID],
        type:QueryTypes.SELECT
    })
}

export const deleteCatgeory=async(categoryID:number)=>{
    return await sequelize.query('DELETE FROM Categories WHERE categoryID=?',{
        replacements:[categoryID],
        type:QueryTypes.DELETE
    })
}