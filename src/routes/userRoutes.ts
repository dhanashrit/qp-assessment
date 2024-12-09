import express from "express";
import { viewAvailableGroceryItems, bookGroceryItems } from "../controllers/userController";

const router = express.Router();

router.get("/groceries", viewAvailableGroceryItems);
router.post("/book", bookGroceryItems);

export default router;
