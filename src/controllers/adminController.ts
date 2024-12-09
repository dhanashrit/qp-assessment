import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { GroceryItem } from "../entities/GroceryItem";

export const addGroceryItem = async (req: Request, res: Response) => {
    const { name, price, description, inventory } = req.body;
    const groceryRepository = AppDataSource.getRepository(GroceryItem);

    const newItem = groceryRepository.create({ name, price, description, inventory });
    await groceryRepository.save(newItem);

    res.status(201).json(newItem);
};

export const viewGroceryItems = async (_: Request, res: Response) => {
    const groceryRepository = AppDataSource.getRepository(GroceryItem);
    const items = await groceryRepository.find();
    res.status(200).json(items);
};

export const updateGroceryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description, inventory } = req.body;
    const groceryRepository = AppDataSource.getRepository(GroceryItem);

    const item = await groceryRepository.findOneBy({ id: parseInt(id) });
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = name;
    item.price = price;
    item.description = description;
    item.inventory = inventory;

    await groceryRepository.save(item);
    res.status(200).json(item);
};

export const removeGroceryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const groceryRepository = AppDataSource.getRepository(GroceryItem);

    const item = await groceryRepository.findOneBy({ id: parseInt(id) });
    if (!item) return res.status(404).json({ error: "Item not found" });

    await groceryRepository.remove(item);
    res.status(200).json({ message: "Item removed" });
};
