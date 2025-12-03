
import  { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
const User = sequelize.define(
{
    id:{
        type:DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement :true,
    },

       username:{
        type:DataTypes.STRING,
        primaryKey :true,
        autoIncrement :true,
    },
    email :{
        type :DataTypes.STRING,
        allowNull : false,
        unique :true,
    },
  
    created_at :{
        type :DataTypes.Datetime,
        allowNull : false,
        unique :true,
    },
}) ;
export default User ;