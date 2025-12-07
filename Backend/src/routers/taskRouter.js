
import express from "express";
//import { createTask,getTask } from "../controllers/TaskController.js";
import { createTask, getTasks,updateTask,deleteTask,markTaskDone  } from "../controllers/TaskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.delete("/:id", markTaskDone);


export default router;
