"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataSource_1 = require("./dataSource");
const adminRoutes_1 = require("./routes/adminRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const dotenv_1 = require("dotenv");
require("reflect-metadata");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/admin", adminRoutes_1.default);
app.use("/user", userRoutes_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
})
    .catch((error) => console.error("Database connection failed:", error));
