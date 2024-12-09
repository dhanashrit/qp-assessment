import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { GroceryItem } from "../entities/GroceryItem";
import { MoreThan } from "typeorm";

export const viewAvailableGroceryItems = async (_: Request, res: Response) => {
    const groceryRepository = AppDataSource.getRepository(GroceryItem);
    const items = await groceryRepository.find({ where: { inventory: MoreThan(0) } });
    res.status(200).json(items);
};

export const bookGroceryItems = async (req: Request, res: Response) => {
    const { items }: { items: { id: number; quantity: number }[] } = req.body; // Define the structure of items array
    const groceryRepository = AppDataSource.getRepository(GroceryItem);

    // Explicitly define the type of `booking`
    const booking: { item: GroceryItem; quantity: number }[] = [];

    for (const { id, quantity } of items) {
        const item = await groceryRepository.findOneBy({ id });
        if (!item || item.inventory < quantity) {
            return res.status(400).json({ error: `Insufficient inventory for item ID ${id}` });
        }

        item.inventory -= quantity;
        await groceryRepository.save(item);
        booking.push({ item, quantity }); // Now TypeScript understands the type
    }

    res.status(201).json({ message: "Booking successful", booking });
};
