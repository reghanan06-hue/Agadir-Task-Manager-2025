
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT 
  },
  status: { 
    type: DataTypes.ENUM("pending", "done"),
    defaultValue: "pending" 
  },
  due_date: { 
    type: DataTypes.DATE 
  },
  user_id: {                    
    type: DataTypes.INTEGER,
    allowNull: false,           
    references: {               
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",       
  },
});

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

export default Task;
