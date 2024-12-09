import express from "express";
import { AppDataSource } from "./dataSource";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((error) => console.error("Database connection failed:", error));
