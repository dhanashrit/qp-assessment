import express from "express";
import { addGroceryItem, viewGroceryItems, updateGroceryItem, removeGroceryItem } from "../controllers/adminController";

const router = express.Router();

router.post("/grocery", addGroceryItem);
router.get("/groceries", viewGroceryItems);
router.put("/grocery/:id", updateGroceryItem);
router.delete("/grocery/:id", removeGroceryItem);

export default router;
