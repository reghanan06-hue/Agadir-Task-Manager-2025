import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import authRoutes from "./routers/authRouter.js";
import taskRoutes from "./routers/taskRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;


 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
});