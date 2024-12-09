"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/groceries", userController_1.viewAvailableGroceryItems);
router.post("/book", userController_1.bookGroceryItems);
exports.default = router;
